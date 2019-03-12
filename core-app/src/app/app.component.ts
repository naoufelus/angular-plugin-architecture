import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Route } from '@angular/router';
import { Observable } from 'rxjs';

import { PluginService, PluginConfig } from '@accretio/common';
import { RouterService } from './services/router.service';
import { ModuleService } from './services/module.service';

declare const SystemJS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('content', { read: ViewContainerRef }) content: ViewContainerRef;

  public existingRoutes$: Observable<Route[]>;

  private basic = false;
  private readonly loginConfig: PluginConfig = {
    name: 'logout',
    moduleBundlePath: 'assets/plugins/logout.bundle.js',
    moduleName: 'LogoutModule'
  };


  constructor(
    private pluginService: PluginService,
    private routerService: RouterService,
    private moduleService: ModuleService
  ) {
    this.existingRoutes$ = this.routerService.existingRoutes;
  }

  ngAfterViewInit() {
    // this.loadPlugins();
    const pluginComponent = this.moduleService.injectModuleSystemJS(this.loginConfig, this.content);
    // pluginComponent.instance.name = 'test';
    pluginComponent.then((value) => {
      value.instance.name = 'Naoufel';
      // value.instance.sayHelloEvent = this.getName();
      value.instance.sayHelloEvent.subscribe(
        data => this.openModal(),
        error => console.log(error)
      );
      return value;
    });
  }

  private openModal() {
    this.basic = true;
  }
}
