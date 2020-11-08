import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from 'src/app/utils/base.service';
import { Acao } from '../models/acao.model';

@Injectable()
export class AcaoService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  obterTodos(): Observable<Acao[]> {
    return this.http
      .get<Acao[]>(
        this.UrlServiceV1 + 'acoes/obter-todas-m4',
        super.ObterAuthHeaderJson()
      )
      .pipe(catchError(super.serviceError));
  }
}
