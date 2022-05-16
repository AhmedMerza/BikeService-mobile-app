import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, User } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  // email = '';
  // password = '';
  // password1 = ''
  // fName = '';
  // lName = '';
  error = '';
  registerForm: FormGroup;

  constructor(public auth: AngularFireAuth, public router : Router, public userServ: UserService, public formbuilder: FormBuilder) { 
    this.registerForm = formbuilder.group({
      email: ['', Validators.compose([Validators.required,])],
      password: ['', Validators.compose([Validators.required])],
      password1: ['', Validators.compose([Validators.required])],
      });
      
  }

  ngOnInit() {
  }

  async register(value) {
    console.log(value.email)
//     if (this.password && this.email && this.password1 /*&& this.fName && this.lName*/)
//       if (this.password == this.password1)
//       this.auth.createUserWithEmailAndPassword(this.email, this.password).then(()=> { 
//         alert('Your accounted created successfully');
//         this.userServ.addUser({
//           email: this.email,
//           type: 'user',
//           wallet: 0
// })
//         this.router.navigateByUrl('/log-in');
//       });
//       else this.error = "Passwords don't match";
//     else alert('Fill all the inputs')
  }

}
