import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelffixPageRoutingModule } from './selffix-routing.module';

import { SelffixPage } from './selffix.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelffixPageRoutingModule
  ],
  declarations: [SelffixPage]
})
export class SelffixPageModule {}
