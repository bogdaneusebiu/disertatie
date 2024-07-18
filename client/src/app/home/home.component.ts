import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/Models/product';
import { ShopService } from '../shop/shop.service';
import { ShopParams } from '../shared/Models/shopParams';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  products: IProduct[];
  shopParams = new ShopParams();

  constructor(private shopService: ShopService){}

  ngOnInit(): void {
    this.getProducts();
  }


  getProducts(){
    this.shopParams.pageSize = 8;
    this.shopService.getProducts(this.shopParams).subscribe(response =>{
      this.products = response.data;
    }, error => {
      console.log(error);
    })
  }
}
