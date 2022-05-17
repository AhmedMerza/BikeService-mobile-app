import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import {UserService, User} from '../user.service';
import { WalletService } from '../wallet.service';
import { AlertController } from "@ionic/angular"

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})

export class LogInPage implements OnInit {

  email; 
  password;
  error ='';
  loginForm: FormGroup;

  constructor(public FBAuth: AngularFireAuth, public router: Router, public userServ: UserService, public walletServ: WalletService, public formbuilder: FormBuilder, public alertCtrl: AlertController) {
    Storage.clear();
    this.loginForm = formbuilder.group({email: ['', Validators.required], password: ['', Validators.required]});
   }

  ngOnInit() {
  }


  login (val) {
    Storage.clear();
    if (val.email && val.password) {
      this.FBAuth.signInWithEmailAndPassword(val.email, val.password).then(
        () => { this.error = ''; 
        this.password = ''; 
        this.userServ.getUsers().subscribe(users => {
          var user = users.filter(use => use.email == val.email)[0]
          if (user == null) return;
            Storage.set({key:"email", value: val.email});
        })
        this.router.navigateByUrl('/home'); }
      ).catch( () => this.error = 'wrong credentials');
    }
    else {
      this.alert("Inputs validation", "You have to fill email and password");
    }
  }

  async alert(header: string, message: string) { 
    var alert = await this.alertCtrl.create({
      header: header, message: message, buttons: ['Dismiss']
    })
    alert.present();
  }

}
