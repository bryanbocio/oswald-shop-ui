import { Component, OnInit,Input } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { Product } from 'src/app/shared/models/products';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() product:Product;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
  }

  addItemsToBasket(){
   this.product && this.basketService.addItemToBasket(this.product);
  }
}
