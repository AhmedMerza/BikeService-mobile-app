import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {

  email = "xdummyaccoun@gmail.com" 
  password = "xdAccount";
  error ='';

  constructor(public FBAuth: AngularFireAuth, public router: Router) { }

  ngOnInit() {
  }

  async save() {
    Storage.set({key:"loggedIn", value: this.email});
  }

  login () {
    this.save();
    this.FBAuth.signInWithEmailAndPassword(this.email, this.password).then(
      () => { this.error = ''; this.password = ''; this.router.navigateByUrl('/home'); }
    ).catch( () => this.error = 'wrong credentials');
  }

}
