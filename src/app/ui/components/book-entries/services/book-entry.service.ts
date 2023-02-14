import { Injectable } from '@angular/core';
import { GenericHttpService } from 'src/app/common/services/generic-http.service';
import { LoginResponseService } from 'src/app/common/services/login-response.service';
import {RequestModel} from 'src/app/common/models/request.model';
import { PaginationResultModel } from 'src/app/common/models/pagination-result.model';
import { BookEntryModel } from '../models/book-entry.model';
import { MessageResponseModel } from 'src/app/common/models/message-response.model';
import { CreateBookEntryModel } from '../models/create-book-entry.model';
import { ResponseModel } from 'src/app/common/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class BookEntryService {

  constructor(
    private _http: GenericHttpService,
    private _loginResponse: LoginResponseService
  ) { }

  getAll(model: RequestModel, callBack: (res:PaginationResultModel<BookEntryModel[]>)=> void){
    model.companyId = this._loginResponse.getLoginResponseModel().company.companyId;
    model.year = this._loginResponse.getLoginResponseModel().year;
    this._http.post<PaginationResultModel<BookEntryModel[]>>("BookEntries/GetAllBookEntry",model,res=>{
      callBack(res);
    });
  }

  create(model: CreateBookEntryModel, callBack: (res:MessageResponseModel)=> void){
    model.companyId = this._loginResponse.getLoginResponseModel().company.companyId;
    this._http.post<MessageResponseModel>("BookEntries/CreateBookEntry",model,res=>{
      callBack(res);
    })
  }
}
