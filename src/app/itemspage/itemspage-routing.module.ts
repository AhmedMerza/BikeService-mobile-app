import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemspagePage } from './itemspage.page';

const routes: Routes = [
  {
    path: '',
    component: ItemspagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemspagePageRoutingModule {}
