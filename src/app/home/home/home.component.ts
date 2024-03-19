import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, debounceTime, filter } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  @ViewChild('drawer') sidenav !: MatSidenav;
  routerSubscription: any;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private sharedService: SharedService
  ) {}

  closeSidenav() {
    if (this.sidenav && this.sidenav.mode === 'over') {
      this.sidenav.close();
    }
  }

  sendFilter(filter: string) {
    this.sharedService.updateFilter(filter)
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
