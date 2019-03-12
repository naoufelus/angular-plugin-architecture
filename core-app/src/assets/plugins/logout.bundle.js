(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/router'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/router', '@angular/common'], factory) :
	(factory((global['plugin-logout'] = {}),global.core,global.router,global.common));
}(this, (function (exports,core,router,common) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */







function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}



function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

var LogoutComponent = /** @class */ (function () {
    function LogoutComponent() {
        this.name = 'logout';
        this.sayHelloEvent = new core.EventEmitter();
    }
    LogoutComponent.prototype.ngOnInit = function () { };
    LogoutComponent.prototype.sayHello = function (event) {
        console.log(event);
        this.sayHelloEvent.emit(event);
    };
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], LogoutComponent.prototype, "name", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", Object)
    ], LogoutComponent.prototype, "sayHelloEvent", void 0);
    LogoutComponent = __decorate([
        core.Component({
            template: "\n    <h1>Hello {{name}}!</h1>\n    <button (click)=\"sayHello(name)\">Say hello</button>\n  "
        }),
        __metadata("design:paramtypes", [])
    ], LogoutComponent);
    return LogoutComponent;
}());

var LogoutModule = /** @class */ (function () {
    function LogoutModule() {
    }
    LogoutModule = __decorate([
        core.NgModule({
            imports: [
                common.CommonModule,
                router.RouterModule.forChild([
                    {
                        path: '', pathMatch: 'full', component: LogoutComponent
                    }
                ])
            ],
            declarations: [LogoutComponent],
            exports: [LogoutComponent],
            // entryComponents: [LogoutComponent],
            providers: [
                {
                    provide: 'logout',
                    useValue: [{
                            name: 'logout-component',
                            component: LogoutComponent
                        }],
                    multi: true
                }
            ],
            schemas: [
                core.CUSTOM_ELEMENTS_SCHEMA
            ]
        })
    ], LogoutModule);
    return LogoutModule;
}());

exports.LogoutModule = LogoutModule;
exports.LogoutComponent = LogoutComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
