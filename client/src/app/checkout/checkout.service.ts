import { Injectable } from '@angular/core';
import { environment } from '../core/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IDeliveryMethod } from '../shared/Models/deliveryMethods';
import { IOrderToCreate } from '../shared/Models/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.apiUrl;

  constructor(private https: HttpClient) { }

  createOrder (order: IOrderToCreate){
    return this.https.post(this.baseUrl + "orders", order);
  }

  getDeloveryMethods(){
    return this.https.get(this.baseUrl + 'orders/deliveryMethods').pipe(
      map((dm: IDeliveryMethod[])=> {
        return dm.sort((a,b) => b.price - a.price);
      })
    );
  }
}
