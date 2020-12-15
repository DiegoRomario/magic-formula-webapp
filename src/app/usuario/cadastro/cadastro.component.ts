import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormBaseComponent } from 'src/app/utils/form-base.component';
import { MustMatch } from 'src/app/utils/must-mach.validator';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/usuario.service';
import { ResponseMessage } from 'src/app/utils/response-message.model';

@Component({
  selector: 'm4-cadastro-usuario',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent
  extends FormBaseComponent
  implements OnInit, AfterViewInit {
  showSpinner: boolean;
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];

  errors: string[] = [];
  cadastroForm: FormGroup;
  usuario: Usuario;
  hide = true;
  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private snackBar: MatSnackBar,
    public spinnerService: SpinnerService
  ) {
    super();

    this.validationMessages = {
      nome: {
        required: 'O nome do usuário é obrigatório',
        minlength: 'O nome deve conter no mínimo 2 caracteres',
        maxlength: 'O nome deve conter no máximo 120 caracteres',
      },
      sobrenome: {
        required: 'O sobrenome também deve ser informado',
        minlength: 'O sobrenome deve conter no mínimo 2 caracteres',
        maxlength: 'O sobrenome deve conter no máximo 120 caracteres',
      },
      email: {
        required: 'O e-mail é um campo obrigatório',
        email: 'E-mail em formato inválido',
      },
      senha: {
        required: 'Informe a senha',
        minlength: 'A senha deve conter no mínimo 8 caracteres',
        maxlength: 'A senha deve conter no máximo 50 caracteres',
      },
      senhaConfirmacao: {
        required: 'A confirmação de senha deve ser informada',
        mustmatch: 'As senhas não conferem',
        minlength: 'A senha deve conter no mínimo 8 caracteres',
        maxlength: 'A senha deve conter no máximo 50 caracteres',
      },
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);
  }

  ngOnInit(): void {
    this.cadastroForm = this.fb.group(
      {
        nome: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(120),
          ],
        ],
        sobrenome: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(120),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        senha: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(50),
          ],
        ],
        senhaConfirmacao: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(50),
          ],
        ],
      },
      {
        validator: MustMatch('senha', 'senhaConfirmacao'),
      }
    );
  }

  get f() {
    return this.cadastroForm.controls;
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormularioBase(
      this.formInputElements,
      this.cadastroForm
    );
  }

  adicionarConta() {
    this.errors = [];
    if (this.cadastroForm.dirty && this.cadastroForm.valid) {
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);

      this.usuarioService.registrarUsuario(this.usuario).subscribe(
        (sucesso) => {
          this.processarSucesso(sucesso);
        },
        (falha) => {
          this.processarFalha(falha);
        }
      );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(sucesso: ResponseMessage) {
    this.snackBar.open(sucesso.message, null, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });

    this.router.navigate(['/usuario/bem-vindo']);
  }

  processarFalha(fail: any) {
    this.errors = [];
    this.errors = fail.error.errors.messages;
    this.snackBar.open('Ocorreu um erro ao cadastrar o usuário', null, {
      duration: 10000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
