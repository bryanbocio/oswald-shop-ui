import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DeliveryMethod } from 'src/app/shared/models/deliveryMethods';
import { CheckoutService } from '../checkout.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit {

  @Input()checkoutForm?:FormGroup;

  deliveryMethods:DeliveryMethod[]=[]
  constructor(private checkoutService:CheckoutService) { }

  ngOnInit(): void {
    this.checkoutService.getDeliveryMethods().subscribe({
      next: dm=> {
        this.deliveryMethods=dm
        console.log(this.deliveryMethods)
      }
    }
    );

    
  }


  getDeliveryMethods(){
    return this.checkoutService.getDeliveryMethods();
  }
}
