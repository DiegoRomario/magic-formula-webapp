import {
  AfterViewInit, Component, ElementRef, OnInit, ViewChildren
} from '@angular/core';
import {
  FormBuilder, FormControlName, FormGroup, Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBaseComponent } from 'src/app/utils/form-base.component';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UsuarioService } from '../services/usuario.service';
import { UsuarioLogin } from '../models/usuario-login.model';
import { UsuarioLogado } from '../models/usuario.logado';

@Component({
  selector: 'm4-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent
  extends FormBaseComponent
  implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];

  errors: any[] = [];
  loginForm: FormGroup;
  usuario: UsuarioLogin;
  hide = true;
  showSpinner: boolean;
  returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private snackBar: MatSnackBar,
    public spinnerService: SpinnerService
  ) {
    super();

    this.validationMessages = {
      email: {
        required: 'O e-mail é um campo obrigatório',
        email: 'E-mail em formato inválido',
      },
      senha: {
        required: 'Informe a senha',
        minlength: 'A senha deve conter no mínimo 8 caracteres',
        maxlength: 'A senha deve conter no máximo 50 caracteres',
      },
    };

    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'];

    super.configurarMensagensValidacaoBase(this.validationMessages);
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
        ],
      ],
    });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormularioBase(
      this.formInputElements,
      this.loginForm
    );
  }

  login() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.usuario = Object.assign({}, this.usuario, this.loginForm.value);

      this.usuarioService.login(this.usuario).subscribe(
        (sucesso) => {
          this.processarSucesso(sucesso);
        },
        (falha) => {
          this.processarFalha(falha);
        }
      );
    }
  }

  processarSucesso(response: UsuarioLogado) {
    this.errors = [];
    this.usuarioService.LocalStorage.salvarDadosLocaisUsuario(response);
    this.snackBar.open('Login efetuado com sucesso!', null, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
    this.router.navigate(['/magic-formula/acoes']);
  }

  processarFalha(fail: any) {
    this.errors = [];
    let mensagem = 'Ocorreu um erro ao efetuar o login.';
    if (fail.error?.errors?.messages?.length === 1) {
      mensagem = fail.error?.errors?.messages[0];
    } else {
      mensagem =
        mensagem +
        ' Mais detalhes no console. (Pressione F12 e envie os detalhes a equipe de suporte)';
    }
    this.errors = fail.error.errors.messages;
    this.snackBar.open(mensagem, null, {
      duration: 10000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
