import { CurrencyPipe, DatePipe, registerLocaleData } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { DynamicPipe } from './dynamic.pipe';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

describe('Dynamic pipe', () => {
    let pipe: DynamicPipe;
    beforeEach(() => {
        TestBed.configureCompiler({
        });
        pipe = new DynamicPipe(new DatePipe('pt-BR'), new CurrencyPipe('pt-BR'));
    });
    it('Dado nova instancia o valor não deve ser nulo ou indefinido', () => {
        expect(pipe).toBeTruthy();
    });

    it('Dado valor numérico deve formatar para moeda', () => {
        const valorFormatado = pipe.transform('1000', 'currency');
        expect(valorFormatado).toContain('1.000,00');
    });

    it('Dado data e hora deve formatar para data simples', () => {
        const valorFormatado = pipe.transform(new Date('2020-01-01T12:00:00Z').toISOString(), 'shortDate');
        expect(valorFormatado).toBe('01/01/2020');
    });

    it('Dado valor numérico deve formatar para percentual', () => {
        const valorFormatado = pipe.transform('100', 'percent');
        expect(valorFormatado).toBe('100%');
    });

});
