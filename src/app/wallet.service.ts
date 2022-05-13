import { Injectable} from '@angular/core';
import { UserService, User } from './user.service';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class WalletService  {

  wallet: number;
  email: string;
  userID: string;
  loading: boolean = true;
  userId: string;

  constructor(public userServ: UserService) {
    Storage.get({key: 'email'}).then((res) => {this.email = res.value; 
      this.userServ.getUsers().subscribe(users => {
        var user = users.filter(use => use.email == this.email)[0]
        if (user == null) return;
          this.loading = false;
          this.wallet = user.wallet;
          this.userID = user.id;
      })
    });  
   }


  add(money: number)  {
    this.wallet += money;
    this.userServ.updateUser({email: this.email, wallet: this.wallet, type: 'user', id: this.userID});
  }

  setWallet(wallet) {
    this.wallet = wallet;
  }
}
