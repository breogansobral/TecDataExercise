import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteHeroComponent } from './delete-hero.component';

describe('DeleteHeroComponent', () => {
  let component: DeleteHeroComponent;
  let fixture: ComponentFixture<DeleteHeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteHeroComponent]
    });
    fixture = TestBed.createComponent(DeleteHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
