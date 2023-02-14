import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BlankComponent } from 'src/app/common/components/blank/blank.component';
import { SectionComponent } from 'src/app/common/components/blank/section/section.component';
import { NavModel } from 'src/app/common/components/blank/models/nav.model';
import { ExcelLoadingButtonComponent } from 'src/app/common/components/excel-loading-button/excel-loading-button.component';
import { FormsModule, NgForm } from '@angular/forms';
import { PaginationResultModel } from 'src/app/common/models/pagination-result.model';
import { BookEntryModel } from './models/book-entry.model';
import { BookEntryService } from './services/book-entry.service';
import { RequestModel } from 'src/app/common/models/request.model';
import { TrCurrencyPipe } from 'tr-currency';
import { ValidInputDirective } from 'src/app/common/directives/valid-input.directive';
import { LoadingButtonComponent } from 'src/app/common/components/loading-button/loading-button.component';
import { CreateBookEntryModel } from './models/create-book-entry.model';
import { ToastrService, ToastrType } from 'src/app/common/services/toastr.service';
import { LoginResponseService } from 'src/app/common/services/login-response.service';

@Component({
  selector: 'app-book-entries',
  standalone: true,
  imports: [
    CommonModule,
    BlankComponent,
    SectionComponent, 
    ExcelLoadingButtonComponent, 
    FormsModule, 
    TrCurrencyPipe,
    ValidInputDirective,
    LoadingButtonComponent],
  templateUrl: './book-entries.component.html',
  styleUrls: ['./book-entries.component.css']
})
export class BookEntriesComponent implements OnInit {
  navs: NavModel[] = [
    {
      routerLink: "/",
      class: "",
      name: "Ana Sayfa"
    },
    {
      routerLink: "/book-entires",
      class: "active",
      name: "Yevmiye Fişleri"
    }
  ]
  filterText: string = "";
  pageNumber: number = 1;
  pageSize: number = 5;
  pageNumbers: number[] = [];
  dateInput: string = "";
  typeSelect: string = "Muavin";
  result: PaginationResultModel<BookEntryModel[]> = new PaginationResultModel<BookEntryModel[]>();

  constructor(
    private _bookEntry: BookEntryService,
    private _date: DatePipe,
    private _toastr: ToastrService,
    private _loginResponse: LoginResponseService
  ){
    this.dateInput = _date.transform(new Date(),"yyyy-MM-dd");
  }

  ngOnInit(): void {    
    this.getAll();
  }

  getAll(pageNumber:number = 1){
    this.pageNumber = pageNumber;
    let model: RequestModel = new RequestModel();
    model.pageNumber = this.pageNumber;
    model.pageSize = this.pageSize;

    this._bookEntry.getAll(model,res=>{
      this.result = res;
      this.pageNumbers = [];
      for (let i = 0; i < res.totalPages; i++) {
        this.pageNumbers.push(i+1);
      }
    });
  }

  create(form: NgForm){
    if(form.valid){
      let model: CreateBookEntryModel = new CreateBookEntryModel();
      model.date = form.controls["date"].value;
      model.type = form.controls["type"].value;
      model.description = form.controls["description"].value;
      
      let year = this.dateInput.split("-")[0];
      if(this._loginResponse.getLoginResponseModel().year != +year){
        this._toastr.toast(ToastrType.Error,"Sadece seçili yıla işlem yapabilirsiniz!");
        return;
      }

      this._bookEntry.create(model,(res)=>{
        this._toastr.toast(ToastrType.Success,res.message,"");
        form.controls["description"].setValue("");
        this.dateInput = this._date.transform(new Date(),"yyyy-MM-dd");
        this.typeSelect = "Muavin";
        this.getAll();
        let element = document.getElementById("createModelCloseBtn");
        element.click();
      });
    }
  }

  changeBlankTrClass(model: BookEntryModel){
    if(model.debit + model.credit == 0)
      return "text-danger"
    
    return ""
  }

  exportExcel(){

  }
}
