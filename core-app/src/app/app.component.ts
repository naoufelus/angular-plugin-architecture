import {
  AfterViewInit, Component, ViewChild, ViewContainerRef
} from '@angular/core';
import { Route } from '@angular/router';
import { Observable } from 'rxjs';

import { PluginService, PluginConfig } from '@accretio/common';
import { RouterService } from './services/router.service';

declare const SystemJS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('content', { read: ViewContainerRef }) content: ViewContainerRef;

  public existingRoutes$: Observable<Route[]>;
  private readonly loginConfig: PluginConfig = {
    name: 'login',
    moduleBundlePath: 'assets/plugins/login.bundle.js',
    moduleName: 'LoginModule'
  };


  constructor(private pluginService: PluginService, private routerService: RouterService) {
    this.existingRoutes$ = this.routerService.existingRoutes;
  }

  ngAfterViewInit() {
    // this.loadPlugins();
    // this.pluginService.loadPlugin(this.loginConfig, this.content);
    /* console.log(SystemJS);
    console.log(SystemJS.register);
    console.log('get ' + SystemJS.registry.get('login')); */
  }
}
