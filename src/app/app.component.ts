import { ChangeDetectorRef, Component, NgZone, inject } from '@angular/core';
import { LoadService } from './loading/load.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'TecDataExercise';

  constructor(
    public loadService: LoadService,
  ) {
  }
}
