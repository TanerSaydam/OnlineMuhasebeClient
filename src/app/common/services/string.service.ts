import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringService {

  constructor() { }

  trLowerCase(value: string){
    let newValue: string = "";
    for (let i = 0; i < value.length; i++) {
      const element = value[i];
      if(element == "İ"){
        newValue += "i"
      }else if(element == "I"){
        newValue += "ı"
      }else{
        newValue += element.toLocaleLowerCase();
      }
    }  
    console.log(newValue) ;
    return newValue;
  }
}
