import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginReponseModel } from 'src/app/ui/components/auth/models/login-response.model';
import { ErrorService } from './error.service';
import { LoginResponseService } from './login-response.service';

@Injectable({
  providedIn: 'root'
})
export class GenericHttpService {

  apiUrl: string = "https://localhost:7010/api/";
  token: string = "";
  loginResponse: LoginReponseModel = new LoginReponseModel();
  constructor(
    private _http: HttpClient,
    private _error: ErrorService,
    private _loginResponse: LoginResponseService
  ) {
    this.loginResponse = this._loginResponse.getLoginResponseModel();
    this.token = this.loginResponse.token.token;
  }

  get<T>(api: string, callBack: (res: T) => void, authorize: boolean = true, diffApi: boolean = false) {
    this._http.get<T>(`${this.setApi(diffApi, api)}`, this.setOptions(authorize)).subscribe({
      next: (res) => callBack(res),
      error: (err: HttpErrorResponse) => this._error.errorHandler(err)
    });
  }

  post<T>(api: string, model: any, callBack: (res: T) => void, authorize: boolean = true, diffApi: boolean = false) {
    this._http.post<T>(`${this.setApi(diffApi, api)}`, model, this.setOptions(authorize)).subscribe({
      next: (res) => callBack(res),
      error: (err: HttpErrorResponse) => this._error.errorHandler(err)
    });
  }

  setApi(diffApi: boolean, api: string) {
    if (diffApi)
      return api;    
    return this.apiUrl + api;
  }

  setOptions(authorize: boolean) {
    if (authorize)
      return { headers: { "Authorization": `Bearer ${this.token}`}}
    return {}
  }
}
