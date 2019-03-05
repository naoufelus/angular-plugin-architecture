import { AfterViewInit, Component, Compiler, Injector, ViewChild,
         ViewContainerRef } from '@angular/core';

declare const SystemJS: any;

@Component({
  selector: 'app-root',
  template: '<div #content></div>'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('content', { read: ViewContainerRef }) content: ViewContainerRef;

  constructor(private _compiler: Compiler, private _injector: Injector) { }

  ngAfterViewInit() {
    this.loadPlugins();
  }

  private async loadPlugins() {
    // import external module bundle
    const module = await SystemJS.import('assets/plugins/login.bundle.js');

    // compile module
    const moduleFactory = await this._compiler
                                    .compileModuleAsync<any>(module['LoginModule']);

    // resolve component factory
    const moduleRef = moduleFactory.create(this._injector);

    // get the custom made provider name 'plugins'
    const componentProvider = moduleRef.injector.get('login');

    // from plugins array load the component on position 0
    const componentFactory = moduleRef.componentFactoryResolver
                                      .resolveComponentFactory<any>(
                                          componentProvider[0][0].component
                                      );

    // compile component
    const pluginComponent = this.content.createComponent(componentFactory);

    // sending @Input() values
    // pluginComponent.instance.anyInput = 'inputValue';

    // accessing the component template view
    // (pluginComponent.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  }
}
