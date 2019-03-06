import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from './register.component';
import { RegisterService } from './register.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [RegisterComponent],
  entryComponents: [RegisterComponent],
  providers: [
    {
      provide: 'register',
      useValue: [{
        name: 'register-component',
        component: RegisterComponent
      }],
      multi: true
    },
    RegisterService
  ]
})
export class RegisterModule { }