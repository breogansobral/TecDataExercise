import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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
    private sharedService: SharedService,
    private router: Router,
    private actRouter: ActivatedRoute,
    private dialog: MatDialog,
    private superHerosService: SuperHerosService,
    private snackBar: MatSnackBar,
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
    this.actRouter.data
      .subscribe(({superHerosApi}) => {
        this.superheros = superHerosApi
      })
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
            this.filteredSuperheros = this.filteredSuperheros.filter(element => element.id != hero.id);
            this.superheros = this.superheros.filter(element => element.id != hero.id);
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
    this.filteredSuperheros = this.superheros.filter((hero) =>
      hero.name.toLowerCase().includes(filterValue.toLowerCase())
    );
    console.log(this.superheros, this.filteredSuperheros);
  }

  itemTrackBy(index: number, item: Hero) {
    return item.id;
  }

  actualizarVista() {
    this.cdr.detectChanges();
  }
}
