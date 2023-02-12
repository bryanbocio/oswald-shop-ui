import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Product } from 'src/app/shared/models/products';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product?:Product;

  constructor(private shopService:ShopService, private activatedRoute:ActivatedRoute, private breadCrumbService:BreadcrumbService) {
    this.breadCrumbService.set('@productDetails',' ');

   }

  ngOnInit(): void {
    this.loadProduct()
  }

  loadProduct(){
    const productId=this.activatedRoute.snapshot.paramMap.get('id');
    if(productId) this.shopService.getProductById(+productId).subscribe({
      next: product=>{
        this.product=product;
        this.breadCrumbService.set('@productDetails',product.name)
      },
      error:error=>console.log(error)
    });
  }

}
