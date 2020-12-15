import { by, element } from 'protractor';
import { AppBasePage } from '../app.base.po';

export class AppCadastroPage extends AppBasePage {

  campoNome = element(by.id('nome'));
  campoSobrenome = element(by.id('sobrenome'));
  campoEmail = element(by.id('email'));
  campoSenha = element(by.id('senha'));
  campoConfirmacaoSenha = element(by.id('senhaconfirmacao'));
  botaoCadastrar = element(by.id('botaocadastrar'));


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
