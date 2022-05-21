import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {UserService, User} from '../user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  email;
  err;

  constructor(public FBAuth: AngularFireAuth, public userServ: UserService) { }

  ngOnInit() {
  }

  forgetPassword () {;
    if (this.email == null) return;;
    this.FBAuth.sendPasswordResetEmail(this.email).then(() => {alert("An email has been sent to your account!")}).catch(() => {this.err = "Wrong email"})
  }

}
