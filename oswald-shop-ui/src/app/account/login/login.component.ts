import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LoginComponent implements OnInit {

  container:HTMLElement= document.getElementById("container");
  containerClass:string=''

  returnUrl:string;

  errors:string[] | null = null;

  complexPassword="(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$";

  loginForm= new FormGroup({
    email:new FormControl('',[ Validators.required, Validators.email]),
    password:new FormControl('', [Validators.required, ]),
  });

  registerForm= this.formBuilder.group({
    displayName:['',Validators.required],
    email:['', [Validators.required, Validators.email]],
    password:['',[Validators.required, Validators.pattern(this.complexPassword)]]
  })

  constructor(private accountService:AccountService,
              private router:Router, 
              private formBuilder:FormBuilder,
              private toastService:ToastrService,
              private activatedRoute:ActivatedRoute) {
                this.returnUrl=this.activatedRoute.snapshot.queryParams['returnUrl'] || '/shop';

               }

  ngOnInit(): void { 
  }

  
  animate(){
   this.containerClass===''? this.containerClass='sign-up-mode': this.containerClass=''; 
  }

  onSubmit(){
    this.accountService.login(this.loginForm.value).subscribe({
      next:()=> this.router.navigateByUrl(this.returnUrl)
    })
  }


  onSubmitRegister(){
    this.accountService.register(this.registerForm.value).subscribe({
      next:() => this.router.navigateByUrl('/shop'),
      error:error => this.toastService.error(error.errors) 
    })
  }



  

  


}
