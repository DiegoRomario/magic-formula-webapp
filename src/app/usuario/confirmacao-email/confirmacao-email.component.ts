import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UsuarioConfirmacaoEmail } from '../models/usuario-confirmacao-email.model';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'm4-confirmacao-email',
  templateUrl: './confirmacao-email.component.html',
  styleUrls: ['./confirmacao-email.component.css'],
})
export class ConfirmacaoEmailComponent implements OnInit {
  confirmacao: UsuarioConfirmacaoEmail = new UsuarioConfirmacaoEmail();
  token: string;
  showSpinner: boolean;
  errors: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router,
    private snackBar: MatSnackBar,
    public spinnerService: SpinnerService
  ) {
    this.confirmacao.email = this.route.snapshot.params.email;
    this.confirmacao.token = this.route.snapshot.params.token;
    this.confirmarEmailUsuario();
  }

  ngOnInit(): void {}

  confirmarEmailUsuario() {
    this.errors = [];
    if (this.confirmacao.email !== null && this.confirmacao.token !== null) {
      this.usuarioService.confirmarEmailUsuario(this.confirmacao).subscribe(
        (sucesso) => {
          this.processarSucesso(sucesso);
        },
        (falha) => {
          this.processarFalha(falha);
        }
      );
    }
  }

  processarSucesso(sucesso: any) {
    this.snackBar.open(sucesso.message, null, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
    setTimeout(() => {
      this.router.navigate(['/usuario/login']);
    }, 5000);
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors.messages;
    this.snackBar.open('Ocorreu um erro ao cadastrar o usuário', null, {
      duration: 10000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
