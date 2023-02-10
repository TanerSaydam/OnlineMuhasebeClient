import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginReponseModel } from 'src/app/ui/components/auth/models/login-response.model';
import { ErrorService } from './error.service';
import { LoginResponseService } from './login-response.service';
import jwt_decode from "jwt-decode";
import { CryptoService } from './crypto.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { changeLoading } from '../states/loading/loading.actions';

@Injectable({
  providedIn: 'root'
})
export class GenericHttpService {

  apiUrl: string = "https://localhost:7010/api/";
  refreshTokenApiUrl: string = "Auth/GetTokenByRefreshToken";
  token: string = "";
  isLoading: boolean = false;
  loginResponse: LoginReponseModel = new LoginReponseModel();
  constructor(
    private _http: HttpClient,
    private _error: ErrorService,
    private _crypto: CryptoService,
    private _router: Router,
    private _loginResponse: LoginResponseService,  
    private store: Store<{loading: boolean}>  
  ) { 
    this.store.select("loading").subscribe(res=>{
      this.isLoading = res;
    })
  }

  get<T>(api: string, callBack: (res: T) => void, authorize: boolean = true, diffApi: boolean = false) {
    this.getToken();
    if(!this.isLoading)
      this.store.dispatch(changeLoading()); 
    this._http.get<T>(`${this.setApi(diffApi, api)}`, this.setOptions(authorize)).subscribe({
      next: (res) => {
        if(this.isLoading)
          this.store.dispatch(changeLoading()); 
        callBack(res)
      },
      error: (err: HttpErrorResponse) => {
        if(this.isLoading)
          this.store.dispatch(changeLoading());
        this._error.errorHandler(err);
      }
    });
  }

  post<T>(api: string, model: any, callBack: (res: T) => void, authorize: boolean = true, diffApi: boolean = false) {
    this.getToken();
    if(!this.isLoading)
      this.store.dispatch(changeLoading()); 
    this._http.post<T>(`${this.setApi(diffApi, api)}`, model, this.setOptions(authorize)).subscribe({
      next: (res) => {
        if(this.isLoading)
          this.store.dispatch(changeLoading()); 
        callBack(res)
      },
      error: (err: HttpErrorResponse) => {
        if(this.isLoading)
          this.store.dispatch(changeLoading());        
        this._error.errorHandler(err);
      }
    });
  }  

  setApi(diffApi: boolean, api: string) {
    if (diffApi)
      return api;
    return this.apiUrl + api;
  }

  setOptions(authorize: boolean) {
    if (authorize)
      return { headers: { "Authorization": `Bearer ${this.token}` } }
    return {}
  }


  getToken() {
    debugger
    let accessToken = localStorage.getItem("accessToken");
    if(accessToken == undefined || accessToken == null){
      return;
    }
    this.loginResponse = this._loginResponse.getLoginResponseModel();
    this.token = this.loginResponse.token.token;
    if (this.token != "" && this.token != undefined && this.token != null) {
      var decoded: any = jwt_decode(this.token);
      let time = new Date().getTime() / 1000;
      let refreshToken = new Date(this.loginResponse.token.refreshTokenExpires).getTime() / 1000;
      if (time > decoded.exp) {
        if(refreshToken >= time){
          let model: {userId: string, refreshToken: string, companyId: string} = 
          {
            userId: this.loginResponse.userId, 
            refreshToken: this.loginResponse.token.refreshToken, 
            companyId: this.loginResponse.company.companyId
          };    
          
          this._http.post<LoginReponseModel>(this.apiUrl + this.refreshTokenApiUrl,model).subscribe({
            next: (res)=>{
              let cryptoValue = this._crypto.encrypto(JSON.stringify(res));
              localStorage.setItem("accessToken",cryptoValue);
              this.loginResponse = res;
              this.token = this.loginResponse.token.token;
            },
            error: (err)=>{
              this._error.errorHandler(err);
              console.log(err);
            }
          });          
        }
        else{
          localStorage.removeItem("accessToken");
          this._router.navigateByUrl("/login")
        }
      }      
    }
  }
}
