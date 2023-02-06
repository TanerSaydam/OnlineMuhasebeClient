import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankComponent } from 'src/app/common/components/blank/blank.component';
import { SectionComponent } from 'src/app/common/components/blank/section/section.component';
import { NavModel } from 'src/app/common/components/blank/models/nav.model';

@Component({
  selector: 'app-ucafs',
  standalone: true,
  imports: [CommonModule, BlankComponent, SectionComponent],
  templateUrl: './ucafs.component.html',
  styleUrls: ['./ucafs.component.css']
})
export class UcafsComponent {
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
}
