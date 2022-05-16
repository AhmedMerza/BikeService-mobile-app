import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelffixPage } from './selffix.page';

const routes: Routes = [
  {
    path: '',
    component: SelffixPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelffixPageRoutingModule {}
