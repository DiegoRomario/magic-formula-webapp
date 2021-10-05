import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { UsuarioService } from './usuario.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Usuario } from '../models/usuario.model';
import { ResponseMessage } from 'src/app/utils/response-message.model';
import { UsuarioLogin } from '../models/usuario-login.model';
import { UsuarioLogado } from '../models/usuario.logado';
import { UsuarioConfirmacaoEmail } from '../models/usuario-confirmacao-email.model';
describe('Usuário Service', () => {
    let httpMock: HttpTestingController;
    let service: UsuarioService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UsuarioService]
        });
        service = TestBed.inject(UsuarioService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('Dado nova instancia o valor não deve ser nulo ou indefinido', () => {
        expect(service).toBeTruthy();
    });

    it('Dado um usuário deve registrar corretamente', fakeAsync(() => {
        const usuario: Usuario =
        {
            id: '',
            nome: 'Diego',
            sobrenome: 'Romário',
            email: 'diego@diego.com.br',
            senha: '123456',
        };
        const responseMessage: ResponseMessage = { message: 'Usuário cadastrado com sucesso! Um e-mail será enviado para confirmação do cadastro.' };
        service.registrarUsuario(usuario).subscribe((response) => {
            expect(response).toEqual(responseMessage);
        });
        const request = httpMock.expectOne(req => {
            return req.method === 'POST';
        });
        request.flush(responseMessage
        );
        tick();
    }));

    it('Dado usuário e senha validos deve logar corretamente', fakeAsync(() => {
        const login: UsuarioLogin = {
            email: 'diego.romario@outlook.com',
            senha: '123456789'
        };
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
        service.login(login).subscribe((response) => {
            expect(response).toEqual(usuarioLogado);
        });
        const request = httpMock.expectOne(req => {
            return req.method === 'POST';
        });
        request.flush(usuarioLogado);
        tick();
    }));


    it('Dado e-mail e token validos deve confirmar cadastro de usuário', fakeAsync(() => {
        const usuarioConfirmacaoEmail: UsuarioConfirmacaoEmail =
        {
            email: 'diego@diego.com.br',
            token: '123456',
        };
        const responseMessage: ResponseMessage = { message: 'E-mail confirmado com sucesso.' };
        service.confirmarEmailUsuario(usuarioConfirmacaoEmail).subscribe((response) => {
            expect(response).toEqual(responseMessage);
        });
        const request = httpMock.expectOne(req => {
            return req.method === 'POST';
        });
        request.flush(responseMessage
        );
        tick();
    }));

});
