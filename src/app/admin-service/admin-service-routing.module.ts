import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminServicePage } from './admin-service.page';

const routes: Routes = [
  {
    path: '',
    component: AdminServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminServicePageRoutingModule {}
