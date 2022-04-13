import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-itemspage',
  templateUrl: './itemspage.page.html',
  styleUrls: ['./itemspage.page.scss'],
})
export class ItemspagePage implements OnInit {

  public Itemslist = [ 
       { type: "BIKE"  , name: "Blue bike" , info: "Price: 70 BD - Classic Blue bicylce for regular and sports uses " , pic: "bluebike.png" },
       { type: "SADDLE" , name: "Leather Brown Saddle"  , info:"Price: 55.5 BD - Authentic Brown leather saddle for premium comfort and look  " , pic: "LeaBrownsaddle.jpg"},
       { type: "ACCESSORIES" , name: "Phone handle" , info:"Price: 5 BD - Handler to mount on the bike it fits all types of phones " , pic: "phonehand.jpg"},
       { type: "SADDLE"  , name: "Black Saddle"   , info:"Price: 35 BD - Classic Black bicylce saddle for regular and sports uses " , pic: "saddle1.jpg"}
    ];

  constructor() { this.initializeItems(); }
  initializeItems() {
    this.Itemslist = [ 
         { type: "BIKE"  , name: "Blue bike" , info: "Price: 70 BD - Classic Blue bicylce for regular and sports uses " , pic: "bluebike.png" },
         { type: "SADDLE" , name: "Leather Brown Saddle"  , info:"Price: 55.5 BD - Authentic Brown leather saddle for premium comfort and look  " , pic: "LeaBrownsaddle.jpg"},
         { type: "ACCESSORIES" , name: "Phone handle" , info:"Price: 5 BD - Handler to mount on the bike it fits all types of phones " , pic: "phonehand.jpg"},
         { type: "SADDLE"  , name: "Black Saddle"   , info:"Price: 35 BD - Classic Black bicylce saddle for regular and sports uses " , pic: "saddle1.jpg"}
      ];
  }

  ngOnInit() {
  }

    
  expandcard=false;
  expand(){
    this.expandcard=!this.expandcard;
  }

  getItems(ev: any) {
    // Reset items back to all items
    this.initializeItems();

    // set val to the searchbar value
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.Itemslist = this.Itemslist.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}

