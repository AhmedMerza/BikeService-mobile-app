import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AngularFirestore} from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

 
export interface Product {
  id: number;
  name: string;
  price: number;
  type: string;
  info: string;
  pic: string;
  discount: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // data: Product[] = [
  //   { id: 0, name: 'Pizza Salami', price: 8.99, amount: 0 },
  //   { id: 1, name: 'Pizza Classic', price: 5.49, amount: 0 },
  //   { id: 2, name: 'Sliced Bread', price: 4.99, amount: 0 },
  //   { id: 3, name: 'Salad', price: 6.99, amount: 0 }
  // ];

  // Itemslist: Product[] = [
  //   { id: 0, type: "BIKE", name: "Blue bike", info: "Classic Blue bicylce for regular and sports uses", pic: "bluebike.png", price: 70, discount: 0 },
  //   { id: 1, type: "SADDLE", name: "Leather Brown Saddle", info: "Authentic Brown leather saddle for premium comfort and look  ", pic: "LeaBrownsaddle.jpg" , price: 55.5, discount: 0 },
  //   { id: 2, type: "ACCESSORIES", name: "Phone handle", info: "Handler to mount on the bike it fits all types of phones ", pic: "phonehand.jpg" , price: 5, discount: 0  },
  //   { id: 3, type: "SADDLE", name: "Black Saddle", info: "Classic Black bicylce saddle for regular and sports uses ", pic: "saddle1.jpg" , price: 35, discount: 0  }
  // ];
 
  private cart = [];
  private cartItemCount = new BehaviorSubject(0);

  index: number;
  searchedItems;
 
  private products: Observable<Product[]>;
  private productCollection: AngularFirestoreCollection<Product>;

  constructor(private afs: AngularFirestore) {
        this.productCollection = this.afs.collection<Product>('items');
        this.products= this.productCollection.snapshotChanges().pipe(
          map(actions => {
            return actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            });
          })
        );
      }
    

  getProducts (): Observable<Product[]> {
        return this.products;
      }

     getProduct(id:number): Observable<Product> {
          return this.productCollection.doc<Product>(id.toString()).valueChanges().pipe(
            map(product => {
              product.id = id;
              return product
            })
          );
        }

     addIdea(idea: Product): Promise<DocumentReference> {
            return this.productCollection.add(idea); 
        }
      updateIdea(product: Product): Promise<void> {
          return this.productCollection.doc(product.id.toString()).update({ name: product. name, price: product.price, info: product.info, type: product.type, discount: product.discount });
        }
       
        deleteIdea(id: string): Promise<void> {
          return this.productCollection.doc(id).delete();
        }
      
  // getProducts() {
  //   return this.Itemslist;
  // }
 
  getCart() {
    return this.cart;
  }
 
  getCartItemCount() {
    return this.cartItemCount;
  }
 
  addProduct(product) {
    let added = false;
    for (let p of this.cart) {
      if (p.id === product.id) {
        p.amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      product.amount = 1;
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }
 
  decreaseProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.amount -= 1;
        if (p.amount == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }
 
  removeProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
  }

  checkOut() {
    this.cart = [];
    this.cartItemCount.next(0);
  }
}