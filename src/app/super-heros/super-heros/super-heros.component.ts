import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { SharedService } from 'src/app/_services/shared.service';
import { SuperHerosService } from 'src/app/_services/super-heros.service';
import { Hero } from 'src/app/models/hero';

@Component({
  selector: 'app-super-heros',
  templateUrl: './super-heros.component.html',
  styleUrls: ['./super-heros.component.sass']
})
export class SuperheroesComponent implements OnInit, OnDestroy {
  superheros: Hero[] = [];
  filteredSuperheros: Hero[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private superherosService: SuperHerosService,
    private sharedService: SharedService
  ) { }
  ngOnDestroy(): void {
    if(this.subscriptions.length)
      this.subscriptions
        .forEach(
          (subscription: Subscription) => subscription.unsubscribe()
          );
  }

  ngOnInit(): void {
    // Suscripción para obtener superhéroes y luego aplicar el filtro inicial
    let subscription = this.superherosService.getSuperheros().subscribe(data => {
      this.superheros = data;

      // Aplica el filtro inicial después de cargar los superhéroes
      this.applyFilter('');
    });

    // Guarda la suscripción
    this.subscriptions.push(subscription);

    // Función para aplicar el filtro
    subscription = this.sharedService.currentFilter.subscribe((filterValue: string) => {
      this.applyFilter(filterValue);
    });

    // Guarda la suscripción
    this.subscriptions.push(subscription);
  }

  // Función auxiliar para aplicar el filtro a los superhéroes
  applyFilter(filterValue: string): void {
    this.filteredSuperheros = this.superheros.filter((hero) =>
      hero.name.toLowerCase().includes(filterValue.toLowerCase()) ||
      hero.element.toLowerCase().includes(filterValue.toLowerCase()) ||
      hero.place.toLowerCase().includes(filterValue.toLowerCase()) ||
      hero.color.toLowerCase().includes(filterValue.toLowerCase()) ||
      hero.powers.some((power) => power.power.toLowerCase().includes(filterValue.toLowerCase()))
    );
  }
}
