import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Details } from './details';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://mocki.io/v1/ff6c51fb-193e-4aba-bbc9-c6795f69e376';

  selectedService: string = '';
  service: string = '';

  selectedDate: string | null = null;
  selectedTimeslot: string | null = null; 

  details_name: string = '';
  details_phone: string = '';
  details_email: string = '';
  details_comments: string = '';
  details_timeslot: string | null = '';
  details_date: string | null = '';
  details_service: string = '';
  details_selectedService: string = '';
  details_reference: string = '';

  constructor(private http: HttpClient) { 
    this.selectedService = localStorage.getItem('selectedService') || ''; // Full Groom
    this.service = localStorage.getItem('service') || ''; // Bath & Groom

    this.selectedDate = localStorage.getItem('selectedDate') || '';
    this.selectedTimeslot = localStorage.getItem('selectedTimeslot') || '';

    // From Details Class
    this.details_name = localStorage.getItem('details_name') || '';
    this.details_phone = localStorage.getItem('details_phone') || '';
    this.details_email = localStorage.getItem('details_email') || '';
    this.details_comments = localStorage.getItem('details_comments') || '';
    this.details_timeslot = localStorage.getItem('details_timeslot') || '';
    this.details_date = localStorage.getItem('details_date') || '';
    this.details_service = localStorage.getItem('details_service') || '';
    this.details_selectedService = localStorage.getItem('details_selectedService') || '';
    this.details_reference = localStorage.getItem('details_reference') || '';
  }

  fetchData(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }

  submitDetails(details: Details) {
    this.details_name = details.name;
    this.details_phone = details.phone;
    this.details_email = details.email;
    this.details_comments = details.comments;
    this.details_timeslot = details.timeslot;
    this.details_date = details.date;
    this.details_service = details.service;
    this.details_selectedService = details.selectedService;

    const ref = this.generateRandomString(10);
    this.details_reference = ref;

    localStorage.setItem('details_name', details.name);
    localStorage.setItem('details_phone', details.phone);
    localStorage.setItem('details_email', details.email);
    localStorage.setItem('details_comments', details.comments);
    localStorage.setItem('details_date', details.date || '');
    localStorage.setItem('details_timeslot', details.timeslot || '');
    localStorage.setItem('details_service', details.service);
    localStorage.setItem('details_selectedService', details.selectedService);
    localStorage.setItem('details_reference', ref);
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
    const formattedDate = this.formatDate(value);
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
    const hours = timeslot.hmsFormat.hours;
    const minutes = timeslot.hmsFormat.minutes;
    
    // Determine the AM/PM indicator
    const amPm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    const formattedHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;

    // Format minutes with leading zero if necessary
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Construct the formatted time string
    const formattedTime = `${formattedHours}:${formattedMinutes} ${amPm}`;

    return formattedTime;
  }

  // Generate random reference number
  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    const randomValues = new Uint32Array(length);
    crypto.getRandomValues(randomValues);
  
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(randomValues[i] % charactersLength);
    }
  
    return result;
  }
}
