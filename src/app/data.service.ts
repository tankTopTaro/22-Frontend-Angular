import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://mocki.io/v1/ff6c51fb-193e-4aba-bbc9-c6795f69e376';
  selectedService: string = '';
  service: string = '';
  selectedDate: string | null = null;
  selectedTimeslot: string | null = null; 

  constructor(private http: HttpClient) { 
    this.selectedService = localStorage.getItem('selectedService') || ''; // Full Groom
    this.service = localStorage.getItem('service') || ''; // Bath & Groom
    this.selectedDate = localStorage.getItem('selectedDate') || '';
    this.selectedTimeslot = localStorage.getItem('selectedTimeslot') || '';
  }

  fetchData(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }

  setSelectedService(value: string) {
    this.selectedService = value;
    localStorage.setItem('selectedService', value)
  }

  setService(value: string) {
    this.service = value;
    localStorage.setItem('service', value)
  }

  setSelectedDate(value: any) {
    const formattedDate = this.formatDate(value)
    this.selectedDate = formattedDate;
    localStorage.setItem('selectedDate', formattedDate);
  }

  setSelectedTimeslot(value:any) {
    const formattedTimeslot = this.formatTimeslot(value);
    this.selectedTimeslot = formattedTimeslot;
    localStorage.setItem('selectedTimeslot', formattedTimeslot);
  }

  private formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  }
  
  private formatTimeslot(timeslot: any): string {
    const dateObj = new Date(timeslot.time);
    const formattedTime = dateObj.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric'
    });
    return formattedTime;
  }
}
