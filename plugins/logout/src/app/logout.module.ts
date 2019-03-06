import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogoutComponent } from './logout.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LogoutComponent],
  entryComponents: [LogoutComponent],
  providers: [
    {
     provide: 'logout',
     useValue: [{
       name: 'logout-component',
       component: LogoutComponent
     }],
     multi: true
   }
  ]
})
export class LogoutModule { }