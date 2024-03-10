import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { SuperHerosService } from 'src/app/_services/super-heros.service';
import { Hero } from 'src/app/models/hero';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.css']
})
export class AddHeroComponent implements OnInit {
  addHero!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private superheroesService: SuperHerosService
  ) {}

  ngOnInit() {
    this.addHero = this.fb.group({
      name: ['', Validators.required],
      element: ['', Validators.required],
      color: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      place: ['', Validators.required],
      img: ['', Validators.required],
      powers: this.fb.array([this.createPower()])
    });
  }

  get powers(): FormArray {
    return this.addHero.get('powers') as FormArray;
  }

  createPower(): FormControl {
    return this.fb.control('', Validators.required);
  }

  addPower(event: Event): void {
    event.stopImmediatePropagation();
    event.stopPropagation();
    this.powers.push(this.createPower());
  }

  removePower(event: Event, index: number): void {
    event.stopImmediatePropagation();
    event.stopPropagation();
    this.powers.removeAt(index);
  }

  addSuperhero(hero: Hero) {
    this.superheroesService.addSuperhero(hero).subscribe({
      next: (response) => console.log('Superhéroe añadido', response),
      error: (error: HttpErrorResponse) => console.error('Error al añadir superhéroe', error),
    });
  }

  onSubmit(): void {
    console.log(this.addHero.value);
    this.addSuperhero(this.addHero.value)
  }
}
