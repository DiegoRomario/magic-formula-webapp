import { CurrencyPipe, DatePipe } from '@angular/common';
import { DynamicPipe } from './dynamic.pipe';

describe('Dynamic pipe', () => {
    let pipe: DynamicPipe;
    beforeEach(() => {
        pipe = new DynamicPipe(new DatePipe(''), new CurrencyPipe(''));
    });
    it('Dado nova instancia o valor não deve ser nulo ou indefinido', () => {
        expect(pipe).toBeTruthy();
    });

});
