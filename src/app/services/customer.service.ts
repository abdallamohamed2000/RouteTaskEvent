import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { allCustomer } from '../models/ICustomer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = 'https://api-d414.vercel.app/customers';

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<allCustomer> {
    return this.http.get<allCustomer>(this.apiUrl);
  }
}
