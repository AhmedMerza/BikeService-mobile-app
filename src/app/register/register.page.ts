import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UserService, User } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email = '';
  password = '';
  password1 = ''
  fName = '';
  lName = '';
  error = '';

  constructor(public auth: AngularFireAuth, public router : Router, public userServ: UserService) { }

  ngOnInit() {
  }

  async register() {
    if (this.password && this.email && this.fName && this.lName)
      if (this.password == this.password1)
      this.auth.createUserWithEmailAndPassword(this.email, this.password).then(()=> { 
        alert('Your accounted created successfully');
        this.userServ.addUser({
          email: this.email,
          type: 'user',
          wallet: 0
})
        this.router.navigateByUrl('/log-in');
      });
      else this.error = "Passwords don't match baby";
    else alert('Fill all the inputs')
  }

}
