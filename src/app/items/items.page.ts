import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { CartService } from './../cart.service';
import { ModalController } from '@ionic/angular';
import { EditItemPage } from '../edit-item/edit-item.page';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {

  constructor(public cartService: CartService, public modalCtrl: ModalController) {
    this.cartService.searchedItems = cartService.getProducts();
  }

  ngOnInit() {
  }


  getItems(ev: any) {

    // set val to the searchbar value
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      var items = this.cartService.getProducts();
      // this.searchedItems = items.filter((item) => {
      //   return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      // })
      this.cartService.searchedItems = items.pipe(map((item) => item.filter((a)=> {return (a.name.toLowerCase().indexOf(val.toLowerCase()) > -1);})))
    }
    else this.cartService.searchedItems = this.cartService.getProducts();
  }

  edit(id) {
    this.cartService.id = id;
    this.openEditModal();
  }

  add() {
    this.cartService.id = null;
    this.openEditModal();
  }

  async openEditModal() {
    let modal = await this.modalCtrl.create({
      component: EditItemPage,
      cssClass: 'cart-modal'
    });
    modal.present();
  }

}
