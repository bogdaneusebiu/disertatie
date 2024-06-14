import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/Models/pagination';
import { IBrand } from '../shared/Models/brands';
import { IProductType } from '../shared/Models/productTypes';
import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/Models/shopParams';
import { IProduct } from '../shared/Models/product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = 'https://localhost:5001/api/';

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
        return response.body;
      })
    );
  }

  getBrands(){
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');

  }

  getTypes(){
    return this.http.get<IProductType[]>(this.baseUrl + 'products/types');

  }

  getProduct(id: number){
    return this.http.get<IProduct>(this.baseUrl+'products/'+ id );
  }
}
