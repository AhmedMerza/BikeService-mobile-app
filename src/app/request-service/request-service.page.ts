import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-request-service',
  templateUrl: './request-service.page.html',
  styleUrls: ['./request-service.page.scss'],
})
export class RequestServicePage implements OnInit {

  service = 'Major';
  dateTime;
  issue;
  etc = '';
  progressBar = 0;
  type;
  pickup = false;
  lines = 'inset';
  comments = ""

  constructor(public dataServ: DataService, public alertCtrl: AlertController, public navCtrl: NavController) { this.progress() }

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
      this.progressBar += 0.33;
    if (this.issue != null)
      this.progressBar += 0.33;
    if (this.pickup == false)
      this.progressBar += 0.34;
    else this.progressBar += 0.34;
  }

  async pay() {
    let header = "You request has been submitted";
    let message = "";
    if (this.type != null && this.issue != null) {
      let checked = 0;
      if (this.etc == 'Etc') {
        for (let i = 0; i < this.dataServ.bikeParts.length; i++)
          if (this.dataServ.bikeParts[i].checked == true) checked++;

        this.comments = this.comments.trim();

        if (checked == 0 || this.comments == "") {
          header = "Missing information";
          message = "Please fill all the inputs";
        }
      }
      if (this.pickup == false)
        this.dateTime = new Date();

    } else {
      header = "Missing information";
      message = "Please fill all the inputs";
    }
    let alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: [{
        text: "OK", handler: () => { alert.dismiss().then(() => { if (header != "Missing information") this.navCtrl.navigateBack('/home') }) }
      }]
    })
    alert.present();
  }

  check(i) {
    this.dataServ.bikeParts[i].checked = !(this.dataServ.bikeParts[i].checked);
  }

}
