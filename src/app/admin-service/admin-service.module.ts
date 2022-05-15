import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminServicePageRoutingModule } from './admin-service-routing.module';

import { AdminServicePage } from './admin-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminServicePageRoutingModule
  ],
  declarations: [AdminServicePage]
})
export class AdminServicePageModule {}
