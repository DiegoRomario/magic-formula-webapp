import { UsuarioLogado } from '../usuario/models/usuario.logado';

export class LocalStorageService {
  public obterUsuario() {
    return JSON.parse(localStorage.getItem('m4.usuario'));
  }

  public salvarDadosLocaisUsuario(response: UsuarioLogado) {
    this.salvarTokenUsuario(response.accessToken);
    this.salvarUsuario(response);
  }

  public limparDadosLocaisUsuario() {
    localStorage.removeItem('m4.token');
    localStorage.removeItem('m4.usuario');
  }

  public obterTokenUsuario(): string {
    return localStorage.getItem('m4.token');
  }

  public salvarTokenUsuario(token: string) {
    localStorage.setItem('m4.token', token);
  }

  public salvarUsuario(usuario: UsuarioLogado) {
    localStorage.setItem('m4.usuario', JSON.stringify(usuario));
  }
}
