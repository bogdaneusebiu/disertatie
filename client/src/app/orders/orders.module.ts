import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrderIndividualComponent } from './order-individual/order-individual.component';
import { SharedModule } from '../shared/shared.module';
import { Angular2SmartTableModule } from 'angular2-smart-table';




@NgModule({
  declarations: [
    OrdersComponent,
    OrderIndividualComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule,
    Angular2SmartTableModule
  ]
})
export class OrdersModule { }
