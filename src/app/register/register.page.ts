import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, User } from '../user.service';
import { AlertController } from '@ionic/angular';

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

  constructor(public auth: AngularFireAuth, public router : Router, public userServ: UserService, public formbuilder: FormBuilder, public alertCtrl: AlertController) { 
    this.registerForm = formbuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]+([\\._a-z0-9-]*)@[a-z]{3,}(\\.[a-z]{2,3})')],)],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      password1: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      });
      
  }

  ngOnInit() {
  }

  async register(value) {
    if (value.password && value.email && value.password1 /*&& this.fName && this.lName*/)
      if (value.password == value.password1) {
        var allUsers;
        this.userServ.getUsers().subscribe((users)=> {
          allUsers = users.filter((user) =>  {
            return user.email.toLowerCase() == value.email.toLowerCase()
          })
        })
        await new Promise(resolve => setTimeout(resolve, 1000));
         if (allUsers && allUsers.length > 0)  {
            this.error = "Email is already used!";
            return;
          }
        this.auth.createUserWithEmailAndPassword(value.email, value.password).then(()=> { 
          this.alert("Registration", "Your account has been created successfully");
          this.userServ.addUser({
            email: value.email,
            type: 'user',
            wallet: 0
  })
          this.router.navigateByUrl('/log-in');
        }).then((res)=>console.log(res));
      }
    
      else this.error = "Passwords don't match";
    else this.alert('Input validation', 'All inputs are required')
  }

  async alert(header: string, message: string) { 
    var alert = await this.alertCtrl.create({
      header: header, message: message, buttons: ['Dismiss']
    })
    alert.present();
  }

}
