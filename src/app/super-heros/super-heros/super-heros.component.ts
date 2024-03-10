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
  isLoading = true;

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
    let subscription = this.superherosService.getSuperheros().subscribe({
      next: (data) => {
         // Aplica el filtro inicial después de cargar los superhéroes
        setTimeout(() => {
          this.superheros = data;
          this.applyFilter('');
          this.isLoading = false;
        }, 1000)
         // Asumiendo que tienes una variable isLoading para controlar el spinner
      },
      error: (error) => {
        console.error(error);
        setTimeout(() => {
          this.isLoading = false;
        }, 1000) // Asegúrate de manejar el estado de carga también en caso de error
      }
    });

    // Guarda la suscripción
    this.subscriptions.push(subscription);

    // Función para aplicar el filtro
    subscription = this.sharedService.currentFilter.subscribe({
      next: (filterValue: string) => {
        setTimeout(() => {
          this.applyFilter(filterValue);
          this.isLoading = false;
        }, 1000)

        // No necesitas ajustar isLoading aquí a menos que estés cargando algo específico
      },
      error: (error) => {
        console.error(error);
        setTimeout(() => {
          this.isLoading = false;
        }, 1000) // Asegúrate de manejar el estado de carga también en caso de error
      }
    });

    // Guarda la suscripción
    this.subscriptions.push(subscription);
  }

  // Función auxiliar para aplicar el filtro a los superhéroes
  applyFilter(filterValue: string): void {
    this.filteredSuperheros = this.superheros.filter((hero) =>
      hero.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  }
}
