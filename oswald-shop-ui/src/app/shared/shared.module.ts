import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import { PaginationHeaderComponent } from './pagination-header/pagination-header.component';
import { PagerComponent } from './pager/pager.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { OrderTotalsComponent } from './order-totals/order-totals.component'
import { ReactiveFormsModule } from '@angular/forms';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { StepperComponent } from './components/stepper/stepper.component';
import {CdkStepperModule } from '@angular/cdk/stepper';
import { TextInputComponent } from './components/text-input/text-input.component';
import { FooterComponent } from './components/footer/footer.component';
import { BasketSummaryComponent } from './basket-summary/basket-summary.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PaginationHeaderComponent,
    PagerComponent,
    OrderTotalsComponent,
    StepperComponent,
    TextInputComponent,
    FooterComponent,
    BasketSummaryComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    CdkStepperModule,
    RouterModule
  ],exports:[
    PaginationModule,
    PaginationHeaderComponent,
    PagerComponent,
    CarouselModule,
    OrderTotalsComponent,
    BsDropdownModule,
    ReactiveFormsModule,
    StepperComponent,
    CdkStepperModule,
    TextInputComponent,
    FooterComponent,
    BasketSummaryComponent
  ]
})
export class SharedModule { }
