import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '', pathMatch: 'full', component: LoginComponent
      }
    ])
  ],
  declarations: [LoginComponent],
  entryComponents: [LoginComponent],
  providers: [
    {
      provide: 'login',
      useValue: [{
        name: 'login-component',
        component: LoginComponent
      }],
      multi: true
    },
    LoginService
  ]
})
export class LoginModule { }