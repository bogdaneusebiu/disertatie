import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IProduct } from 'src/app/shared/Models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';
import { IBrand } from 'src/app/shared/Models/brands';
import { ShopParams } from 'src/app/shared/Models/shopParams';
import { filter } from 'rxjs';
import { IProductType } from 'src/app/shared/Models/productTypes';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute, private bcService: BreadcrumbService, private basketService: BasketService, private router: Router){
    this.bcService.set('@productDetails', ' ');
    this.route = this.router.url;
  }

  product: IProduct;
  products: IProduct[];
  shopParams = new ShopParams();
  types:IProductType[];
  quantity = 1;
  route: any

  ngOnInit(): void {
    this.loadProduct();
    this.getProducts();
    this.getTypes();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
      .subscribe(event => {
        this.route = event['url'];
        console.log(this.route)
        this.loadProduct();
        this.getProducts();
      });
  }


  addItemToBasket(){
    this.basketService.addItemToBasket(this.product, this.quantity);
  }

  incrementQuantity()
  {
    this.quantity++;
  }

  decrementQuantity()
  {
    this.quantity--;
    if (this.quantity < 1){
      this.quantity = 1;
    }
  }

  loadProduct(){
    this.shopService.getProduct(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe(result => {
      this.product = result;
      this.bcService.set('@productDetails', result.name)
    }, error =>{
      console.log(error);
    });
  }

  getProducts(){
    this.shopService.getProducts(this.shopParams).subscribe(response =>{
      this.products = response.data;
      this.shopParams.pageNumber = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
    }, error => {
      console.log(error);
    })
  }

  getTypes(){
    this.shopService.getTypes().subscribe(respose=>{
      this.types = respose;
    }, error =>{
      console.log(error)
    })
  }


}
