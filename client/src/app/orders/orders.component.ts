import { Component, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';
import { IOrder } from '../shared/Models/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit{

  orders : IOrder[];

  constructor(private orderService: OrdersService){}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.orderService.getOrderForUser().subscribe((result)=>{
      this.orders = result;
    }, error =>{
      console.log(error);
    });
  }
}
