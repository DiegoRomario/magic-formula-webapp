import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from 'src/app/utils/base.service';
import { Acao } from '../models/acao.model';
import { ECriterio } from '../models/criterio.enum.model';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
@Injectable({ providedIn: 'root' })
export class AcaoService extends BaseService {
  constructor(private http: HttpClient, private localStorage: LocalStorageUtils) {
    super();
  }

  obterAcoesM4(criterio: ECriterio): Observable<Acao[]> {

    const acaoFake: Acao = {
      cotacao: 100, crescimentoReceita5Anos: 10.10,
      evebit: 100, margemEbit: 10.10, margemLiquida: 10.10,
      pvp: 10.10, roic: 10.10, roe: 10.10, pl: 10.10, psr: 10.10,
      dy: 10.10, pAtivo: 10.10, pCapGiro: 10.10, pAtivoCirculanteLiquido: 10.10,
      patrimonioLiquido: 10000000, pebit: 10.10, ticker: 'XXXX3', evebitda: 10.10,
      liquidez2Meses: 10000000, liquidezCorrente: 10.00,
      divBrutaPatrimonio: 10.10, id: '1', pontuacao: 1000
    };

    let URL = this.UrlServiceV1;
    const usuarioLogado = this.localStorage.obterTokenUsuario();
    if (usuarioLogado) {
      URL = URL + 'acoes/obter-todas-m4';
    }
    else {
      URL = URL + 'acoes/obter-5-m4';
    }



    return this.http
      .get<Acao[]>(
        URL + '?criterio=' + criterio,
        super.ObterAuthHeaderJson()
      )
      .pipe(map((data) => usuarioLogado ? data : data.concat(new Array(95).fill(acaoFake))), catchError(super.serviceError));
  }
}
