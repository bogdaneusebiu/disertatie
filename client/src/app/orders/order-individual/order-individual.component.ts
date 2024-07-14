import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { IOrder } from 'src/app/shared/Models/order';

@Component({
  selector: 'app-order-individual',
  templateUrl: './order-individual.component.html',
  styleUrls: ['./order-individual.component.scss']
})

export class OrderIndividualComponent implements OnInit{

  order: IOrder;

  constructor(private oderService: OrdersService, private route: ActivatedRoute, private bcService: BreadcrumbService ) {
    this.bcService.set('@orderIndividual', '');
  }

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder()
  {
    this.oderService.getIndividualOrderForUser(+this.route.snapshot.paramMap.get('id')).subscribe((response)=>{
      this.order= response;
      this.bcService.set('@orderIndividual', `Order# ${this.order.id}- ${this.order.status}`);
    }, error =>{
      console.log(error);
    })
  }
}
