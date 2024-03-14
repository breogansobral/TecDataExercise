import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { SharedService } from 'src/app/_services/shared.service';
import { SuperHerosService } from 'src/app/_services/super-heros.service';
import { Hero } from 'src/app/models/hero';
import { ConfirmDialogComponent } from './confirm-dialog.component';

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
    private sharedService: SharedService,
    private router: Router,
    private dialog: MatDialog,
    private superHerosService: SuperHerosService,
    private snackBar: MatSnackBar
  ) { }
  ngOnDestroy(): void {
    if(this.subscriptions.length)
      this.subscriptions
        .forEach(
          (subscription: Subscription) => subscription.unsubscribe()
          );
  }

  ngOnInit(): void {
    this.getSuperheros();
  }

  editHero(hero: Hero) {
    this.router.navigate([`/home/add-hero/${hero.id}`]);
  }

  deleteHero(hero: Hero) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { name: hero.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.superHerosService.deleteSuperhero(hero.id).subscribe({
          next: () => {
            this.snackBar.open('Superhéroe borrado exitosamente!', 'Cerrar', {
              duration: 2000,
            });
            setTimeout(() => {
              window.location.reload();
            }, 2000);

          },
          error: (error) => {
            console.log(error);
            this.snackBar.open('Error al borrar superhéroe', 'Cerrar', {
              duration: 2000,
            });
          }
        });
      }
    });
  }

  getSuperheros() {
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

    this.subscriptions.push(subscription);

    subscription = this.sharedService.currentFilter.subscribe({
      next: (filterValue: string) => {
        this.isLoading = true;
        setTimeout(() => {
          this.applyFilter(filterValue);
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

    this.subscriptions.push(subscription);
  }

  applyFilter(filterValue: string): void {
    this.filteredSuperheros = this.superheros.filter((hero) =>
      hero.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  }

  itemTrackBy(index: number, item: Hero) {
    return item.id;
  }
}
