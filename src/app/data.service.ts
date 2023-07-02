import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://mocki.io/v1/ff6c51fb-193e-4aba-bbc9-c6795f69e376'

  constructor(private http: HttpClient) { }

  fetchData(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
