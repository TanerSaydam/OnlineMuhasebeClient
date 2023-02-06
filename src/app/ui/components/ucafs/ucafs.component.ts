import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankComponent } from 'src/app/common/components/blank/blank.component';
import { SectionComponent } from 'src/app/common/components/blank/section/section.component';
import { NavModel } from 'src/app/common/components/blank/models/nav.model';
import { UcafService } from './services/ucaf.service';
import { UcafModel } from './models/ucaf.model';
import { UcafPipe } from './pipes/ucaf.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ucafs',
  standalone: true,
  imports: [CommonModule, BlankComponent, SectionComponent, UcafPipe, FormsModule],
  templateUrl: './ucafs.component.html',
  styleUrls: ['./ucafs.component.css']
})
export class UcafsComponent implements OnInit{
  navs: NavModel[] = [
    {
      routerLink: "/",
      class: "",
      name: "Ana Sayfa"
    },
    {
      routerLink: "/ucas",
      class: "active",
      name: "Hesap Planı"
    }
  ]

  ucafs: UcafModel[] = [];

  filterText: string = "";

  constructor(
    private _ucaf:UcafService
  ){}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this._ucaf.getAll(res=> {this.ucafs = res.data;});
    
  }
}
