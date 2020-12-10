
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { AcaoParams } from '../models/acao-params.model';
import { Acao } from '../models/acao.model';
import { ColumnsDefinition } from '../models/base/columns-definition.model';
import { DynamicPipeDataType } from '../models/base/dynamic-pipe-data-type.enum';
import { ECriterio } from '../models/criterio.enum.model';
import { AcaoService } from '../services/acao.services';


@Component({
   selector: 'm4-grid-acoes',
   templateUrl: './grid-acoes.component.html',
   styleUrls: ['./grid-acoes.component.css']
})
export class GridAcoesComponent implements OnInit {
   public acoes: Acao[] = [];
   public usuarioLogado = false;
   @Input() criterio: ECriterio = ECriterio.PL_ROE;
   errorMessage: string;
   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort, { static: false }) sort: MatSort;
   dataSource: MatTableDataSource<Acao>;
   public searchForm: FormGroup;
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
      private snackBar: MatSnackBar,
      private localStorage: LocalStorageService
   ) {
      this.usuarioLogado = this.localStorage.obterTokenUsuario() !== null;
   }
   ngOnInit(): void {
      this.formInit();
      this.acaoServices.obterAcoesM4(this.criterio).pipe(finalize(() => {
         setTimeout(() => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.dataSource.filterPredicate = this.getFilterPredicate();
         }, 100);
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

   public executeSelectedChange = (event) => {
      console.log(event);
   }


   formInit() {
      this.searchForm = new FormGroup({
         ticker: new FormControl(''),
         pl: new FormControl(''),
         pvp: new FormControl(''),
         dy: new FormControl(''),
         evebit: new FormControl(''),
         margemEbit: new FormControl(''),
         margemLiquida: new FormControl(''),
         roic: new FormControl(''),
         roe: new FormControl(''),
         crescimentoReceita5Anos: new FormControl('')
      });
   }

   applyFilter() {
      const params = new AcaoParams();
      params.ticker = this.setFormFieldString('ticker');
      params.pl = this.setFormFieldNumber('pl');
      params.pvp = this.setFormFieldNumber('pvp');
      params.dy = this.setFormFieldNumber('dy');
      params.evebit = this.setFormFieldNumber('evebit');
      params.margemLiquida = this.setFormFieldNumber('margemLiquida');
      params.margemEbit = this.setFormFieldNumber('margemEbit');
      params.roic = this.setFormFieldNumber('roic');
      params.roe = this.setFormFieldNumber('roe');
      params.crescimentoReceita5Anos = this.setFormFieldNumber('crescimentoReceita5Anos');

      const filterValue = params.concatenarFiltros();
      this.dataSource.filter = filterValue.toString();

      if (this.dataSource.paginator) {
         this.dataSource.paginator.firstPage();
      }
   }

   setFormFieldString(fieldName: string): string {
      const value = this.searchForm.get(fieldName).value;
      return value === null ? '' : value;
   }
   setFormFieldNumber(fieldName: string): number {
      const value = Number(this.searchForm.get(fieldName).value);
      return value === null ? 0 : value;
   }
   getFilterPredicate() {
      return (row: Acao, filters: string) => {
         const params = new AcaoParams();
         const filterArray = filters.split('$');
         params.definirValorPorArray(filterArray);

         const matchFilter = [];

         matchFilter.push(row.ticker.includes(params.ticker));
         matchFilter.push(this.menorQue(params.pl, row.pl));
         matchFilter.push(this.menorQue(params.pvp, row.pvp));
         matchFilter.push(this.menorQue(params.evebit, row.evebit));
         matchFilter.push(this.maiorQue(params.dy, row.dy));
         matchFilter.push(this.maiorQue(params.roe, row.roe));
         matchFilter.push(this.maiorQue(params.roic, row.roic));
         matchFilter.push(this.maiorQue(params.margemEbit, row.margemEbit));
         matchFilter.push(this.maiorQue(params.margemLiquida, row.margemLiquida));
         matchFilter.push(this.maiorQue(params.crescimentoReceita5Anos, row.crescimentoReceita5Anos));

         return matchFilter.every(Boolean);
      };
   }


   private maiorQue(value: number, rowValue: number) {
      return value === 0 ? true : rowValue > value;
   }

   private menorQue(value: number, rowValue: number) {
      return value === 0 ? true : rowValue < value;
   }
}

