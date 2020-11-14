import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from 'src/app/utils/spinner.service';
import { Acao } from '../models/acao.model';
import { ColumnsDefinition } from '../models/base/columns-definition.model';
import { DynamicPipeDataType } from '../models/base/dynamic-pipe-data-type.enum';
import { AcaoService } from '../services/acao.services';


@Component({
   selector: 'm4-listagem-acoes',
   templateUrl: './listagem-acoes.component.html',
   styleUrls: ['./listagem-acoes.component.css']
})
export class ListagemAcoesComponent implements OnInit {
   public acoes: Acao[];
   errorMessage: string;
   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort, { static: false }) sort: MatSort;
   dataSource: MatTableDataSource<Acao>;
   public definicaoColunas: ColumnsDefinition[] = [
      new ColumnsDefinition({ key: 'pontuacao', label: 'Ranking' }),
      new ColumnsDefinition({ key: 'ticker', label: 'Ticker', textAlign: 'left', arrowPosition: 'after' }),
      new ColumnsDefinition({ key: 'cotacao', label: 'Cotação', pipe: DynamicPipeDataType.currency }),
      new ColumnsDefinition({ key: 'pl', label: 'P/L' }),
      new ColumnsDefinition({ key: 'pvp', label: 'P/VPA' }),
      new ColumnsDefinition({ key: 'psr', label: 'PSR' }),
      new ColumnsDefinition({ key: 'dy', label: 'DY', pipe: DynamicPipeDataType.percent }),
      new ColumnsDefinition({ key: 'pAtivo', label: 'P/Ativo' }),
      new ColumnsDefinition({ key: 'pCapGiro', label: 'P/ Cap. Giro' }),
      new ColumnsDefinition({ key: 'pebit', label: 'P/EBIT' }),
      new ColumnsDefinition({ key: 'pAtivoCirculanteLiquido', label: 'P/Ativo Circ. Liq.', }),
      new ColumnsDefinition({ key: 'evebit', label: 'EV/EBIT' }),
      new ColumnsDefinition({ key: 'evebitda', label: 'EV/EBITDA' }),
      new ColumnsDefinition({ key: 'margemEbit', label: 'Marg. EBIT', pipe: DynamicPipeDataType.percent }),
      new ColumnsDefinition({ key: 'margemLiquida', label: 'Marg. Liq.', pipe: DynamicPipeDataType.percent }),
      new ColumnsDefinition({ key: 'liquidezCorrente', label: 'Liq. Corrente', }),
      new ColumnsDefinition({ key: 'roic', label: 'ROIC', pipe: DynamicPipeDataType.percent }),
      new ColumnsDefinition({ key: 'roe', label: 'ROE', pipe: DynamicPipeDataType.percent }),
      new ColumnsDefinition({ key: 'liquidez2Meses', label: 'Liq. 2 Meses', pipe: DynamicPipeDataType.currency }),
      new ColumnsDefinition({ key: 'divBrutaPatrimonio', label: 'Div. Bruta/Pat.', }),
      new ColumnsDefinition({ key: 'crescimentoReceita5Anos', label: 'Cresc. Rec. 5a', pipe: DynamicPipeDataType.percent }),
      new ColumnsDefinition({ key: 'patrimonioLiquido', label: 'Pat. Líquido', pipe: DynamicPipeDataType.currency }),
   ];
   displayedColumns: string[] = this.definicaoColunas.map(x => x.key);
   constructor(
      private acaoServices: AcaoService,
      public spinnerService: SpinnerService,
      private snackBar: MatSnackBar
   ) { }
   ngOnInit(): void {

      this.acaoServices.obterTodos().pipe(finalize(() => {
         setTimeout(() => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
         }, 500);
      })).subscribe(
         (acoes) => {
            this.acoes = acoes;
            this.dataSource = new MatTableDataSource(this.acoes);
         },
         (error) => {
            this.snackBar.open('Ocorreu um erro ao tentar obter os dados: ' + error.statusText, null, {
               duration: 10000,
               horizontalPosition: 'center',
               verticalPosition: 'bottom',
            });
         }
      ).add(() => {
         this.dataSource.sort = this.sort;
      });
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

