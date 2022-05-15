import { Component, OnInit } from '@angular/core';
import { ServiceService, Service } from '../service.service';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-service',
  templateUrl: './admin-service.page.html',
  styleUrls: ['./admin-service.page.scss'],
})
export class AdminServicePage implements OnInit {

  services;
  noItem: boolean;

  constructor(public serviceServ: ServiceService, public alertCtrl: AlertController) { 
    this.services = this.serviceServ.getServices().pipe(
      map(
        (services) => services.filter((service)=> {
          return service.state.toLowerCase() != 'done'
        })
        ));
      }

  ngOnInit() {
  }

  update(service: Service) {
    this.serviceServ.updateService(service);
    this.alert("Status", "The status has been updated successfully")
  }

  async alert(header: string, message: string, text: string = "Dismiss") {
    let alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: [{
        text: text,
      }]
    })
    alert.present();
  }

}
