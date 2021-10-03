import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DisclaimerComponent } from './magic-formula/disclaimer/disclaimer.component';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'm4-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'magic-formula-webapp';
  magicFormulaURL = 'https://magicformula.azurewebsites.net/';
  linkedinURL = '';
  whatsappURL = '';



  constructor(public spinnerService: SpinnerService, public dialog: MatDialog) {
    this.linkedinURL = 'https://www.linkedin.com/shareArticle?mini=true&url=' + this.magicFormulaURL;
    this.whatsappURL = 'https://web.whatsapp.com/send?text=' + this.magicFormulaURL;
  }

  openDialog() {
    this.dialog.open(DisclaimerComponent);
  }
}
