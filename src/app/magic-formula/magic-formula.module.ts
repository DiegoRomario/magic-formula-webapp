import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomHttpInterceptor } from '../utils/http-interceptor';
import { MagicFormulaRoutingModule } from './magic-formula.routing.module';
import { ListagemAcoesComponent } from './listagem-acoes/listagem-acoes.component';
import { UsuarioGuard } from '../usuario/services/usuario.guard';
import { MagicFormulaComponent } from './magic-formula.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AcaoService } from './services/acao.services';
import { AcaoResolver } from './services/acao.resolver';
import { DynamicPipe } from '../utils/dynamic.pipe';
@NgModule({
  declarations: [MagicFormulaComponent, ListagemAcoesComponent,
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
    UsuarioGuard,
    AcaoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    },
    AcaoResolver,
  ],
})
export class MagicFormulaModule { }
