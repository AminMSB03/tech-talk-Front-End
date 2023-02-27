import { Router } from '@angular/router';
import { AuthenticatedMoule } from './../utils/authenticated.module';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private TOKEN!:AuthenticatedMoule;
  private LOGIN_ENDPOINT = "users-service/login";
  private PODCATSER_REGITSER_ENDPOINT = "users-service/podcaster/register";


  constructor(private httpClient:HttpClient,private router:Router) { }

  login(email:string,password:string,position:string):Observable<any>{
    return this.httpClient.post(this.LOGIN_ENDPOINT,{"email":`${email}:${position}`,"password":password})
  }


  register(registerForm: FormGroup){
    return this.httpClient.post(this.PODCATSER_REGITSER_ENDPOINT,registerForm.value)
  }

  getTheToken():String|null{
    let token:any = localStorage.getItem('token')
    if(token!=null){
      this.TOKEN = JSON.parse(token)
      return this.TOKEN.access_token
    }
    return null;
  }

  getThePosition():string|null{
    this.getTheToken()
    if(this.TOKEN!=null){
      return this.TOKEN.role
    }
    return null;
  }

  successLogin(){
    let position:any = this.getThePosition();
    console.log(position)
    switch (position) {
      case "PODCASTER":
        this.router.navigateByUrl("/podcaster")
        break;
      default:
        this.router.navigateByUrl("auth/login")
        break;
    }

  }

}
