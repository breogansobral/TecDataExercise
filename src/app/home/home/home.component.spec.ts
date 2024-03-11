import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        NoopAnimationsModule,
        SharedModule,
        BrowserAnimationsModule // Si utilizas animaciones
      ],
      declarations: [ HomeComponent ],
      // providers: [ /* Aquí irían servicios que tu componente utiliza */ ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toggle button should switch between add hero and heroes list view', () => {
    // Asumiendo que toggleAddButton es un booleano que controla qué botón se muestra
    component.toggleAddButton = false; // Estado inicial que muestra "Añadir Héroe"
    fixture.detectChanges();
    let button = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toContain('Añadir Héroe');

    // Simula el clic para cambiar de vista
    component.toggleAddButton = true; // Cambia a la vista de lista de héroes
    fixture.detectChanges();
    button = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toContain('Lista Héroes');
  });

  // Más pruebas aquí...
});
