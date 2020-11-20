
import { Component, OnInit } from '@angular/core';
import { ECriterio } from '../models/criterio.enum.model';

@Component({
   selector: 'm4-listagem-acoes',
   templateUrl: './listagem-acoes.component.html'
})
export class ListagemAcoesComponent implements OnInit {

   public criterio: typeof ECriterio = ECriterio;
   ngOnInit(): void {
   }

   public executeSelectedChange = (event) => {

   }
}

