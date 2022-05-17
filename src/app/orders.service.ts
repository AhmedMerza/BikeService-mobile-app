import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface Order {
  id?: string;
  itemsID: string[];
  prices: number[];
  quantities: number[];
  totalPrice: number;
  state: string;
  userID: string;
  Date: string;
}


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  orders: Observable<Order[]>;
  ordersCollection: AngularFirestoreCollection<Order>;
  product: Order;

  constructor(private afs: AngularFirestore) {    
     this.ordersCollection = this.afs.collection<Order>('orders');
      this.orders= this.ordersCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );}


  getOrders (): Observable<Order[]> {
        return this.orders;
      }

     getOrder(id): Observable<Order> {
          return this.ordersCollection.doc<Order>(id).valueChanges().pipe(
            map(user=> {
              user.id = id;
              return user
            })
          );
        }

      addOrder(order: Order): Promise<DocumentReference> {
              return this.ordersCollection.add({itemsID: order.itemsID, prices: order.prices, quantities: order.quantities, state: 'On the way', totalPrice: order.totalPrice, userID: order.userID, Date: order.Date }); 
          }
      updateOrder(order: Order): Promise<void> {
            return this.ordersCollection.doc(order.id).update({state: order.state});
          }
         
          deleteOrder(id: string): Promise<void> {
            return this.ordersCollection.doc(id).delete();
          }

}
