import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/Models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{

  ngOnInit(): void {
    this.loadProduct();
  }

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute, private bcService: BreadcrumbService){
    this.bcService.set('@productDetails', ' ');
  }

  product: IProduct;

  loadProduct(){
    this.shopService.getProduct(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe(result => {
      this.product = result;
      this.bcService.set('@productDetails', result.name)
    }, error =>{
      console.log(error);
    });
  }

}
