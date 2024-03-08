import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperHerosComponent } from './super-heros.component';

describe('SuperHerosComponent', () => {
  let component: SuperHerosComponent;
  let fixture: ComponentFixture<SuperHerosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuperHerosComponent]
    });
    fixture = TestBed.createComponent(SuperHerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
