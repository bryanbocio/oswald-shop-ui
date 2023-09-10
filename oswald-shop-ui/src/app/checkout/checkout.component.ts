import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
  }

  checkoutForm=this.formBuilder.group({
      addressForm: this.formBuilder.group({
          firstName:['',Validators.required],
          lastName: ['',Validators.required],
          street:   ['',Validators.required],
          city:     ['',Validators.required],
          state:    ['',Validators.required],
          zipcode:  ['',Validators.required]
      }),

      deliveryForm:this.formBuilder.group({
        deliveryMethod:['',Validators.required]
      }),
      paymentForm: this.formBuilder.group({
        nameOnCard:['', Validators.required]
      })
  });

}
