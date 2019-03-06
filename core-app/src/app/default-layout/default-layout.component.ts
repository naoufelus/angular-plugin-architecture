import {
  AfterViewInit, Component, ViewChild, ViewContainerRef
} from '@angular/core';
import { PluginService, PluginConfig } from '@accretio/common';


@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements AfterViewInit {
  @ViewChild('content', { read: ViewContainerRef }) content: ViewContainerRef;

  private readonly loginConfig: PluginConfig = {
    name: 'login',
    moduleBundlePath: 'assets/plugins/login.bundle.js',
    moduleName: 'LoginModule'
  };

  constructor(private pluginService: PluginService) { }

  ngAfterViewInit() {
    // this.loadPlugins();
    this.pluginService.loadPlugin(this.loginConfig, this.content);
  }
}
