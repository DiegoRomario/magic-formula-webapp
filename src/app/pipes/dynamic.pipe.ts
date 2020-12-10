import { CurrencyPipe, DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'dynamic' })
export class DynamicPipe implements PipeTransform {
    constructor(private datePipe: DatePipe,
                private currencyPipe: CurrencyPipe) {
    }
    transform(value: string, modifier: string) {
        if (!modifier || (modifier === 'default')) { return value; }
        return eval('this.' + modifier + '(\'' + value + '\')');
    }

    currency(value: string): string {
        return this.currencyPipe.transform(value, 'BRL');
    }

    percent(value: string): string {
        return value + '%';
    }

    shortDate(value: string): string {
        return this.datePipe.transform(value, 'dd/MM/yyyy');
    }
}
