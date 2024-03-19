import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.sass']
})
export class FilterComponent implements OnInit {

  @Output() filterEvent: EventEmitter<string> = new EventEmitter<string>();

  searchControl: FormControl;

  constructor(
  ) {
    this.searchControl = new FormControl('');
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .subscribe({
        next: (filter) =>
        this.filterEvent.emit(filter)
      });
  }

}
