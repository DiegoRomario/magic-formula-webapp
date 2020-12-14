import { browser, by, element } from 'protractor';

export class AppHomePage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.id('welcome')).getText() as Promise<string>;
  }
}
