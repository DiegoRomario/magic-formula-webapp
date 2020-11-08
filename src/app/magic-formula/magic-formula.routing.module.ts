import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from '../usuario/services/usuario.guard';
import { ListagemAcoesComponent } from './listagem-acoes/listagem-acoes.component';
import { MagicFormulaComponent } from './magic-formula.component';
const acoesRouterConfig: Routes = [
  {
    path: '',
    component: MagicFormulaComponent,
    children: [
      {
        path: 'acoes',
        component: ListagemAcoesComponent,
        canActivate: [UsuarioGuard],
        canDeactivate: [UsuarioGuard]
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(acoesRouterConfig)],
  exports: [RouterModule],
})
export class MagicFormulaRoutingModule { }
