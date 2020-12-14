import { browser, by, element } from 'protractor';

export class AppCadastroPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl + 'usuario/cadastro') as Promise<unknown>;
  }

  obterLabelBotaoCadastro(): Promise<string> {
    return element(by.xpath('//*[@id="cadastrar"]')).getText() as Promise<string>;
  }
}
