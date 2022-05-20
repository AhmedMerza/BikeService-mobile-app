import { Component, OnInit } from '@angular/core';
import { WalletService } from '../wallet.service'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {

  money: number;

  constructor(public walletServ: WalletService, public alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async add()  {
    if (isNaN(this.money) || this.money <= 0) {
      this.alert('Adding balance to your account', "Balance should be greater than zero")
      return;
    }
      
    this.walletServ.setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    this.walletServ.add(this.money);
    this.walletServ.setLoading(false);
    this.alert('Transaction successfully!', "Balance added to your wallet", ['Enjoy'])
    this.money = null;
  }

  async alert(header?: string, message?: string, buttons = ['ok']) {
    let alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: buttons,
    });
    alert.present();
  }

}
