import { Injectable } from '@angular/core';

declare var require: any;

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  encrypto(value: string): string{
    var CryptoTS = require("crypto-ts");
    return CryptoTS.AES.encrypt(value, 'secret key 123');
  }

  decrypto(value: string): string{
    var CryptoTS = require("crypto-ts");
    var bytes  = CryptoTS.AES.decrypt(value, 'secret key 123');
    var plainText = bytes.toString(CryptoTS.enc.Utf8);   
    return plainText
  }
}
