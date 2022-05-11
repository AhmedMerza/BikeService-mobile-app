import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public router: Router, public FBAuth: AngularFireAuth) {
    Storage.clear();
    this.load();
  }

  async logout() {
    Storage.clear();
    this.FBAuth.signOut().then( 
      () =>
        this.router.navigateByUrl('/log-in')
      ) 
  }

  async load() {
    const authObserver = this.FBAuth.authState.subscribe( 
            user => {
             if (!user) {
                this.router.navigateByUrl('/log-in');
      }
              authObserver.unsubscribe();
            });
  }


}
