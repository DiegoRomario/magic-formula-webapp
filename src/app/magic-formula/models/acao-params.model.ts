export class AcaoParams {
    ticker: string;
    pl: number;
    pvp: number;
    dy: number;
    evebit: number;
    margemEbit: number;
    margemLiquida: number;
    roic: number;
    roe: number;
    crescimentoReceita5Anos: number;

    concatenarFiltros(): string {
        return `${this.ticker}$${this.pl}$${this.pvp}$${this.dy}$${this.evebit}$${this.margemEbit}$${this.margemLiquida}$${this.roic}$${this.roe}$${this.crescimentoReceita5Anos}$`;
    }

    definirValorPorArray(values: string[]) {
        this.ticker = values[0];
        this.pl = Number(values[1]);
        this.pvp = Number(values[2]);
        this.dy = Number(values[3]);
        this.evebit = Number(values[4]);
        this.margemEbit = Number(values[5]);
        this.margemLiquida = Number(values[6]);
        this.roic = Number(values[7]);
        this.roe = Number(values[8]);
        this.crescimentoReceita5Anos = Number(values[9]);
    }
}

