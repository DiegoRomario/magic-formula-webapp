import { browser, by, element, ExpectedConditions } from 'protractor';

export abstract class AppBasePage {

    constructor() {
        browser.driver.manage().window().maximize();
    }

    navegarParaHome() {
        return browser.get(browser.baseUrl) as Promise<any>;
    }

    navegarViaUrl(url: string) {
        return browser.get(url) as Promise<any>;
    }

    navegarPorLink(link: string) {
        return element(by.linkText(link)).click();
    }

    obterElementoXpath(xpath: string) {
        return element(by.xpath(xpath));
    }
    obterElementoId(id: string) {
        return element(by.id(id));
    }
    esperar = (milisegundos: number) => {
        browser.sleep(milisegundos);
    }
}
