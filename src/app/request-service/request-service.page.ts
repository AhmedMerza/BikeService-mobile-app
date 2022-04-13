import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";

@Component({
  selector: 'app-request-service',
  templateUrl: './request-service.page.html',
  styleUrls: ['./request-service.page.scss'],
})
export class RequestServicePage implements OnInit {

  service = 'Major';
  dateTime;
  issue;
  etc = 'a';
  progressBar = 0;
  type;
  pickup = false;

  constructor(public dataServ: DataService) { }

  ngOnInit() {
  }

  checkEtc() {
    this.etc = this.issue[this.issue.length - 1];
  }

  progress() {
    if (this.type != null)
      this.progressBar += 0.25;
    if (this.issue != null)
      this.progressBar += 0.25;
    if (this.dateTime != null)
      this.progressBar += 0.25;
  }

}
