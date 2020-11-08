import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UsuarioRoutingModule } from './usuario.routing.module';
import { UsuarioComponent } from './usuario.component';
import { UsuarioGuard } from './services/usuario.guard';
import { UsuarioService } from './services/usuario.service';
import { CustomHttpInterceptor } from '../utils/http-interceptor';
import { ConfirmacaoEmailComponent } from './confirmacao-email/confirmacao-email.component';
import { BemVindoComponent } from './bem-vindo/bem-vindo.component';
@NgModule({
  declarations: [
    UsuarioComponent,
    CadastroComponent,
    LoginComponent,
    ConfirmacaoEmailComponent,
    BemVindoComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    UsuarioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    UsuarioGuard,
    UsuarioService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    },
  ],
})
export class UsuarioModule {}
