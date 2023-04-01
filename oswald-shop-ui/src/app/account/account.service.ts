import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl=environment.API_URL;

  private currentUserSource=new BehaviorSubject<User | null>(null);
  currentUser$=this.currentUserSource.asObservable();

  constructor(private httpClient:HttpClient, private router:Router) { }

  loadCurrentUser(token:String){
    let headers= new HttpHeaders();
    headers= headers.set('Authorization', `Bearer ${token}`)

    return this.httpClient.get<User>(this.baseUrl+'account', {headers}).pipe(
        map(user=>{
          localStorage.setItem('token',user.token);
          this.currentUserSource.next(user);
        })

    )
  }

  login(values:any){
    return this.httpClient.post<User>(this.baseUrl + 'account/login',values).pipe(
      map(user=> {
        localStorage.setItem('token',user.token);
        this.currentUserSource.next(user);
      })
    )
  }


  register(values:any){
    return this.httpClient.post<User>(this.baseUrl + 'account/register',values).pipe(
      map(user=> {
        localStorage.setItem('token',user.token);
        this.currentUserSource.next(user);
      })
    )
  }

  logout(){
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email:string){
    return this.httpClient.get<boolean>(this.baseUrl+'account/emailexist??email='+email)
  }
}
