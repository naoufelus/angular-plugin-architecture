import { COMPILER_OPTIONS, CompilerFactory, Compiler, NgModule } from '@angular/core';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ClarityModule } from '@clr/angular';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { ModuleService } from './services/module.service';
import { RouterService } from './services/router.service';

export function createCompiler(fn: CompilerFactory): Compiler {
  return fn.createCompiler();
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DefaultLayoutComponent
  ],
  imports: [
    // routing,
    FormsModule,
    ClarityModule,
    RouterModule.forRoot([
      {
        path: '',
        component: DefaultLayoutComponent/* ,
        canActivate: [AuthGuard] */
      },
      {
        path: 'dashboard',
        component: DefaultLayoutComponent
      }
    ], { useHash: true }),
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    RouterService,
    ModuleService,
    { provide: COMPILER_OPTIONS, useValue: {}, multi: true },
    { provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS] },
    { provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
