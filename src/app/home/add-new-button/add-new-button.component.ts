import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'add-new-button',
  templateUrl: './add-new-button.component.html',
  styleUrls: ['./add-new-button.component.sass']
})
export class AddNewButtonComponent implements OnInit, OnDestroy {
  toggleAddButton: boolean = false;
  routerSubscription!: Subscription;

  constructor(
    private router: Router
  ) {}
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
  }

}
