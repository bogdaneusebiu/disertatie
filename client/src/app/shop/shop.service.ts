import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/Models/pagination';
import { IBrand } from '../shared/Models/brands';
import { IProductType } from '../shared/Models/productTypes';
import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/Models/shopParams';
import { IProduct } from '../shared/Models/product';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = environment.apiUrl;
  products: IProduct[] = [];
  brands: IBrand[] = [];
  types: IProductType[] = [];

  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams){
    let params = new HttpParams();

    if(shopParams.brandId != 0){
      params = params.append('brandId', shopParams.brandId.toString());
    }

    if(shopParams.typeId != 0){
      params = params.append('typeId', shopParams.typeId.toString());
    }

    if(shopParams.search){
      params = params.append('search', shopParams.search);
    }

    params = params.append('sort', shopParams.sort);

    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl + 'products', {observe: 'response', params}).pipe(
      map(response => {
        this.products = response.body.data;
        return response.body;
      })
    );
  }

  getBrands(){
    if(this.brands.length > 0){
      return of(this.brands);
    }
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands').pipe(
      map(response =>{
        this.brands = response;
        return response;
      })
    );

  }

  getTypes(){
    if(this.types.length > 0){
      return of(this.types);
    }
    return this.http.get<IProductType[]>(this.baseUrl + 'products/types').pipe(
      map(response =>{
        this.types = response;
        return response;
      })
    );

  }

  getBrand(id:string){
    return this.http.get<IBrand>(this.baseUrl + 'products/brands/' + id);
  }
  getProduct(id: number){
    const product = this.products.find(p=> p.id == id);

    if(product){
      return of(product);
    }
    return this.http.get<IProduct>(this.baseUrl+'products/'+ id );
  }
}
