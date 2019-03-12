import { Injectable, Compiler, Injector } from '@angular/core';

import { PluginConfig } from '../models/plugin-config.model';

declare const SystemJS: any;


@Injectable({
  providedIn: 'root'
})
export class PluginService {

  constructor(
    private compiler: Compiler, private injector: Injector
  ) { }

  public async loadPlugin(plugin: PluginConfig, selector: any) {
    const module = await SystemJS.import(plugin.moduleBundlePath);

    // compile module
    const moduleFactory = await this.compiler
      .compileModuleAsync<any>(module[plugin.moduleName]);

    // resolve component factory
    const moduleRef = moduleFactory.create(this.injector);

    // get the custom made provider name 'plugins'
    const componentProvider = moduleRef.injector.get(plugin.name);

    // from plugins array load the component on position 0
    const componentFactory = moduleRef.componentFactoryResolver
      .resolveComponentFactory<any>(
        componentProvider[0][0].component
      );

    // compile component
    const pluginComponent = selector.createComponent(componentFactory);
    pluginComponent.instance.name = 'test';
  }
}
