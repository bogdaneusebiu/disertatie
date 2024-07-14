import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { OrderIndividualComponent } from './order-individual/order-individual.component';

const routes: Routes = [
  {path:'', component: OrdersComponent},
  {path:':id', component: OrderIndividualComponent, data: {breadcrumb: {alias: 'orderIndividual'}}}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class OrdersRoutingModule { }
