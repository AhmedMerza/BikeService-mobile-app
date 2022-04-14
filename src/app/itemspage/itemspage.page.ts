import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'
@Component({
  selector: 'app-itemspage',
  templateUrl: './itemspage.page.html',
  styleUrls: ['./itemspage.page.scss'],
})
export class ItemspagePage implements OnInit {

  searchedItems;

  constructor(public dataServ: DataService) {
    this.searchedItems = dataServ.Itemslist;
    this.expandVal();
  }


  ngOnInit() {
  }

  expand(i) {
    this.expandCard[i] = !this.expandCard[i];
  }

  expandCard: boolean[] = [];

  getItems(ev: any) {

    // set val to the searchbar value
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.searchedItems = this.dataServ.Itemslist.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else this.searchedItems = this.dataServ.Itemslist;
    this.expandVal();
  }

  expandVal() {
    for (let i = 0; i < this.searchedItems.length; i++)
      this.expandCard.push(false)
  }

}

