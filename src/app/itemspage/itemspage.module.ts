import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemspagePageRoutingModule } from './itemspage-routing.module';

import { ItemspagePage } from './itemspage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemspagePageRoutingModule
  ],
  declarations: [ItemspagePage]
})
export class ItemspagePageModule {}
