import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { BaseService } from 'src/app/services/base.service';
import { UsuarioConfirmacaoEmail } from '../models/usuario-confirmacao-email.model';
import { UsuarioLogado } from '../models/usuario.logado';

@Injectable()
export class UsuarioService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  registrarUsuario(usuario: Usuario): Observable<Usuario> {
    const response = this.http
      .post(
        this.UrlServiceV1 + 'usuario/cadastrar',
        usuario,
        this.ObterHeaderJson()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));

    return response;
  }

  login(usuario: Usuario): Observable<UsuarioLogado> {
    const response = this.http
      .post(
        this.UrlServiceV1 + 'usuario/entrar',
        usuario,
        this.ObterHeaderJson()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));

    return response;
  }

  confirmarEmailUsuario(confirmacao: UsuarioConfirmacaoEmail): Observable<any> {
    const response = this.http
      .post(
        this.UrlServiceV1 + 'usuario/confirmar-email',
        confirmacao,
        this.ObterHeaderJson()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));

    return response;
  }
}
