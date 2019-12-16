import {
  Component,
  Injector,
  OnInit,
  ViewChild,
  ViewContainerRef,
  NgModule,
  Compiler
} from '@angular/core';
import { PluginLoaderService } from './services/plugin-loader/plugin-loader.service';
import { Router, RouterModule } from '@angular/router';
import { DynamicPageComponent } from './dynamic-page/dynamic-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('targetRef', { read: ViewContainerRef, static: true }) vcRef: ViewContainerRef;

  constructor(
    private injector: Injector,
    private pluginLoader: PluginLoaderService,
    private router: Router,
    private compiler: Compiler
  ) {}

  ngOnInit() {
    this.loadPlugin('plugin1');
    // this.loadRouter('plugin1');
    // this.createDynamic('plugin1');
    // this.createRoute(
    //   'plugin1',
    //   'plugin1',
    //   DynamicPageComponent,
    //   'plugin1'
    // );
  }

  createRoute(
    text: string,
    path: string,
    componentType: any,
    factoryType?: any
  ) {
    this.router.config.unshift({
      path: path,
      component: componentType,
      data: {
        factory: factoryType
      }
    });
  }

  loadPlugin(pluginName: string) {
    this.pluginLoader.load(pluginName).then(moduleFactory => {
      const moduleRef = moduleFactory.create(this.injector);
      const entryComponent = (moduleFactory.moduleType as any).entry;
      const compFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(
        entryComponent
      );
      // this.vcRef.createComponent(compFactory);
      this.createRoute(
        'plugin1',
        'plugin1',
        DynamicPageComponent,
        compFactory
      );
    });

    this.pluginLoader.load('plugin2').then(moduleFactory => {
      const moduleRef = moduleFactory.create(this.injector);
      const entryComponent = (moduleFactory.moduleType as any).entry;
      const compFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(
        entryComponent
      );
      // this.vcRef.createComponent(compFactory);
      this.createRoute(
        'plugin2',
        'plugin1/plugin2',
        DynamicPageComponent,
        compFactory
      );
    });
  }

  loadRouter(pluginName: string) {
    this.pluginLoader.load(pluginName).then(moduleFactory => {
      const entryRoute = (moduleFactory.moduleType as any).route;
      console.log(entryRoute);
      const entryComponent = (moduleFactory.moduleType as any).entry;
      this.router.resetConfig(this.router.config.concat({path: entryRoute.path, component: entryComponent}));
    });
    
    // console.log(this.router.config);
    // // this.router.resetConfig();
    // this.router.resetConfig([])
    // console.log(this.router.config);

  //   this.pluginLoader.load(pluginName).then(moduleFactory => {
  //     console.log('test');
  //     const moduleRef = moduleFactory.create(this.injector);
  //     const entryComponent = (moduleFactory.moduleType as any).entry;
  //     const compFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(
  //       entryComponent
  //     );
  //     const entryRoute = (moduleFactory.moduleType as any).route;
  //     console.log(this.router.config.concat(entryRoute));
  //     this.router.resetConfig(this.router.config.concat(entryRoute));
  //   });
  }

  createDynamic(pluginName: string) {
    this.pluginLoader.load(pluginName).then(moduleFactory => {
      const entryRoute = (moduleFactory.moduleType as any).route;
      const entryComponent = (moduleFactory.moduleType as any).entry;
      const routes = [{path: entryRoute.path, component: entryComponent}];
      const tmpModule = NgModule({
        imports: [RouterModule.forChild(routes)],
        declarations: [entryRoute.component]})(class {});

      this.compiler.compileModuleAsync(tmpModule).then((module) => {

        const appRoutes = [...this.router.config];
  
        const route = {
          path: 'plugin1',
          loadChildren() { return module }
        };
  
        appRoutes.push(route);
  
        this.router.resetConfig(appRoutes);
      });
    });
  }

  // createDynamic() {
  //   const template = '<span>generated on the fly</span>';
  //   const tmpCmp = Component({template: template})(class {});

  //   const routes = [{path: '', component: tmpCmp}];
  //   const tmpModule = NgModule({
  //     imports: [RouterModule.forChild(routes)],
  //     declarations: [tmpCmp]})(class {});
    
  //   this.compiler.compileModuleAsync(tmpModule).then((module) => {

  //     const appRoutes = [...this.router.config];

  //     const route = {
  //       path: 'dynamic',
  //       loadChildren() { return module }
  //     };

  //     appRoutes.push(route);

  //     this.router.resetConfig(appRoutes);
  //     this.router.navigateByUrl('/dynamic');
  //   });
  // }
}
