import { AppCadastroPage } from './app.cadastro.po';
import { browser, logging } from 'protractor';

describe('Cadastro Usuário', () => {
  let page: AppCadastroPage;

  beforeEach(() => {
    page = new AppCadastroPage();
  });

  it('Deve apresentar botão para se cadastrar', () => {
    page.navigateTo();
    expect(page.obterLabelBotaoCadastro()).toContain('Cadastrar');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
