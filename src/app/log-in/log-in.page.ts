import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import {UserService, User} from '../user.service';
import { WalletService } from '../wallet.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})

export class LogInPage implements OnInit {

  email = "xdummyaccoun@gmail.com" 
  password = "xdAccount";
  error ='';

  constructor(public FBAuth: AngularFireAuth, public router: Router, public userServ: UserService, public walletServ: WalletService) {
    Storage.clear();
   }

  ngOnInit() {
  }


  login () {
    this.FBAuth.signInWithEmailAndPassword(this.email, this.password).then(
      () => { this.error = ''; 
      this.password = ''; 

      this.userServ.getUsers().subscribe(users => {
        var user = users.filter(use => use.email == this.email)[0]
        if (user == null) return;
          Storage.set({key:"email", value: this.email});
      })
      this.router.navigateByUrl('/home'); }
    ).catch( () => this.error = 'wrong credentials');
  }

}
