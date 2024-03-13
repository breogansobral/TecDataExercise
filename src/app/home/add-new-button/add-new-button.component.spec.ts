import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddNewButtonComponent } from './add-new-button.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule } from '@angular/material/button';

describe('AddNewButtonComponent', () => {
  let component: AddNewButtonComponent;
  let fixture: ComponentFixture<AddNewButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewButtonComponent ],
      imports: [
        RouterTestingModule,
        MatButtonModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('button text should toggle based on `toggleAddButton` value', () => {
    expect(fixture.nativeElement.querySelector('button').textContent).toContain('Añadir Héroe');

    component.toggleAddButton = true;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('button').textContent).toContain('Lista Héroes');
  });
});
