import { AppBasePage } from '../app.base.po';

export class AppCadastroPage extends AppBasePage {

  constructor() { super(); }

  navegarParaCadastro() {
    this.navegarViaUrl('usuario/cadastro');
  }

  navegarParaCadastroPorLink() {
    this.navegarPorLink('usuario/cadastro');
  }

  iniciarNavegacao() {
    this.navegarParaHome();
    this.navegarParaCadastro();
  }

  obterTituloCadastro() {
    return this.obterElementoXpath('//*[@id="cadastrar"]').getText();
  }
}
