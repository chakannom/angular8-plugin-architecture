import { Route } from '@angular/router';
import { Plugin1Component } from './plugin1.component';

export const PLUGIN1_ROUTE: Route = {
  path: 'plugin1',
  component: Plugin1Component,
  data: {
    authorities: [],
    pageTitle: 'globla.title'
  }
};
