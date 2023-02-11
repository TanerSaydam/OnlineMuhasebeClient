import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankComponent } from 'src/app/common/components/blank/blank.component';
import { SectionComponent } from 'src/app/common/components/blank/section/section.component';
import { NavModel } from 'src/app/common/components/blank/models/nav.model';
import { ReportModel } from './models/report.model';
import { ReportService } from './services/report.service';
import { PaginationResultModel } from 'src/app/common/models/pagination-result.model';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, BlankComponent,SectionComponent],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit, OnDestroy {
  navs: NavModel[] = [
    {
      routerLink: "/",
      class: "",
      name: "Ana Sayfa"
    },
    {
      routerLink: "/reports",
      class: "active",
      name: "Raporlar"
    }
  ]

  result: PaginationResultModel<ReportModel[]> = new PaginationResultModel<ReportModel[]>;

  pageNumber:number = 1;
  pageSize: number = 5;
  pageNumbers: number[] = [];

  count: number = 0;
  interval: any;

  constructor(
    private _report: ReportService
  ){}

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  ngOnInit(): void {
    this.getAll();
    this.interval = setInterval(()=>{
      if(this.count <25){
        this.count++;
        this.getAll(this.pageNumber);
      }else{
        clearInterval(this.interval);
      }
    },5000)
  }

  getAll(pageNumber: number = 1){
    this.pageNumber = pageNumber;
    this._report.getAll(this.pageNumber,this.pageSize,res=> {
      this.result = res;
      this.pageNumbers = [];
      for (let i = 0; i < res.totalPages; i++) {
        this.pageNumbers.push(i+1);
      }
    });
  }

  changeSpanClassByStatus(status:boolean){
    if(status)
      return "text-success";

    return "text-danger";
  }
}
