import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, } from 'rxjs';
import { map, shareReplay, withLatestFrom } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { SharedService } from 'src/app/shared/shared.service';
import { Hero } from 'src/app/models/hero';
import { SuperHerosService } from 'src/app/super-heros/super-heros.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  @ViewChild('drawer') sidenav !: MatSidenav;
  routerSubscription: any;
  superheros$ !: Observable<Hero[]>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private sharedService: SharedService,
    private superherosService: SuperHerosService
  ) {}
  ngOnInit(): void {

  }

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
