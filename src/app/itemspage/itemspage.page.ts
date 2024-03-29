import { DataService } from '../data.service'

import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { AfterViewInit, QueryList, ViewChildren } from '@angular/core';
import { IonItem, Gesture, GestureController } from '@ionic/angular';

import { CartService } from './../cart.service';
import { ModalController } from '@ionic/angular';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { BehaviorSubject } from 'rxjs';
import { WalletService } from '../wallet.service';
import { FilterPage } from '../filter/filter.page';

import { AnimationController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';   



@Component({
  selector: 'app-itemspage',
  templateUrl: './itemspage.page.html',
  styleUrls: ['./itemspage.page.scss'],
})
export class ItemspagePage implements OnInit, AfterViewInit {

  // searchedItems;
  @ViewChild('cart', { read: ElementRef }) cartBtn: ElementRef;

  cart = [];
  products = [];
  cartItemCount: BehaviorSubject<number>;
  title: string;
  x = 0;
  y = 0;
 
  // @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;

  constructor(public dataServ: DataService, private cartService: CartService, private modalCtrl: ModalController, public animationCtrl: AnimationController, public walletServ: WalletService, private activeRoute: ActivatedRoute, private gestureCtrl: GestureController, private changeDetectorRef: ChangeDetectorRef) {
    cartService.i = activeRoute.snapshot.paramMap.get('i')
    if (cartService.i == '0') {
      this.title = 'Items page'
      cartService.searchedItems = cartService.getProducts();
    } else {
      this.title = 'Offers'
      cartService.searchedItems = this.cartService.getProducts().pipe(
        map(
          (products) => products.filter((product)=> {
            return product.discount > 0
          })
          ));
    }
    this.expandVal();
  }

  ngAfterViewInit(): void {
    this.updateGestures();
  }

  updateGestures() {
    const drag = this.gestureCtrl.create({
  el: this.cartBtn.nativeElement,
  threshold: 1,
  gestureName: 'drag', 
  onStart: ev=> {

  },
  onMove: ev => {
    var x = this.x + ev.deltaX
    var y = this.y + ev.deltaY
      
 
    this.cartBtn.nativeElement.style.transform = `translate(${x}px, ${y}px)`;
    this.changeDetectorRef.detectChanges();
  },
  onEnd: ev => {
    // if (this.x + ev.deltaX < 30  && this.x + ev.deltaX > -330) {
      this.x += ev.deltaX
    // } else if(ev.deltaX + this.x > 30) this.x = 30;
    // else if (ev.deltaX + this.x < -330) this.x = -330;
    this.y += ev.deltaY
  }
});
  drag.enable();
    
  }


  ngOnInit() {
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
      this.cartService.searchedItems = items.pipe(map((item) => item.filter((a)=> {return (a.name.toLowerCase().indexOf(val.toLowerCase()) > -1);})))

    }
    else this.cartService.searchedItems = this.cartService.getProducts();
    this.expandVal();
  }
  

  expandVal() {
    for (let i = 0; i < this.cartService.searchedItems.length; i++)
      this.expandCard.push(false)
  }

  addToCart(product) {
    this.cartService.addToCart(product);
  }
 
  async openCart() {
    let modal = await this.modalCtrl.create({
      component: CartModalPage,
      cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
    });
    modal.present();
  }
 
  async openFilter() {
    let modal = await this.modalCtrl.create({
      component: FilterPage,
      cssClass: 'cart-modal'
    });
    modal.present();
  }


}