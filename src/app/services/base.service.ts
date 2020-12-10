import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';

export abstract class BaseService {
  protected UrlServiceV1: string = environment.apiUrlv1;
  public LocalStorage = new LocalStorageService();

  protected ObterHeaderJson() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  protected ObterAuthHeaderJson() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.LocalStorage.obterTokenUsuario()}`,
      }),
    };
  }

  protected extractData(response: any) {
    return response || {};
  }

  protected serviceError(response: Response | any) {
    const customError: string[] = [];
    const customResponse = { error: { errors: [] } };

    if (response instanceof HttpErrorResponse) {
      if (response.statusText === 'Unknown Error') {
        customError.push('Ocorreu um erro desconhecido');
        response.error.errors = customError;
      }
    }
    if (response.status === 500) {
      customError.push(
        'Ocorreu um erro no processamento, tente novamente mais tarde ou contate o nosso suporte.'
      );
      customResponse.error.errors = customError;
      return throwError(customResponse);
    }

    console.error(response);
    return throwError(response);
  }
}
