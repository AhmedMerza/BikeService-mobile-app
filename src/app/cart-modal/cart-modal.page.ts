import { Product, CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { WalletService } from '../wallet.service';
import { OrdersService, Order } from '../orders.service';
 
@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {
 
  cart = [];
  loading: boolean = false;
 
  constructor(private cartService: CartService, private modalCtrl: ModalController, private alertCtrl: AlertController, public walletServ: WalletService, public orderServ: OrdersService) { }
 
  ngOnInit() {
    this.cart = this.cartService.getCart();
  }
 
  decreaseCartItem(product) {
    this.cartService.decreaseProduct(product);
  }
 
  increaseCartItem(product) {
    this.cartService.addToCart(product);
  }
 
  removeCartItem(product) {
    this.cartService.removeProduct(product);
  }
 
  getTotal() {
    return this.cart.reduce((i, j) => i + j.price * j.amount * (1-j.discount), 0);
  }
 
  close() {
    this.modalCtrl.dismiss();
  }
 
  async checkout() {
    if (this.cart.length == 0) {
      this.alert('No Product in the cart', 'Please add products to your cart!', ['OK'])
      return;
    }
    this.loading = true;
    var money = this.getTotal();
    if (money > this.walletServ.getWallet()) this.alert("Money issue", "You don't have enough money on your wallet to complete this transaction!", ['OK']);
    else{
      var itemsID: string[] = [];
      var prices: number[] = []
      var quantities: number[] = []
      for (let i = 0; i < this.cart.length; i++) {
        prices.push((this.cart[i].price - this.cart[i].discount* this.cart[i].price)*this.cart[i].amount)
        itemsID.push(this.cart[i].id)
        quantities.push(this.cart[i].amount)
      }
      this.orderServ.addOrder({
  itemsID: itemsID, quantities: quantities,
  prices: prices,
  totalPrice: money,
  state: 'On the way',
  userID: this.walletServ.userID
});
      await new Promise(resolve => setTimeout(resolve, 3000));
      this.walletServ.setWallet(this.walletServ.getWallet() - money);
      this.cartService.checkOut();
      this.alert('Thanks for your Order!', 'We will deliver your items as soon as possible', ['OK'])
    }
    this.loading = false;
  }

  async alert(header?: string, message?: string, buttons?) {
    let alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: buttons,
    });
    alert.present().then(() => {
      if (this.getTotal() <= this.walletServ.getWallet())
      this.modalCtrl.dismiss();
    });
  }

}