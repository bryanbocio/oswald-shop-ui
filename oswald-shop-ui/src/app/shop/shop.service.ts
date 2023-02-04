import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/products';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private httpClient:HttpClient) { }

  getProducts():Observable<Pagination<Product[]>>{
    return this.httpClient.get<Pagination<Product[]>>(environment.API_URL.concat('products'))
  }

}
