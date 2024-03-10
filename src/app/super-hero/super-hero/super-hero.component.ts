import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SuperHerosService } from 'src/app/_services/super-heros.service';
import { Hero } from 'src/app/models/hero';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-super-hero',
  templateUrl: './super-hero.component.html',
  styleUrls: ['./super-hero.component.sass']
})
export class SuperHeroComponent {
  @Input()
  hero!: Hero;

  constructor(
    private dialog: MatDialog,
    private superHerosService: SuperHerosService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  editHero(hero: Hero) {
    console.log(hero);
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
            console.log('Superhéroe borrado con éxito');
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
}
