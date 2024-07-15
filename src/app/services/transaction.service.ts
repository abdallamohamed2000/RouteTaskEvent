import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { allTransaction } from '../models/ITransaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = 'https://api-d414.vercel.app/transactions';

  constructor(private http: HttpClient) { }

  getTransactions(): Observable<allTransaction> {
    return this.http.get<allTransaction>(this.apiUrl);
  }

 
}
