import { Component, OnInit } from '@angular/core';
import { ServiceService, Service } from '../service.service';
import { UserService, User } from '../user.service';
import { Storage } from '@capacitor/storage';
import { AlertController } from '@ionic/angular';
import { WalletService } from '../wallet.service'

@Component({
  selector: 'app-service-history',
  templateUrl: './service-history.page.html',
  styleUrls: ['./service-history.page.scss'],
})
export class ServiceHistoryPage implements OnInit {

  userID: string;
  services: Service[];
  noItem: boolean;

   public RateArray = [];
    

  constructor(public userServ: UserService, public serviceServ: ServiceService, public alertCtrl: AlertController, public walletServ: WalletService) { 
    userServ.getUsers().subscribe(users => {
      var email;
      Storage.get({key: 'email'}).then((res) => {
        email = res.value;
         var user = users.filter(use => use.email == email)[0]
         this.userID = user.id;
        if (user == null)
          alert("Unknown user")})
    })

    serviceServ.getServices().subscribe(users => {
      this.services = users.filter(use => use.userID == this.userID)
        if (this.services.length == 0) {
          this.noItem = true;
        }
        for (var i = 0; i < this.services.length; i++) {
          // if (this.services[i].state == "0")
          // this.services[i].state = "Processing"
          // else if (this.services[i].state == '1') {
          //   this.services[i].state = 'Completed successfully'
          // }
          this.RateArray.push([
                {    value: 1,    icon: "star-outline"    },
                {    value: 2,    icon: "star-outline"    },
                {    value: 3,    icon: "star-outline"    }, ]
              )
        }
    }) 
  }

  setRating(val: number, index: number){
       for (var i = 0; i < this.RateArray[index].length; i++) {
      if (i < val) {
           this.RateArray[index][i].icon = "star";
      }
      else {
           this.RateArray[index][i].icon = "star-outline";
          }
        } // end for 
       }
      
    rate (index: number) {
      if (this.RateArray[index][0].icon != "star") return;
      var rate = 0;
      for (let i of this.RateArray[index])
        if (i.icon == 'star') rate += 1;
      this.services[index].rate = rate.toString();
      this.services[index].state = "Done";
      this.serviceServ.updateService(this.services[index]);
      this.alert();
    }

    async alert(header = 'Rating successfully', message: string = "Thank you for rating us", text: string = "Dismiss") {
      let alert = await this.alertCtrl.create({
        header: header,
        message: message,
        buttons: [{
          text: text,
        }]
      })
      alert.present();
    }

    pay(index: number) {
      this.services[index].state = "Rate time";
      this.serviceServ.updateService(this.services[index]);
      var servicePrice = 0;
      if (this.services[index].serviceType.toLowerCase().indexOf('major') > -1)
        servicePrice = 20;
      else if (this.services[index].serviceType.toLowerCase().indexOf('minor') > -1)
         servicePrice = 10;
      if (this.walletServ.getWallet() < servicePrice) {
        this.alert('Money issue', "Insufficient funds", 'ok');
        return;
      }
      this.walletServ.setWallet(this.walletServ.getWallet() - servicePrice);
      this.alert("Payment status", "You have successfully paid for this service", 'OK');
    }
    

  ngOnInit() {
  }

}
