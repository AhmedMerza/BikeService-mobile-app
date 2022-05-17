import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ServiceService, Service } from '../service.service';
import { UserService, User } from '../user.service';
import { Storage } from '@capacitor/storage';
import { ServiceHistoryPage } from '../service-history/service-history.page';
import { ModalController } from '@ionic/angular'

@Component({
  selector: 'app-request-service',
  templateUrl: './request-service.page.html',
  styleUrls: ['./request-service.page.scss'],
})
export class RequestServicePage implements OnInit {

  service = 'Major - 20BD';
  dateTime;
  issue;
  etc = '';
  progressBar = 0;
  type;
  pickup = false;
  lines = 'inset';
  comments = ""
  location;
  userID;
  constructor(public dataServ: DataService, public alertCtrl: AlertController, public navCtrl: NavController, public serviceServ: ServiceService, public userServ: UserService, public modalCtrl: ModalController) {
     this.progress()
    userServ.getUsers().subscribe(users => {
      var email;
      Storage.get({key: 'email'}).then((res) => {
        email = res.value;
         var user = users.filter(use => use.email == email)[0]
         this.userID = user.id;
        if (user == null)
          alert("Unknown user")})
    })
     }

  ngOnInit() {
  }

  checkEtc() {
    this.etc = this.issue[this.issue.length - 1];
    if (this.etc == 'Etc') this.lines = "none";
    else this.lines = "inset"
  }

  progress() {
    this.progressBar = 0;
    if (this.type != null)
      this.progressBar += 0.25;
    if (this.issue != null && !this.etcInput())
      this.progressBar += 0.25;
    if (this.location != null)
    this.progressBar += 0.25;
    if (this.pickup == false)
      this.progressBar += 0.25;
    else this.progressBar += 0.25;
  }

  etcInput() {
    if (this.etc == 'Etc') {
      let checked = 0;
      for (let i = 0; i < this.dataServ.bikeParts.length; i++)
        if (this.dataServ.bikeParts[i].checked == true) checked++;

      this.comments = this.comments.trim();
      return checked == 0 || this.comments == "" ? true : false
    } else return false;
  }

  async pay() {
    let header = "You request has been submitted";
    let message = "";
    if (this.type != null && this.issue != null && this.location != null) {
      if (this.etc == 'Etc') {

        if (this.etcInput()) {
          header = "Missing information";
          message = "Please fill all the inputs";
        }
      }
      if (this.pickup == false)
        this.dateTime = ""

        var bikeParts: string [] = []; 
    for (let part of this.dataServ.bikeParts) 
      if (part.checked)
        bikeParts.push(part.id.toString());
    var service: Service = {
      bikeType: this.type, pickUpDateTime: this.dateTime, comments: this.comments, issues: this.issue, location: this.location, rate: 'Not decided yet', serviceType: this.service, userID: this.userID,
      state: 'Processing', bikeParts: bikeParts
    }
    this.serviceServ.addService(service);

    } else {
      header = "Missing information";
      message = "Please fill all the inputs";
    }
    let alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: [{
        text: "OK", handler: () => { 
          if (header.indexOf('Missing'))
          window.location.reload();
         }
      }]
    })
    alert.present();
  }

  check(i) {
    this.dataServ.bikeParts[i].checked = !(this.dataServ.bikeParts[i].checked);
  }

  async history() {
    let modal = await this.modalCtrl.create({
      component: ServiceHistoryPage,
      cssClass: 'cart-modal'
    });
    modal.present();
  }

}
