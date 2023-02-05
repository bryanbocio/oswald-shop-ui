import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { Product } from '../shared/models/products';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styles: [
  ]
})
export class ShopComponent implements OnInit {
  //Arrays where store information
  products:Product[]=[];
  brands:Brand[]=[];
  types:Type[]=[];
  
  //variables for sending any params
  brandIdSelected=0;
  typeIdSelected=0;

  constructor(private shopService:ShopService) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadBrands();
    this.loadTypes();
  }

  loadProducts(){
    this.shopService.getProducts(this.brandIdSelected,this.typeIdSelected).subscribe({
      next:response=> this.products=response.data,
      error:error=>console.log(error)
    })
  }


  loadBrands(){
    this.shopService.getBrands().subscribe({
        next:response=> this.brands=[{id:0, name:'All'},...response],
        error:error=>console.log(error)
    });
  }

  loadTypes(){
    this.shopService.getTypes().subscribe({
        next:response=> this.types=response=[{id:0, name:'All'},...response],
        error:error=>console.log(error)
    });
  }


  onBrandSelected(brandId:number){
    this.brandIdSelected=brandId;
    this.loadProducts();
  }

  onTypeSelected(typeId:number){
    this.typeIdSelected=typeId;
    this.loadProducts();
  }
}
