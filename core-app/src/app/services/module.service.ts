import { HttpClient } from '@angular/common/http';
import { Injectable, Compiler, Inject, ReflectiveInjector, Injector, COMPILER_OPTIONS } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ModuleData } from './../models/module.model';
import { PluginConfig } from '@accretio/common';


// Needed for the new modules
import * as AngularCore from '@angular/core';
import * as AngularCommon from '@angular/common';
import * as AngularRouter from '@angular/router';
// import * as AngularClarity from '@clr/angular';
import * as BrowserAnimations from '@angular/platform-browser/animations';

declare var SystemJS: any;

@Injectable()
export class ModuleService {
  source = `http://${window.location.host}/`;
  private readonly jsonURL = 'assets/plugins/modules.json';

  constructor(private compiler: Compiler, private http: HttpClient, private injector: Injector) { }

  loadModules(): Observable<ModuleData[]> {
    return this.http.get<ModuleData[]>(this.jsonURL).pipe(
      map(res => res)
    );
  }

  public loadModule(moduleInfo: ModuleData): Observable<any> {
    const url = this.source + moduleInfo.location;
    return this.http.get(url).pipe(
      map(res => JSON.stringify(res)),
      map(source => {
        const exports = {}; // this will hold module exports
        const modules = {   // this is the list of modules accessible by plugins
          '@angular/core': AngularCore,
          '@angular/common': AngularCommon,
          '@angular/router': AngularRouter,
          '@angular/platform-browser/animations': BrowserAnimations
          // '@clr/angular': AngularClarity
        };

        // shim 'require' and eval
        const require: any = (module) => modules[module];
        // eval(source);

        // Need to check if there is another solution for eval as this is described as 'Evil'

        this.compiler.compileModuleAndAllComponentsSync(exports[`${moduleInfo.moduleName}`]);
        // console.log(exports); // disabled as this object is cleared anyway
        return exports;
      })
    );
  }

  loadModuleSystemJS(moduleInfo: ModuleData): Promise<any> {
    const url = this.source + moduleInfo.location;
    SystemJS.set('@angular/core', SystemJS.newModule(AngularCore));
    SystemJS.set('@angular/common', SystemJS.newModule(AngularCommon));
    SystemJS.set('@angular/router', SystemJS.newModule(AngularRouter));
    SystemJS.set('@angular/platform-browser/animations', SystemJS.newModule(BrowserAnimations));
    // SystemJS.set('@clr/angular', SystemJS.newModule(AngularClarity));

    // now, import the new module
    return SystemJS.import(`${url}`).then((module) => {
      console.log(module);
      return this.compiler.compileModuleAndAllComponentsAsync(module[`${moduleInfo.moduleName}`]).then(compiled => {
        console.log(compiled);
        return module;
      });
    });
  }

  public async injectModuleSystemJS(plugin: PluginConfig, selector: any): Promise<any> {
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
    return selector.createComponent(componentFactory);
  }
}
