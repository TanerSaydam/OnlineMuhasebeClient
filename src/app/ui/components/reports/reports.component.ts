import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankComponent } from 'src/app/common/components/blank/blank.component';
import { SectionComponent } from 'src/app/common/components/blank/section/section.component';
import { NavModel } from 'src/app/common/components/blank/models/nav.model';
import { ReportModel } from './models/report.model';
import { ReportService } from './services/report.service';

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

  reports: ReportModel[] = [];

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
      if(this.count <5){
        this.count++;
        this.getAll();
      }else{
        clearInterval(this.interval);
      }
    },5000)
  }

  getAll(){
    this._report.getAll(res=> this.reports = res);
  }

  changeSpanClassByStatus(status:boolean){
    if(status)
      return "text-success";

    return "text-danger";
  }
}
