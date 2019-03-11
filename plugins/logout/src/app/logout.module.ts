import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LogoutComponent } from './logout.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
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
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class LogoutModule { }