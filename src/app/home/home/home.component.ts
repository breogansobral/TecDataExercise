import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, debounceTime, filter } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') sidenav: MatSidenav | undefined;
  toggleAddButton: boolean = false;
  routerSubscription: any;
  searchControl: FormControl;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private sharedService: SharedService
  ) {
    this.searchControl = new FormControl('');
  }
  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
  ngOnInit(): void {
    if(this.router.url.includes('add-hero'))
        this.toggleAddButton = true;

    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.toggleAddButton = false;
      if(this.router.url.includes('add-hero'))
        this.toggleAddButton = true;
    });

    // Actualiza el valor del filtro basado en el input del usuario
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300) // Añade un debounce para limitar las actualizaciones rápidas
      )
      .subscribe((value) => {
        // Cada vez que el valor cambie, actualiza el filtro compartido
        this.sharedService.updateFilter(value);
      });
  }

  closeSidenav() {
    if (this.sidenav && this.sidenav.mode === 'over') {
      this.sidenav.close();
    }
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
