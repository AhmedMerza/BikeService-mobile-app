import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { ToastController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular'

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {

  priceState: boolean = true;

  constructor(public cartService: CartService, public toastCtrl: ToastController, public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  checkPrice () {
    if (this.cartService.min < 0 || this.cartService.max < 0) {
      this.toast('Min and max should be greater than 0');
      this.priceState = false;
    }
     else if (this.cartService.max < this.cartService.min) {
      this.priceState = false;
      this.toast("The value of from should be less than or equal to the value of to.")
    }
      else this.priceState = true;
  }

  async toast(message) {
    var toast = await this.toastCtrl.create({
      message: message,
      duration: 2000
    })
    toast.present();
  }

  filter() {
    if (!this.priceState || this.cartService.type.length == 0) {
      this.toast('Please check the price and type!');
      return;
    }
    if (this.cartService.type.length != 4 || this.cartService.max != null)
    this.cartService.searchedItems = this.cartService.getProducts().pipe(
      map(
        (products) => products.filter((product)=> {
          return (this.cartService.type.find((element) => {return element.toLowerCase() == product.type.toLowerCase()}) && ( this.cartService.max == null || (product.price >= this.cartService.min && product.price <= this.cartService.max)))
        })
        ));
      this.modalCtrl.dismiss()
  }


}
