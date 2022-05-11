import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {

  wallet: number = 20;
  money: number;

  constructor() { }

  ngOnInit() {
  }

  add()  {
    this.wallet += this.money;
  }

}
