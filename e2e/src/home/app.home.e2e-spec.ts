import { AppHomePage } from './app.home.po';
import { browser, logging } from 'protractor';

describe('Home Page', () => {
  let page: AppHomePage;

  beforeEach(() => {
    page = new AppHomePage();
  });

  it('deve apresentar mensagem de boas vindas', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Welcome!');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
