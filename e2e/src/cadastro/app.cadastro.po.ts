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
  obterMensagemValidacaoSenhasDiferentes() {
    return this.obterElementoXpath('/html/body/m4-root/m4-layout/div/div/mat-sidenav-container/mat-sidenav-content/main/m4-usuario/m4-cadastro-usuario/div/form/div/div[2]/mat-form-field[5]/div/div[3]/div/mat-hint').getText();
  }
}

