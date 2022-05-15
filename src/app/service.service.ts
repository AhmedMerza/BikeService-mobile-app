import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface Service {
  id?: string;
  bikeType: string;
  comments?: string;
  issues: string;
  location: string;
  pickUpDateTime: string;
  rate: string;
  serviceType: string;
  state: string;
  userID: string;
  bikeParts: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  services: Observable<Service[]>;
  serviceCollection: AngularFirestoreCollection<Service>;
  product: Service;

  constructor(private afs: AngularFirestore) { 
    this.serviceCollection = this.afs.collection<Service>('services');
      this.services = this.serviceCollection.snapshotChanges().pipe(
            map(actions => {
              return actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              });
            })
          );
  }

  
  getServices (): Observable<Service[]> {
        return this.services;
      }

     getService(id): Observable<Service> {
          return this.serviceCollection.doc<Service>(id).valueChanges().pipe(
            map(service=> {
              service.id = id;
              return service
            })
          );
        }

      addService(service: Service): Promise<DocumentReference> {
              return this.serviceCollection.add({bikeType: service.bikeType, comments: service.comments, issues: service.issues, location: service.location, pickUpDateTime: service.pickUpDateTime, rate: service.rate, serviceType: service.serviceType, state: service.state, userID: service.userID, bikeParts: service.bikeParts}); 
          }
      updateService(service: Service): Promise<void> {
            return this.serviceCollection.doc(service.id).update({ rate: service.rate, state: service.state});
          }
         
          deleteService(id: string): Promise<void> {
            return this.serviceCollection.doc(id).delete();
          }
}

