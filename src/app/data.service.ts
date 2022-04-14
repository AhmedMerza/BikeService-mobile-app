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

  Itemslist = [
    { id: 0, type: "BIKE", name: "Blue bike", info: "Price: 70 BD - Classic Blue bicylce for regular and sports uses ", pic: "bluebike.png" },
    { id: 1, type: "SADDLE", name: "Leather Brown Saddle", info: "Price: 55.5 BD - Authentic Brown leather saddle for premium comfort and look  ", pic: "LeaBrownsaddle.jpg" },
    { id: 2, type: "ACCESSORIES", name: "Phone handle", info: "Price: 5 BD - Handler to mount on the bike it fits all types of phones ", pic: "phonehand.jpg" },
    { id: 3, type: "SADDLE", name: "Black Saddle", info: "Price: 35 BD - Classic Black bicylce saddle for regular and sports uses ", pic: "saddle1.jpg" }
  ];



  constructor() { }
}
