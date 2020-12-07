import { CurrencyPipe, DatePipe, registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
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

    it('Dado valor número deve formatar para moeda', () => {
        const valorFormatado = pipe.transform('1000', 'currency');
        console.log(valorFormatado);
        expect(valorFormatado).toContain('1.000,00');
    });

    

});
