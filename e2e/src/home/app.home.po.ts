import { AppBasePage } from '../app.base.po';

export class AppHomePage extends AppBasePage {

  constructor() { super(); }

  getTitleText() {
    return this.obterElementoXpath('//*[@id="welcome"]').getText();
  }
}
