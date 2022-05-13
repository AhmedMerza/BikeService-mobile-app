import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  id?: string;
  email: string;
  type: string;
  wallet: number;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: Observable<User[]>;
  userCollection: AngularFirestoreCollection<User>;
  product: User;

  constructor(private afs: AngularFirestore) {  this.userCollection = this.afs.collection<User>('users');
      this.users= this.userCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    }

  getUsers (): Observable<User[]> {
        return this.users;
      }

     getUser(id): Observable<User> {
          return this.userCollection.doc<User>(id).valueChanges().pipe(
            map(user=> {
              user.id = id;
              return user
            })
          );
        }

      addUser(user: User): Promise<DocumentReference> {
              return this.userCollection.add({email: user.email, wallet: user.wallet, type: user.type }); 
          }
      updateUser(user: User): Promise<void> {
            return this.userCollection.doc(user.id).update({ email: user.email, wallet: user.wallet, type: user.type  });
          }
         
          deleteUser(id: string): Promise<void> {
            return this.userCollection.doc(id).delete();
          }
}
