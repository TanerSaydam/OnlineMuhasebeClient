import { Injectable } from '@angular/core';
import { PaginationResultModel } from 'src/app/common/models/pagination-result.model';
import { GenericHttpService } from 'src/app/common/services/generic-http.service';
import { LogRequestModel } from '../models/log-request.model';
import { LogModel } from '../models/log.model';
import {LoginResponseService} from '../../../../common/services/login-response.service'
import { ResponseModel } from 'src/app/common/models/response.model';
import { UcafModel } from '../../ucafs/models/ucaf.model';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(
    private _http: GenericHttpService,
    private _loginResponse: LoginResponseService
  ) { }

  getAllByTableName(model: LogRequestModel , callBack: (res: ResponseModel<PaginationResultModel<LogModel[]>>) => void){
    model.companyId = this._loginResponse.getLoginResponseModel().company.companyId;
    this._http.post<ResponseModel<PaginationResultModel<LogModel[]>>>("Logs/GetLogsByTableName",model, res=>{
      callBack(res);
    });
  }
}
