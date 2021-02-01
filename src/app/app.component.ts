import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'm4-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'magic-formula-webapp';
  currentURL = '';
  linkedinURL = '';
  whatsappURL = '';



  constructor(public spinnerService: SpinnerService, public dialog: MatDialog) {
    this.currentURL = window.location.href;
    this.linkedinURL = 'https://www.linkedin.com/sharing/share-offsite/?url=' + this.currentURL
    this.whatsappURL = 'https://web.whatsapp.com/send?text=' + this.currentURL;
  }

  openDialog() {
    this.dialog.open(DisclaimerComponent);
  }
}
