import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PLUGIN2_ROUTE } from './plugin2.route';
import { Plugin2Component } from './plugin2.component';
import { SharedModule } from 'shared';
// import { SharedModule } from '../../shared/public_api';

@NgModule({
  imports: [RouterModule.forChild([PLUGIN2_ROUTE]), CommonModule, SharedModule],
  declarations: [Plugin2Component],
  entryComponents: [Plugin2Component]
})
export class Plugin2Module {
  static entry = Plugin2Component;
  static route = PLUGIN2_ROUTE;
}
