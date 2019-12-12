import { Route } from '@angular/router';
import { Plugin2Component } from './plugin2.component';

export const PLUGIN2_ROUTE: Route = {
  path: 'plugin2',
  component: Plugin2Component,
  data: {
    authorities: [],
    pageTitle: 'globla.title'
  }
};
