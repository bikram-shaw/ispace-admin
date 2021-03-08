import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePnComponent } from './update-pn.component';

describe('UpdatePnComponent', () => {
  let component: UpdatePnComponent;
  let fixture: ComponentFixture<UpdatePnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
