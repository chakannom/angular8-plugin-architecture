import {
  BrowserModule,
  BrowserTransferStateModule
} from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PluginLoaderService } from './services/plugin-loader/plugin-loader.service';
import { ClientPluginLoaderService } from './services/plugin-loader/client-plugin-loader.service';
import { PluginsConfigProvider } from './services/plugins-config.provider';
import { TransferStateService } from './services/transfer-state.service';
import { RouterModule } from '@angular/router';
import { DynamicPageComponent } from './dynamic-page/dynamic-page.component';

@NgModule({
  declarations: [AppComponent, DynamicPageComponent],
  imports: [
    HttpClientModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RouterModule.forRoot([], { enableTracing: true }),
    BrowserTransferStateModule
  ],
  providers: [
    { provide: PluginLoaderService, useClass: ClientPluginLoaderService },
    PluginsConfigProvider,
    {
      provide: APP_INITIALIZER,
      useFactory: (provider: PluginsConfigProvider) => () =>
        provider
          .loadConfig()
          .toPromise()
          .then(config => (provider.config = config)),
      multi: true,
      deps: [PluginsConfigProvider]
    }
  ],
  entryComponents: [DynamicPageComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(transferStateService: TransferStateService) {}
}
