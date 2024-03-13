import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SuperherosComponent } from './super-heros.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { SuperHerosService } from 'src/app/_services/super-heros.service';
import { SharedModule } from 'src/app/shared/shared.module';

describe('SuperherosComponent', () => {
  let component: SuperherosComponent;
  let fixture: ComponentFixture<SuperherosComponent>;
  let superHerosServiceMock: jasmine.SpyObj<SuperHerosService>;

  beforeEach(waitForAsync(() => {
    superHerosServiceMock = jasmine.createSpyObj('SuperHerosService', ['getSuperheros']);
    superHerosServiceMock.getSuperheros.and.returnValue(of([
      { id: 1, name: 'Test Hero', powers: [{id: 1, power:'Flying'}], img: 'url', place: 'Place', color: 'Blue', element: 'Agua', age: 24 },
      { id: 2, name: 'Test Hero 2', powers: [{id: 2, power:'Flying 2'}], img: 'url2', place: 'Place2', color: 'Blue2', element: 'Agua2', age: 22 }
    ]));
    TestBed.configureTestingModule({
      declarations: [ SuperherosComponent ],
      imports: [ HttpClientTestingModule, SharedModule ],
      providers: [{ provide: SuperHerosService, useValue: superHerosServiceMock }],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperherosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display loading spinner when isLoading is true', () => {
    component.isLoading = true;
    fixture.detectChanges();
    const spinnerElement = fixture.debugElement.query(By.css('mat-spinner'));
    expect(spinnerElement).toBeTruthy();
  });

  it('should display heroes when isLoading is false', () => {
    component.isLoading = false;
    component.filteredSuperheros = [
      { id: 1, name: 'Test Hero', powers: [{id: 1, power:'Flying'}], img: 'url', place: 'Place', color: 'Blue', element: 'Agua', age: 24 }
    ];
    fixture.detectChanges();
    const heroesContainer = fixture.debugElement.query(By.css('.heroes-container')).nativeElement;
    expect(heroesContainer.children.length).toBeGreaterThan(0);
  });
});
