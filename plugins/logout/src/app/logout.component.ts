import { Component, OnInit, Input, Output } from '@angular/core';


@Component({
  template: `<h1>Logout</h1>`
})
export class LogoutComponent implements OnInit {
  @Input() public name: string = 'Hello!!';
  //@Output() public

  constructor() { }

  ngOnInit() {
  }
}
