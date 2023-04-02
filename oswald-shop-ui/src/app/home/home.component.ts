import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop/shop.service';
import { Product } from '../shared/models/products';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  productList:Product[]=[];

  constructor(private shopService:ShopService) { }

  ngOnInit(): void {
    this.getProductsForSlider();
  }


  getProductsForSlider(){
    if(this.productList.length===0){
      console.log(this.productList)
      this.shopService.getProducts(new ShopParams()).subscribe({
        next: response=>{
          this.productList=response.data;
          console.log(response.data)
        }
      })
    }
  }

}
