import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomHttpInterceptor } from '../utils/http-interceptor';
import { MagicFormulaRoutingModule } from './magic-formula.routing.module';
import { ListagemAcoesComponent } from './listagem-acoes/listagem-acoes.component';
import { MagicFormulaComponent } from './magic-formula.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AcaoService } from './services/acao.services';
import { DynamicPipe } from '../utils/dynamic.pipe';
import { GridAcoesComponent } from './grid-acoes/grid-acoes.component';
import { LocalStorageUtils } from '../utils/localstorage';
@NgModule({
  declarations: [MagicFormulaComponent, ListagemAcoesComponent, GridAcoesComponent,
    DynamicPipe],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    MagicFormulaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
  ],
  exports: [DynamicPipe],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    DatePipe,
    CurrencyPipe,
    DynamicPipe,
    AcaoService,
    LocalStorageUtils,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    }
  ],
})
export class MagicFormulaModule { }
