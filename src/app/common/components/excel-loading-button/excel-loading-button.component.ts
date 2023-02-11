import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-exel-loading-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './excel-loading-button.component.html',
  styleUrls: ['./excel-loading-button.component.css']
})
export class ExcelLoadingButtonComponent {
  isloading: boolean = false; //state

  constructor(
    private store: Store<{loading: boolean}>
  ){
    this.store.select("loading").subscribe(res=>{
      this.isloading = res;
    });
  }
}
