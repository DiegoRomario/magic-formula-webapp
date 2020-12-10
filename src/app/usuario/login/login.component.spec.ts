
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UsuarioLogado } from '../models/usuario.logado';
import { Router } from '@angular/router';
describe('Login Component', () => {
    let component: LoginComponent;
    let usuarioService: UsuarioService;
    let snackService: MatSnackBar;
    let router: Router;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, ReactiveFormsModule,
                RouterTestingModule.withRoutes([]), MatSnackBarModule],
            providers: [LoginComponent, FormBuilder, UsuarioService]
        });
        component = TestBed.inject(LoginComponent);
        usuarioService = TestBed.inject(UsuarioService);
        snackService = TestBed.inject(MatSnackBar);
        router = TestBed.inject(Router);
    });

    it('Dado nova instancia o valor não deve ser nulo ou indefinido', () => {
        expect(component).toBeTruthy();
    });

    it('Dado retorno valido de login deve salvar dados de usuário e navegar para rota de ações', () => {
        const usuarioLogado: UsuarioLogado = {
            id: 'cf0d740b-b7a5-4a76-ad3a-3a2600277c6c',
            nome: 'Diego',
            email: 'diego.romario@outlook.com',
            accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
            expiresIn: '7200.0',
            claims: [
                {
                    value: '1aa7f0d8-e6ec-4c4d-bd37-2e151df220f2',
                    type: 'jti'
                }
            ]
        };

        const spyLocalStorage = spyOn(usuarioService.LocalStorage, 'salvarDadosLocaisUsuario').and.returnValue(null);
        const spySnack = spyOn(snackService, 'open').and.returnValue(null);
        const spyRouter = spyOn(router, 'navigate');

        component.processarSucesso(usuarioLogado);
        expect(spyLocalStorage).toHaveBeenCalled();
        expect(spySnack).toHaveBeenCalled();
        expect(spyRouter).toHaveBeenCalledWith(['/magic-formula/acoes']);

    });


});
