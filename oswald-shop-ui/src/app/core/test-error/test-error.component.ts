import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {
  baseUrl=environment.API_URL;



  constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
  }

  get404Error(){
    this.httpClient.get(this.baseUrl.concat('products/345')).subscribe({
      next: response=> console.log(response),
      error:error=>console.log(error)
    });
  }

  get500Error(){
    this.httpClient.get(this.baseUrl.concat('buggy/servererror')).subscribe({
      next: response=> console.log(response),
      error:error=>console.log(error)
    });
  }

  get400Error(){
    this.httpClient.get(this.baseUrl.concat('buggy/badrequest')).subscribe({
      next: response=> console.log(response),
      error:error=>console.log(error)
    });
  }

  get400ValidationError(){
    this.httpClient.get(this.baseUrl.concat('products/fortytwo')).subscribe({
      next: response=> console.log(response),
      error:error=>console.log(error)
    });
  }

}
