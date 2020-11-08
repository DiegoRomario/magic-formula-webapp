import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Acao } from '../models/acao.model';
import { AcaoService } from './acao.services';

@Injectable({ providedIn: 'root' })
export class AcaoResolver implements Resolve<Observable<Acao[]>> {
  constructor(private service: AcaoService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Acao[]> {
    return this.service.obterTodos();
  }
}
