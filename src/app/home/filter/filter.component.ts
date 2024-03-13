import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.sass']
})
export class FilterComponent implements OnInit {

  searchControl: FormControl;

  constructor(
    private sharedService: SharedService
  ) {
    this.searchControl = new FormControl('');
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .subscribe({
        next: (value) =>
        this.sharedService.updateFilter(value)
      });
  }

}
