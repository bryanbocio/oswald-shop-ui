import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShopService } from './shop.service';
import { Product } from '../shared/models/products';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styles: [
  ]
})
export class ShopComponent implements OnInit {

  @ViewChild('search') searchTerm?: ElementRef;

  //Arrays where store information
  products:Product[]=[];
  brands:Brand[]=[];
  types:Type[]=[];
  
  //variables for sending any params
  shopParams=new ShopParams();

  //sort options avaliables
  sortOptions=[
    {name:'Alphabetical', value:'name'},
    {name:'Price: Low to high', value:'priceAsc'},
    {name:'Price: High to low', value:'priceDesc'}
  ]

  totalCount=0;

  constructor(private shopService:ShopService) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadBrands();
    this.loadTypes();
  }

  loadProducts(){
    this.shopService.getProducts(this.shopParams).subscribe({
      next:response=> {
        this.products=response.data;
        this.shopParams.pageNumber=response.pageIndex;
        this.shopParams.pageSize=response.pageSize;
        this.totalCount=response.count;
      },
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
    this.shopParams.brandId=brandId;
    this.shopParams.pageNumber=1;
    this.loadProducts();
  }

  onTypeSelected(typeId:number){
    this.shopParams.typeId=typeId;
    this.loadProducts();
  }

  onSortSelected(event:any){
    this.shopParams.sort=event.target.value;
    this.loadProducts();
  } 


  onPageChange(event:any){
    if(this.shopParams.pageNumber!==event){
      this.shopParams.pageNumber=event;
      this.loadProducts();
    }
  }


  onSearch(){
    this.shopParams.search=this.searchTerm?.nativeElement.value;
    this.shopParams.pageNumber=1;
    this.loadProducts();
  }

  onReset(){
    if(this.searchTerm) this.searchTerm.nativeElement.value='';
    this.shopParams=new ShopParams();
    this.loadProducts();
  }
}
