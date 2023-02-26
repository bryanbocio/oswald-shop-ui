import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket, BasketItem } from '../shared/models/basket';
import { Product } from '../shared/models/products';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl=environment.API_URL;
  private basketSource= new BehaviorSubject<Basket | null>(null);
  BasketSource$= this.basketSource.asObservable();

  constructor(private httpClient: HttpClient) { }


  getBasket(id:string){
    return this.httpClient.get<Basket>(this.baseUrl.concat('baseket?id='+id)).subscribe({
      next:basket=>this.basketSource.next(basket)
    })
  }


  setBasket(basket:Basket){
    return this.httpClient.post<Basket>(this.baseUrl.concat('basket'), basket).subscribe({
      next:basket=>this.basketSource.next(basket)
    })
  }

  getCurrentBasketValue(){
    return this.basketSource.value;
  }

  addItemToBasket(item: Product, quantity=1){
    const itemToAdd=this.mapProductItemToBasketItem(item);
    const basket=this.getCurrentBasketValue() ?? this.createBasket();

    basket.items=this.addOrUpdateItem(basket.items, itemToAdd, quantity);

    this.setBasket(basket);

  }

  createBasket():Basket{
    const basket= new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private addOrUpdateItem(items:BasketItem[], itemToAdd:BasketItem, quantity:number):BasketItem[]{
      const item= items.find(x=> x.id===itemToAdd.id);
      if(item) item.quantity+=quantity;
      else{
        itemToAdd.quantity=quantity;
        items.push(itemToAdd);
      }

      return items;
  }

  private mapProductItemToBasketItem(item:Product):BasketItem{
    return {
      id:item.id,
      productName:item.name,
      price:item.price,
      quantity:0,
      pictureUrl:item.pictureUrl,
      brand:item.productBrand,
      type:item.productType
    }
  }
}
