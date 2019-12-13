import {
  Component, OnInit, OnDestroy,
  Injector, ViewChild, ViewContainerRef, Compiler, NgModule, ComponentRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PluginLoaderService } from '../services/plugin-loader/plugin-loader.service';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html'
})
export class DynamicPageComponent implements OnInit, OnDestroy {

  @ViewChild('content', { read: ViewContainerRef, static: true })
  content: ViewContainerRef;

  constructor(
    private route: ActivatedRoute,
    private injector: Injector,
    private pluginLoader: PluginLoaderService,
    private compiler: Compiler) {
  }

  ngOnInit() {
    const componentType = this.route.snapshot.data['factory'];
    this.loadPlugin(componentType);
  }

  ngOnDestroy() {
  }

  loadPlugin(pluginName: string) {
    this.pluginLoader.load(pluginName).then(moduleFactory => {
      const moduleRef = moduleFactory.create(this.injector);
      const entryComponent = (moduleFactory.moduleType as any).entry;
      const compFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(
        entryComponent
      );
      this.content.createComponent(compFactory);
    });
  }
}