import { Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WalletService  {

  wallet: number = 20;

  constructor() { }


  add(money: number)  {
    this.wallet += money;
  }
}
