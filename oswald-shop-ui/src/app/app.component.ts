import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from './shared/models/products';
import { Pagination } from './shared/models/pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Oswald';
  products:Product[]=[];

  constructor(private httpClient:HttpClient){}

  ngOnInit(): void {
    this.httpClient.get<Pagination<Product[]>>('https://localhost:5001/api/products?pageSize=50').subscribe((response)=>{
          console.log(response)
          this.products=response.data
    },error=>{
      console.log(error)
    });
  }

 



}
