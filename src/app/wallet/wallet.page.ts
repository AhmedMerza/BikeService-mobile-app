import { Component, OnInit } from '@angular/core';
import { WalletService } from '../wallet.service'

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {

  money: number;

  constructor(public walletServ: WalletService) { }

  ngOnInit() {
  }

  add()  {
    this.walletServ.add(this.money);
  }

}
