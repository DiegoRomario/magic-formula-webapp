import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, PipeTransform, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SpinnerService } from 'src/app/utils/spinner.service';
import { Acao } from '../models/acao.model';
import { AcaoService } from '../services/acao.services';

export class Definicao {
   constructor(valor: string, label: string, size: number, pipe: PipeTransform = null) {
      this.label = label;
      this.valor = valor;
      this.size = size;
      this.pipe = pipe;

   }
   label: string;
   valor: string;
   size: number;
   pipe: PipeTransform;
}

const definicaoColunas: Definicao[] = [
   new Definicao('ticker', 'Ticker', 50),
   new Definicao('cotacao', 'Cotação', 50),
   new Definicao('pl', 'P/L', 100, new CurrencyPipe('pt-BR')),
   new Definicao('pvp', 'P/VPA', 100),
   new Definicao('psr', 'PSR', 100),
   new Definicao('dy', 'DY', 100),
   new Definicao('pAtivo', 'P/Ativo', 100),
   new Definicao('pCapGiro', 'P/ Cap. Giro', 100),
   new Definicao('pebit', 'P/EBIT', 100),
   new Definicao('pAtivoCirculanteLiquido', 'P/Ativo Circ. Liq.', 100),
   new Definicao('evebit', 'EV/EBIT', 100),
   new Definicao('evebitda', 'EV/EBITDA', 100),
   new Definicao('margemEbit', 'Marg. EBIT', 100),
   new Definicao('margemLiquida', 'Marg. Liq.', 100),
   new Definicao('liquidezCorrente', 'Liq. Corrente', 100),
   new Definicao('roic', 'ROIC', 100),
   new Definicao('roe', 'ROE', 100),
   new Definicao('liquidez2Meses', 'Liq. 2 Meses', 120),
   new Definicao('patrimonioLiquido', 'Pat. Líquido', 120),
   new Definicao('divBrutaPatrimonio', 'Div. Bruta/Pat.', 120),
   new Definicao('crescimentoReceita5Anos', 'Cresc. Rec. 5a', 120),
   new Definicao('pontuacao', 'Ranking', 50),
];
@Component({
   selector: 'm4-listagem-acoes',
   templateUrl: './listagem-acoes.component.html',
   styleUrls: ['./listagem-acoes.component.css']
})
export class ListagemAcoesComponent implements OnInit {
   displayedColumns: string[] =
      ['ticker', 'pontuacao', 'cotacao', 'pl', 'pvp', 'roic', 'roe', 'psr', 'dy',
         'evebit', 'evebitda', 'margemEbit', 'margemLiquida',
         'liquidez2Meses', 'patrimonioLiquido', 'crescimentoReceita5Anos',
      ];




   public acoes: Acao[];
   errorMessage: string;
   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;
   dataSource: MatTableDataSource<Acao>;

   constructor(
      private acaoServices: AcaoService,
      public spinnerService: SpinnerService,
      private snackBar: MatSnackBar
   ) { }
   ngOnInit(): void {
      this.acaoServices.obterTodos().subscribe(
         (acoes) => {
            this.acoes = acoes;
            this.dataSource = new MatTableDataSource(this.acoes);
            this.dataSource.paginator = this.paginator;
            setTimeout(() => this.dataSource.sort = this.sort);
         },
         (error) => {
            this.snackBar.open('Ocorreu um erro ao tentar obter os dados: ' + error.statusText, null, {
               duration: 10000,
               horizontalPosition: 'center',
               verticalPosition: 'bottom',
            });
         }
      );
   }

   public obterHeader(column: string): string {
      return definicaoColunas.filter(f => f.valor === column)[0].label ?? '';
   }
   public obterPipe(column: string): PipeTransform {
      return definicaoColunas.filter(f => f.valor === column)[0].pipe ?? null;
   }
   public obterTamanho(column: string): number {
      return definicaoColunas.filter(f => f.valor === column)[0].size ?? 100;
   }
   formatLabel(value: number) {
      return value;
   }

   public executeSelectedChange = (event) => {
      console.log(event);
   }

   applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
         this.dataSource.paginator.firstPage();
      }
   }
}

