import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { SuperHerosService } from 'src/app/super-heros/super-heros.service';
import { Hero } from 'src/app/models/hero';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { Observable, map } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-super-heros',
  templateUrl: './super-heros.component.html',
  styleUrls: ['./super-heros.component.sass']
})
export class SuperherosComponent implements OnInit, OnDestroy {
  superheros !: Observable<Hero[]>;
  filteredSuperheros: Hero[] = [];
  subscriptions: Subscription[] = [];
  isLoading = true;
  bounceTime: number = 500;

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private dialog: MatDialog,
    private superHerosService: SuperHerosService,
    private cdr: ChangeDetectorRef
  ) { }
  ngOnDestroy(): void {
    if(this.subscriptions.length)
      this.subscriptions
        .forEach(
          (subscription: Subscription) => subscription.unsubscribe()
          );
  }

  ngOnInit(): void {
    this.getSharedFilterValue();
  }

  editHero(hero: Hero) {
    const id = hero.id ?? '';
    this.router.navigate([`/home/add-hero/${id}`]);
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
            this.superheros = this.superheros.pipe(
              map( (heros) => heros.filter( filterHero => filterHero.id !== hero.id) )
            );
          }
        });
      }
    });
  }

  getSharedFilterValue() {
    const subscription = this.sharedService.currentFilter.subscribe({
      next: (filterValue: string) => {
        this.applyFilter(filterValue);
      }
    });

    this.subscriptions.push(subscription);
  }

  applyFilter(filterValue: string): void {
    this.superheros = this.superHerosService.getSuperheros(filterValue);
  }

  itemTrackBy(index: number, item: Hero) {
    return item.id;
  }

  actualizarVista() {
    this.cdr.detectChanges();
  }
}
