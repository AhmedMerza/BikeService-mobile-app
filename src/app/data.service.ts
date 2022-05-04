import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  issues = [
    { id: 0, name: "Wheels", price: 2.0 },
    { id: 1, name: "Rims", price: 1.5 },
    { id: 2, name: "Chain", price: 1.2 },
    { id: 3, name: "Pedals", price: 1.5 },
    { id: 4, name: "Handlebars", price: 2.5 },
    { id: 5, name: "Grips", price: 1.5 },
    { id: 6, name: "Brakes", price: 1.8 },
    { id: 7, name: "Seat", price: 2.8 },
    { id: 8, name: "Suspension", price: 3.5 },
    { id: 9, name: "Shifter", price: 3.5 },
  ];

  types = [
    { id: 0, name: "Road Bike" },
    { id: 1, name: "Cruiser" },
    { id: 2, name: "Fixed Gear" },
    { id: 3, name: "Moutain Bike" },
    { id: 4, name: "BMX" },
    { id: 5, name: "Touring Bike" },
    { id: 6, name: "Recumbent Bike" },
    { id: 7, name: "Folding Bike" },
    { id: 8, name: "Utility Bike" },
  ];

  // Itemslist = [
  //   { id: 0, type: "BIKE", name: "Blue bike", info: "Classic Blue bicylce for regular and sports uses ", pic: "bluebike.png", price: 70, amount: 0 },
  //   { id: 1, type: "SADDLE", name: "Leather Brown Saddle", info: "Authentic Brown leather saddle for premium comfort and look  ", pic: "LeaBrownsaddle.jpg" , price: 55.5, amount: 0 },
  //   { id: 2, type: "ACCESSORIES", name: "Phone handle", info: "Handler to mount on the bike it fits all types of phones ", pic: "phonehand.jpg" , price: 5, amount: 0  },
  //   { id: 3, type: "SADDLE", name: "Black Saddle", info: "Classic Black bicylce saddle for regular and sports uses ", pic: "saddle1.jpg" , price: 35, amount: 0  }
  // ];

  bikeParts = [
    { id: 0, checked: false, image: "../../assets/img/serviceImages/frontAnatomy.jpg" },
    { id: 1, checked: false, image: "../../assets/img/serviceImages/frameAnatomy.jpg" },
    { id: 2, checked: false, image: "../../assets/img/serviceImages/saddleAnatomy.jpg" },
    { id: 3, checked: false, image: "../../assets/img/serviceImages/peddleAnatomy.jpg" },
  ];


  constructor() { }
}
