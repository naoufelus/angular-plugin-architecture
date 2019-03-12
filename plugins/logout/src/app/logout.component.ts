import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  template: `
    <h1>Hello {{name}}!</h1>
    <button (click)="sayHello(name)">Say hello</button>
  `
})
export class LogoutComponent implements OnInit {
  @Input() public name: string = 'logout';
  @Output() public sayHelloEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() { }

  public sayHello(event: string) {
    console.log(event);
    this.sayHelloEvent.emit(event);
  }
}
