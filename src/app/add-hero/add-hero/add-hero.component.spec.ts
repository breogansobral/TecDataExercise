import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddHeroComponent } from './add-hero.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SuperHerosService } from 'src/app/super-heros/super-heros.service';

describe('AddHeroComponent', () => {
  let component: AddHeroComponent;
  let fixture: ComponentFixture<AddHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
        MatDialogModule
      ],
      declarations: [AddHeroComponent],
      providers: [SuperHerosService],
      schemas: [NO_ERRORS_SCHEMA] // Ignore unknown elements, useful if you use Angular Material components that are not directly tested.
    }).compileComponents();

    fixture = TestBed.createComponent(AddHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.addHero.valid).toBeFalsy();
  });

  it('name field validation', () => {
    const name = component.addHero.controls['name'];
    expect(name.valid).toBeFalsy();
    name.setValue('Test Hero');
    expect(name.valid).toBeTruthy();
  });

  it('should add a power', () => {
    component.addPower();
    expect(component.powers.length).toBe(2);
  });

  it('should remove a power', () => {
    component.removePower(0);
    expect(component.powers.length).toBe(0);
  });

});
