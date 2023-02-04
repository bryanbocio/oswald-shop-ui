import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { Product } from '../shared/models/products';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styles: [
  ]
})
export class ShopComponent implements OnInit {
  products:Product[]=[];


  constructor(private shopService:ShopService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(){
    this.shopService.getProducts().subscribe({
      next:response=> this.products=response.data,
      error:error=>console.log(error)
    })
  }
}
