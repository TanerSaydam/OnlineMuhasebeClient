import { Injectable } from '@angular/core';
import { MessageResponseModel } from 'src/app/common/models/message-response.model';
import { PaginationResultModel } from 'src/app/common/models/pagination-result.model';
import { ReportRequestModel } from 'src/app/common/models/report-request.model';
import { RequestModel } from 'src/app/common/models/request.model';
import { ResponseModel } from 'src/app/common/models/response.model';
import { GenericHttpService } from 'src/app/common/services/generic-http.service';
import { LoginResponseService } from 'src/app/common/services/login-response.service';
import { ReportModel } from '../models/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  
  constructor(
    private _http: GenericHttpService,
    private _loginResponse: LoginResponseService
  ) { }

  getAll(pageNumber: number = 1, pageSize: number = 5,callBack: (res: PaginationResultModel<ReportModel[]>)=> void){
    let model: RequestModel = new RequestModel();
    model.companyId = this._loginResponse.getLoginResponseModel().company.companyId;
    model.pageNumber = pageNumber;
    model.pageSize = pageSize;
    this._http.post<ResponseModel<PaginationResultModel<ReportModel[]>>>("Reports/GetAll",model, res=>{
      callBack(res.data);
    });
  }

  request(model: ReportRequestModel, callBack: (res:MessageResponseModel)=> void){
    model.companyId = this._loginResponse.getLoginResponseModel().company.companyId;
    this._http.post<MessageResponseModel>("Reports/RequestReport",model, res=>{
      callBack(res);
    })
  }
}
