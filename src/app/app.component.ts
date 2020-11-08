import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SpinnerService } from './utils/spinner.service';

@Component({
  selector: 'm4-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'magic-formula-webapp';

  constructor(public spinnerService: SpinnerService) {

  }
}
