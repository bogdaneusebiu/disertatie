import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IOrder } from '../shared/Models/order';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getOrderForUser(){
    return this.http.get<IOrder[]>(this.baseUrl + 'orders').pipe(
      map((dm: IOrder[])=> {
        return dm.sort((a,b) => +new Date(b.orderDate) - +new Date(a.orderDate));
      })
    );;
  }

  getIndividualOrderForUser(id: number){
    return this.http.get<IOrder>(this.baseUrl + 'orders/' + id);
  }
}
