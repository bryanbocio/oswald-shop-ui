import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/products';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Brand } from '../shared/models/brand';
import { Type} from '../shared/models/type';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private httpClient:HttpClient) { }

  getProducts(brandId?:number, typeId?:number):Observable<Pagination<Product[]>>{
    let params=new HttpParams();

    if(brandId) params=params.append('brandId',brandId);
    if(typeId) params=params.append('typeId',typeId);

    return this.httpClient.get<Pagination<Product[]>>(environment.API_URL.concat('products'), {params});
  }

  getBrands(){
      return this.httpClient.get<Brand[]>(environment.API_URL.concat('products/brands'));
  }

  getTypes():Observable<Type[]>{
    return this.httpClient.get<Type[]>(environment.API_URL.concat('products/product-types'));
}
}
