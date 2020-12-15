import { AppCadastroPage } from './app.cadastro.po';
import { browser, logging } from 'protractor';

describe('Testes do formulario de cadastro', () => {
    let page: AppCadastroPage;

    beforeEach(() => {
        page = new AppCadastroPage();
    });

    it('Deve navegar até formulário de cadastro', () => {
        page.iniciarNavegacao();
        expect(page.obterTituloCadastro()).toContain('Cadastrar');
    });

    it('Deve cadastrar um usuário corretamente', () => {
        page.campoNome.sendKeys('Diego');
        page.campoSobrenome.sendKeys('Souza');
        page.campoEmail.sendKeys('diego.romario.apps@gmail.com');
        page.campoSenha.sendKeys('987654321');
        page.campoConfirmacaoSenha.sendKeys('987654321');
        page.botaoCadastrar.click();
        page.esperar(3000);
        expect(browser.getCurrentUrl()).toContain('bem-vindo');
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });
});
