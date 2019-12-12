import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PLUGIN1_ROUTE } from './plugin1.route';
import { Plugin1Component } from './plugin1.component';
import { SharedModule } from 'shared';
// import { SharedModule } from '../../shared/public_api';

@NgModule({
  imports: [RouterModule.forChild([PLUGIN1_ROUTE]), CommonModule, SharedModule],
  declarations: [Plugin1Component],
  entryComponents: [Plugin1Component]
})
export class Plugin1Module {
  static entry = Plugin1Component;
  static route = PLUGIN1_ROUTE;
}
