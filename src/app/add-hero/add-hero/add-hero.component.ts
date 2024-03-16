import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { SuperHerosService } from 'src/app/_services/super-heros.service';
import { Hero } from 'src/app/models/hero';
import { Power } from 'src/app/models/power';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.css']
})
export class AddHeroComponent implements OnInit, OnDestroy {

  @Input('id') heroId?: string;
  subscription !: Subscription;
  addHero!: FormGroup;
  isLoading: boolean = true;
  defaultImg: string = 'prueba.png';
  hero: Hero | undefined;
  bounceTime: number = 500;

  constructor(
    private fb: FormBuilder,
    private superheroesService: SuperHerosService,
    private actRouter: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  ngOnDestroy(): void {
    if(this.subscription)
      this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.addHero = this.fb.group({
      name: [ '' , Validators.required],
      element: [ '' , Validators.required],
      color: [ '' , Validators.required],
      age: [ '' , [Validators.required, Validators.min(1)]],
      place: [ '' , Validators.required],
      img: ['prueba.png', Validators.required],
      powers: this.fb.array([...this.createPower()])
    });
    const heroId = this.actRouter.snapshot.paramMap.get('id');
    if(heroId)
      this.initForm(+heroId);
  }

  initForm(heroId: number) {
    this.subscription = this.superheroesService.getSuperheroById(heroId)
      .subscribe({
        next: (hero: Hero | undefined) => {
          this.hero = hero;
          this.addHero = this.fb.group({
            name: [!hero ? '' : hero.name, Validators.required],
            element: [!hero ? '' : hero.element, Validators.required],
            color: [!hero ? '' : hero.color, Validators.required],
            age: [!hero ? '' : hero.age, [Validators.required, Validators.min(1)]],
            place: [!hero ? '' : hero.place, Validators.required],
            img: ['prueba.png', Validators.required],
            powers: this.fb.array([...this.createPower(hero?.powers)])
          });

        },
        error: error => {
          console.log(error);
        }
      });
  }

  get powers(): FormArray {
    return this.addHero.get('powers') as FormArray;
  }

  createPower(powers: Power[] | undefined = undefined): FormControl[]{
    if(!powers)
      return [this.fb.control('', Validators.required)];
    let formArray = [] as FormControl[];
    powers.forEach((power) => {
      formArray.push(this.fb.control(power.power, Validators.required));
    });

    return formArray;
  }

  addPower(): void {
    this.powers.push(this.createPower()[0]);
  }

  removePower(index: number): void {
    this.powers.removeAt(index);
  }

  addSuperhero(hero: Hero) {
    this.superheroesService.addSuperhero(hero).subscribe({
      next: (response) => {
        this.router.navigate(['/home/super-heros']);
        this.snackBar.open('Superhéroe añadido exitosamente!', 'Cerrar', {
          duration: 2000,
        });
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al añadir superhéroe', error);
        this.isLoading = false;
        this.snackBar.open('Error al añadir superhéroe', 'Cerrar', {
          duration: 2000,
        });
      },
    });
  }

  updateSuperhero(hero: Hero) {
    this.superheroesService.updateSuperhero(this.hero ? this.hero.id : 0, hero).subscribe({
      next: (response) => {
        this.router.navigate(['/home/super-heros']);
        this.snackBar.open('Superhéroe modificado exitosamente!', 'Cerrar', {
          duration: 2000,
        });
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al modificar superhéroe', error);
        this.isLoading = false;
        this.snackBar.open('Error al modificar superhéroe', 'Cerrar', {
          duration: 2000,
        });
      },
    });
  }

  onSubmit(): void {
    if(this.addHero.invalid)
      return;
    this.isLoading = true;
    const formControls = Object.keys(this.addHero.controls).filter(key => key !== 'img');

    formControls.forEach(key => {
      const value = this.addHero.get(key)?.value;
      if (typeof value === 'string') {
        this.addHero.get(key)?.setValue(this.capitalizeFirstLetter(value));
      }
    });
    if(!this.hero)
      this.addSuperhero(this.addHero.value)
    else
      this.updateSuperhero(this.addHero.value);
  }

  capitalizeFirstLetter(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}
