import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { map, tap } from 'rxjs/operators';

import { ModuleData } from '../models/module.model';
import { ModuleService } from '../services/module.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})

export class DefaultLayoutComponent implements OnInit, OnChanges {
  installedModules$: any;
  errorMessage: string;
  errorVisible = false;

  constructor(
    private routerService: RouterService,
    private moduleService: ModuleService
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    // logique du composant
    console.log('change', changes);
  }

  public ngOnInit(): void {
    this.installedModules$ = this.moduleService.loadModules().pipe(
      tap(response => {
        response.forEach(x => {
          if (x.registered) {
            this.registerRoute(x);
            if (x.moduleName === 'logoutModule') {
              this.registerRoute(x);
            }
          }
        });
      }
      ));
  }

  enableModule(moduleToEnable: ModuleData) {
    // enable or disable module
    if (this.isRegistered(moduleToEnable)) {
      this.routerService.unRegisterRoute(moduleToEnable.path);
    } else {
      this.registerRoute(moduleToEnable);
    }
  }

  isRegistered(moduleData: ModuleData): boolean {
    return this.routerService.routeIsRegistered(moduleData.path);
  }

  private registerRoute(moduleToEnable: ModuleData) {
    // load up the umd file and register the route whenever succeeded.
    this.moduleService.loadModuleSystemJS(moduleToEnable).then(
      (exports) => {
        this.routerService.createAndRegisterRoute(moduleToEnable, exports);
      },
      // tslint:disable-next-line:max-line-length
      (err) => this.showError(`${moduleToEnable.moduleName} could not be found, did you copy the umd file to ${moduleToEnable.location}?`, err));
  }

  private showError(message: string, err) {
    this.errorMessage = message;
    this.errorVisible = true;
    console.log(err); // Log error in console
  }

  closeError() {
    this.errorVisible = false;
  }
}
