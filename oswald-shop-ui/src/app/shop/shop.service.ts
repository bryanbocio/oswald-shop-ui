import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/products';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Brand } from '../shared/models/brand';
import { Type} from '../shared/models/type';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private httpClient:HttpClient) { }

  getProducts(shopParams:ShopParams):Observable<Pagination<Product[]>>{
    let params=new HttpParams();

    if(shopParams.brandId>0) params=params.append('brandId',shopParams.brandId);
    if(shopParams.typeId) params=params.append('typeId',shopParams.typeId);
    if(shopParams.search)params=params.append('search',shopParams.search)
    
    params=params.append('sort',shopParams.sort);
    params=params.append('pageIndex',shopParams.pageNumber);
    params=params.append('pageSize',shopParams.pageSize);


    return this.httpClient.get<Pagination<Product[]>>(environment.API_URL.concat('products'), {params});
  }

  getBrands(){
      return this.httpClient.get<Brand[]>(environment.API_URL.concat('products/brands'));
  }

  getTypes():Observable<Type[]>{
    return this.httpClient.get<Type[]>(environment.API_URL.concat('products/product-types'));
}
}
