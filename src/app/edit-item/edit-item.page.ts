import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { CartService, Product } from './../cart.service';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular'

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.page.html',
  styleUrls: ['./edit-item.page.scss'],
})
export class EditItemPage implements OnInit {

  name: string;
  type: string;
  price: number;
  pic: string;
  discount: number;
  info: string;

  constructor(public cartService: CartService, public modalCtrl: ModalController, public alertCtrl: AlertController) {
    if (cartService.id == null) return;
    cartService.getProducts().subscribe(pros => {
      var product = pros.filter(product => product.id == cartService.id)[0]
      if (product == null) return;
      this.name = product.name
      this.type = product.type
      this.pic = product.pic
      this.price = product.price
      this.discount = product.discount
      this.info = product.info
    })
   }

  ngOnInit() {
  }

  update() {
    var header;
      if (this.discount && this.price && this.info && this.name && this.type && this.pic) {
      if ( this.discount >= 0 && this.discount <1 && this.price > 0)  {
        this.cartService.updateProduct({
        name: this.name, type: this.type, price: this.price, info: this.info, discount: this.discount, id: this.cartService.id, pic: this.pic
    });
      this.alert("You item has been successfully updated")
      this.modalCtrl.dismiss({
        'dismissed': true
      });

    }
    else  {
      if (this.discount >= 0 && this.discount <1)
        header = 'Disount should be between 0 and 1 exclusive'
      else if (this.price <=0)  
        header = 'Price should be greater than 0'
      this.alert(header)
    }
  } else this.alert('Please fill all the inputs!')
    }

  async alert(header: string) {
    var alertNot = await this.alertCtrl.create({header: header})
    alertNot.present();
    }

    add() {
      var header;
      if ( this.discount >= 0 && this.discount <1 && this.price && this.info && this.name && this.type && this.pic) {
      if ( this.discount >= 0 && this.discount <1 && this.price > 0)  {
        this.cartService.addProduct({
        name: this.name, type: this.type, price: this.price, info: this.info, discount: this.discount, id: this.cartService.id, pic: this.pic
    });
      this.alert("You item has been successfully added")
      this.modalCtrl.dismiss({
        'dismissed': true
      });

    }
    else  {
      if (this.discount < 0 ||  this.discount >= 1)
        header = 'Discount should be between 0 and 1 exclusive'
      else if (this.price <=0)  
        header = 'Price should be greater than 0'
      this.alert(header)
    }
  } else this.alert('Please fill all the inputs!')
    }

    async delete () {
      var alertDelete = await this.alertCtrl.create({
        header: "Delete confirmation", 
        message: 'Are you sure you want to delete this product?',
        buttons: [{text: "Delete", handler: () => {this.modalCtrl.dismiss(); this.cartService.deleteProduct(this.cartService.id);  }}
      , {text: "Cancel"}]
      });

      alertDelete.present();
    }

}
