import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BemVindoComponent } from './bem-vindo/bem-vindo.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ConfirmacaoEmailComponent } from './confirmacao-email/confirmacao-email.component';
import { LoginComponent } from './login/login.component';
import { UsuarioGuard } from './services/usuario.guard';
import { UsuarioComponent } from './usuario.component';
const contaRouterConfig: Routes = [
  {
    path: '',
    component: UsuarioComponent,
    children: [
      {
        path: 'cadastro',
        component: CadastroComponent,
        canActivate: [UsuarioGuard],
        canDeactivate: [UsuarioGuard],
      },
      { path: 'login', component: LoginComponent, canActivate: [UsuarioGuard] },
      {
        path: 'confirmacao-email/:email/:token',
        component: ConfirmacaoEmailComponent,
        canActivate: [UsuarioGuard],
      },
      {
        path: 'bem-vindo',
        component: BemVindoComponent,
        canActivate: [UsuarioGuard],
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(contaRouterConfig)],
  exports: [RouterModule],
})
export class UsuarioRoutingModule { }
