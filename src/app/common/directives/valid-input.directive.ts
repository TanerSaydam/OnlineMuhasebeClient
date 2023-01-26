import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[validInput]',
  standalone: true
})
export class ValidInputDirective {

  @Input("validInput") validInput:boolean = true;
  constructor(
    private _el: ElementRef<HTMLInputElement>,
  ) { }

  @HostListener("keyup") keyup(){        
    if(this.validInput)
      this._el.nativeElement.className = "form-control is-valid";
    else
      this._el.nativeElement.className = "form-control is-invalid";
  }
}
