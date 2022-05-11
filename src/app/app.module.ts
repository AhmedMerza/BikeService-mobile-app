import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CartModalPageModule } from './cart-modal/cart-modal.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCpb5eL2dU1S2LbekI7WDBWiPzRiIdbN_A",
  authDomain: "itcs444-b43a5.firebaseapp.com",
  projectId: "itcs444-b43a5",
  storageBucket: "itcs444-b43a5.appspot.com",
  messagingSenderId: "380702403685",
  appId: "1:380702403685:web:0ebc7806e03cac57f26a8c",
  measurementId: "G-DJJDYD0GRW"
};



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, CartModalPageModule, 
    // initialize angularfire with credentials from the dashboard
  AngularFireModule.initializeApp(firebaseConfig),
  // Import the AngularFireDatabaseModule to use database
  AngularFirestoreModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
