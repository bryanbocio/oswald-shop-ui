import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DeliveryMethod } from '../shared/models/deliveryMethods';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  baseUrl:string = environment.API_URL;


  constructor(private httpClient:HttpClient) { }


  getDeliveryMethods(){
    return this.httpClient.get<DeliveryMethod[]>(this.baseUrl.concat('order/deliveryMethods')).pipe(
      map(deliveryMethod=>{
        return deliveryMethod.sort((a,b) => b.price - a.price)
      })
    )
  }
}
