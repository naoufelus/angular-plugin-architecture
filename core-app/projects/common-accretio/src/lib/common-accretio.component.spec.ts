import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonAccretioComponent } from './common-accretio.component';

describe('CommonAccretioComponent', () => {
  let component: CommonAccretioComponent;
  let fixture: ComponentFixture<CommonAccretioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonAccretioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonAccretioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
