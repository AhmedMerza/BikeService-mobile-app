import { Component, OnInit } from '@angular/core';
import { CartService } from './../cart.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.page.html',
  styleUrls: ['./edit-item.page.scss'],
})
export class EditItemPage implements OnInit {

  name;
  type;
  price;
  pic;
  discount;
  info;

  constructor(public cartService: CartService) {
    // this.name = cartService.searchedItems[cartService.index].name;
    // this.type = cartService.searchedItems[cartService.index].type;
    // this.pic = cartService.searchedItems[cartService.index].pic;
    // this.discount = cartService.searchedItems[cartService.index].discount;
    // this.info = cartService.searchedItems[cartService.index].info;
    // this.price = cartService.searchedItems[cartService.index].price;
    console.log(cartService.searchedItems)
   }

  ngOnInit() {
  }

}
