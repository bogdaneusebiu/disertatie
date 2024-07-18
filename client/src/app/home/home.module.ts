import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { ShopModule } from '../shop/shop.module';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShopModule,
    RouterLink
  ],
  exports:[HomeComponent]
})
export class HomeModule { }
