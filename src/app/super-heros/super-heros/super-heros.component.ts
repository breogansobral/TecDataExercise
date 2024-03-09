import { Component, OnInit } from '@angular/core';
import { SuperHerosService } from 'src/app/_services/super-heros.service';
import { Hero } from 'src/app/models/hero';

@Component({
  selector: 'app-super-heros',
  templateUrl: './super-heros.component.html',
  styleUrls: ['./super-heros.component.sass']
})
export class SuperheroesComponent implements OnInit {
  superheros: Hero[] = [];

  constructor(private superherosService: SuperHerosService) { }

  ngOnInit(): void {
    this.superherosService.getSuperheros().subscribe(data => {
      this.superheros = data;
    });
  }
}
