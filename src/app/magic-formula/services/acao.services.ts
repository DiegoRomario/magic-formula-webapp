import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from 'src/app/services/base.service';
import { Acao } from '../models/acao.model';
import { ECriterio } from '../models/criterio.enum.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
@Injectable({ providedIn: 'root' })
export class AcaoService extends BaseService {
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {
    super();
  }

  obterAcoesMagicFormula(criterio: ECriterio): Observable<Acao[]> {
    const acaoFake: Acao = {
      cotacao: 100,
      crescimentoReceita5Anos: 10.1,
      evebit: 100,
      margemEbit: 10.1,
      margemLiquida: 10.1,
      pvp: 10.1,
      roic: 10.1,
      roe: 10.1,
      pl: 10.1,
      psr: 10.1,
      dy: 10.1,
      pAtivo: 10.1,
      pCapGiro: 10.1,
      pAtivoCirculanteLiquido: 10.1,
      patrimonioLiquido: 10000000,
      pebit: 10.1,
      ticker: 'XXXX3',
      evebitda: 10.1,
      liquidez2Meses: 10000000,
      liquidezCorrente: 10.0,
      divBrutaPatrimonio: 10.1,
      id: '1',
      pontuacao: 1000,
    };

    let URL = this.UrlServiceV1;
    const usuarioLogado = this.localStorage.obterTokenUsuario();
    if (usuarioLogado) URL = URL + 'acoes/obter-todas-magic-formula';
    else URL = URL + 'acoes/obter-5-magic-formula';

    return this.http
      .get<Acao[]>(URL + '?criterio=' + criterio, super.ObterAuthHeaderJson())
      .pipe(
        map((data) =>
          usuarioLogado ? data : data.concat(new Array(95).fill(acaoFake))
        ),
        catchError(super.serviceError)
      );
  }
}
