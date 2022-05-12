import { DataService } from '../data.service'

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CartService } from './../cart.service';
import { ModalController } from '@ionic/angular';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { BehaviorSubject } from 'rxjs';

import { Animation, AnimationController } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-itemspage',
  templateUrl: './itemspage.page.html',
  styleUrls: ['./itemspage.page.scss'],
})
export class ItemspagePage implements OnInit {

  searchedItems;

  cart = [];
  products = [];
  cartItemCount: BehaviorSubject<number>;
 
  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;

  constructor(public dataServ: DataService, private cartService: CartService, private modalCtrl: ModalController, public animationCtrl: AnimationController) {
    this.searchedItems = cartService.getProducts();
    this.expandVal();
  }

  ngOnInit() {
    // this.products = this.cartService.getProducts();
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
  }

  expand(i) {
    this.expandCard[i] = !this.expandCard[i];
  }

  expandCard: boolean[] = [];

  getItems(ev: any) {

    // set val to the searchbar value
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      var items = this.cartService.getProducts();
      // this.searchedItems = items.filter((item) => {
      //   return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      // })
      this.searchedItems = items.pipe(map((item) => item.filter((a)=> {return (a.name.toLowerCase().indexOf(val.toLowerCase()) > -1);})))

    }
    else this.searchedItems = this.cartService.getProducts();
    this.expandVal();
  }
  

  expandVal() {
    for (let i = 0; i < this.searchedItems.length; i++)
      this.expandCard.push(false)
  }

  addToCart(product) {
    this.cartService.addProduct(product);
    this.animateCSS('tada');
  }
 
  async openCart() {
    this.animateCSS('bounceOutLeft', true);
 
    let modal = await this.modalCtrl.create({
      component: CartModalPage,
      cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
      this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
      this.animateCSS('bounceInLeft');
    });
    modal.present();
  }
 
  animateCSS(animationName, keepAnimated = false) {
    const node = this.fab.nativeElement;
    // node.classList.add('animated', animationName)
    
    // //https://github.com/daneden/animate.css
    // function handleAnimationEnd() {
    //   if (!keepAnimated) {
    //     node.classList.remove('animated', animationName);
    //   }
    //   node.removeEventListener('animationend', handleAnimationEnd)
    // }
    // node.addEventListener('animationend', handleAnimationEnd)
    const animatoin = this.animationCtrl.create().addElement(node).duration(1000).fromTo('opacity', '1', '0')
  }

}

// @keyframes tada{0%{transform:scaleX(1)}10%,20%{transform:scale3d(.9,.9,.9) rotate(-3deg)}30%,50%,70%,90%{transform:scale3d(1.1,1.1,1.1) rotate(3deg)}40%,60%,80%{transform:scale3d(1.1,1.1,1.1) rotate(-3deg)}to{transform:scaleX(1)}}
// .animate__tada{animation-name:tada}