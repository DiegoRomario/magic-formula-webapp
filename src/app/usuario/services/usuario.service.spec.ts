import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { UsuarioService } from './usuario.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Usuario } from '../models/usuario.model';
import { ResponseMessage } from 'src/app/utils/response-message.model';
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
        const responseMessage: ResponseMessage = { message: 'Usuário cadastrado com sucesso! Um e-mail foi enviado para confirmação do cadastro.' };
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


});
