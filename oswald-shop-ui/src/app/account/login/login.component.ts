import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LoginComponent implements OnInit {

  container:HTMLElement= document.getElementById("container");
  containerClass:String=''

  loginForm= new FormGroup({
    email:new FormControl('', Validators.required),
    password:new FormControl('', Validators.required),
  });

  


  constructor(private accountService:AccountService, private router:Router) { }

  ngOnInit(): void { 
  }

  animate(){
   this.containerClass='sign-up-mode';
  }

  dontAnimate(){
    this.containerClass='';
  }


  onSubmit(){
    this.accountService.login(this.loginForm.value).subscribe({
      next:()=> this.router.navigateByUrl('/shop')
    })
  }



  

  


}
