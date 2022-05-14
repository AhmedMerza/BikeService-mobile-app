import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { UserService, User } from '../user.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  type: string;
  loading: boolean = true;

  constructor(public router: Router, public FBAuth: AngularFireAuth, public userServ: UserService, private menu: MenuController) {
    this.load();
    Storage.get({key: 'email'}).then((res)=> {if (res.value == null) this.logout();})
    var email;
    Storage.get({key: 'email'}).then((res=> {
      email = res.value;
      this.userServ.getUsers().subscribe(users => {
        var user = users.filter(use => use.email == email)[0]
        if (user == null) return;
          this.loading = false;
          this.type = user.type;
      })
    }));

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

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

}
