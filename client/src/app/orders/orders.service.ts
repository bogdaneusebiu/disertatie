import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../core/environments/environment';
import { IOrder } from '../shared/Models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getOrderForUser(){
    return this.http.get<IOrder[]>(this.baseUrl + 'orders');
  }
}
