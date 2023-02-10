import { Injectable } from '@angular/core';
import { LoginReponseModel } from 'src/app/ui/components/auth/models/login-response.model';
import { CryptoService } from './crypto.service';

@Injectable({
  providedIn: 'root'
})
export class LoginResponseService {

  loginResponse: LoginReponseModel = new LoginReponseModel();
  constructor(
    private _crypto: CryptoService,    
  ){}

  getLoginResponseModel(){
    let token = localStorage.getItem("accessToken")?.toString();
    if(token != undefined){
      let loginResponseString = this._crypto.decrypto(token);    
      this.loginResponse = JSON.parse(loginResponseString);
    } 
    return this.loginResponse;
  }
}
