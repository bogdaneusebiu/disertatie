import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/Models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{

  ngOnInit(): void {
    this.loadProduct();
  }

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute){}

  product: IProduct;

  loadProduct(){
    this.shopService.getProduct(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe(result => {
      this.product = result;
    }, error =>{
      console.log(error);
    });
  }

}
