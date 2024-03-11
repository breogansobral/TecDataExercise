import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuperHeroComponent } from './super-hero.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { SuperHerosService } from 'src/app/_services/super-heros.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs/internal/observable/of';

describe('SuperHeroComponent', () => {
  let component: SuperHeroComponent;
  let fixture: ComponentFixture<SuperHeroComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [SuperHeroComponent],
      imports: [
        MatDialogModule,
        MatSnackBarModule,
        MatCardModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: MatSnackBar, useValue: mockSnackBar },
        SuperHerosService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SuperHeroComponent);
    component = fixture.componentInstance;
    component.hero = {
      id: 1,
      name: 'Hero Name',
      element: 'Hero Element',
      age: 30,
      place: 'Hero Place',
      powers: [{ id: 1, power: 'Invisibility' }],
      img: 'prueba.png',
      color: 'Azul'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call MatDialog.open when delete button is clicked', () => {
    fixture.debugElement.query(By.css('.delete-button')).nativeElement.click();
    expect(mockDialog.open).toHaveBeenCalled();
  });

  it('should display hero details correctly', () => {
    const nameElement = fixture.debugElement.query(By.css('mat-card-title')).nativeElement;
    const elementElement = fixture.debugElement.query(By.css('mat-card-subtitle')).nativeElement;
    const ageElement = fixture.debugElement.queryAll(By.css('.hero-detail'))[0].nativeElement;
    const placeElement = fixture.debugElement.queryAll(By.css('.hero-detail'))[1].nativeElement;

    expect(nameElement.textContent).toContain(component.hero.name);
    expect(elementElement.textContent).toContain(component.hero.element);
    expect(ageElement.textContent).toContain(component.hero.age.toString());
    expect(placeElement.textContent).toContain(component.hero.place);
  });

  // Aquí puedes añadir más pruebas según sea necesario...
});
