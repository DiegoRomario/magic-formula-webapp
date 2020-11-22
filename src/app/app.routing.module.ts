import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  {
    path: 'magic-formula',
    loadChildren: () =>
      import('./magic-formula/magic-formula.module').then(
        (m) => m.MagicFormulaModule
      ),
  },
  {
    path: 'usuario',
    loadChildren: () =>
      import('./usuario/usuario.module').then((m) => m.UsuarioModule),
  },
  // { path: 'acesso-negado', component: AcessoNegadoComponent },
  // { path: 'nao-encontrado', component: NotFoundComponent },
  // { path: '**', component: NotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
