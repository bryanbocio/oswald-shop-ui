import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket, BasketItem, BasketTotals } from '../shared/models/basket';
import { Product } from '../shared/models/products';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl=environment.API_URL;
  private basketSource= new BehaviorSubject<Basket | null>(null);
  basketSource$= this.basketSource.asObservable();

  private basketTotalSource= new BehaviorSubject<BasketTotals | null>(null);
  basketTotalSource$=this.basketTotalSource.asObservable();


  constructor(private httpClient: HttpClient) { }


  getBasket(id:string){
    return this.httpClient.get<Basket>(this.baseUrl.concat('basket?id='+id)).subscribe({
      next:basket=>{
        this.basketSource.next(basket);
        this.calculateTotals();
      }
    })
  }

  setBasket(basket:Basket){
    return this.httpClient.post<Basket>(this.baseUrl.concat('basket'), basket).subscribe({
      next:basket=>{
        this.basketSource.next(basket);
        this.calculateTotals();
      }
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

  private addOrUpdateItem(items:BasketItem[], itemToAdd:BasketItem, quantity:number):BasketItem[]{
    const item= items.find(x=> x.id===itemToAdd.id);
    if(item) item.quantity+=quantity;
    else{
      itemToAdd.quantity=quantity;
      items.push(itemToAdd);
    }

    return items;
}

  createBasket():Basket{
    const basket= new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

 

  private mapProductItemToBasketItem(item:Product):BasketItem{
    return {
      id:item.id,
      productName:item.name,
      price:item.price,
      quantity:0,
      pictureUrl:item.pictureUrl,
      brand:item.productBrand,
      type:item.productType,
    }
  }


  private calculateTotals(){
    const basket=this.getCurrentBasketValue();

    if(!basket) return;

    const shipping=0;
    const subTotal=basket.items.reduce((previewsValue, currentValue)=>(currentValue.price * currentValue.quantity) + previewsValue,0);
    const total=subTotal + shipping;
    this.basketTotalSource.next({shipping, subTotal, total});
  }
}
