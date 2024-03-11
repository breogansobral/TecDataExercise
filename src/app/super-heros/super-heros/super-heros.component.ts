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
export class SuperherosComponent implements OnInit, OnDestroy {
  superheros: Hero[] = [];
  filteredSuperheros: Hero[] = [];
  subscriptions: Subscription[] = [];
  isLoading = true;
  bounceTime: number = 500;

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
        this.isLoading = true;
        setTimeout(() => {
          this.superheros = data;
          this.applyFilter('');
          this.isLoading = false;
        }, this.bounceTime)
      },
      error: (error) => {
        console.error(error);
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, this.bounceTime)
      }
    });

    // Guarda la suscripción
    this.subscriptions.push(subscription);

    // Función para aplicar el filtro
    subscription = this.sharedService.currentFilter.subscribe({
      next: (filterValue: string) => {
        this.isLoading = true;
        setTimeout(() => {
          this.applyFilter(filterValue);
          this.isLoading = false;
        }, this.bounceTime)

        // No necesitas ajustar isLoading aquí a menos que estés cargando algo específico
      },
      error: (error) => {
        console.error(error);
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, this.bounceTime) // Asegúrate de manejar el estado de carga también en caso de error
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
