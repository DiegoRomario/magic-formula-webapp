import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Usuario } from 'src/app/usuario/models/usuario.model';

@Component({
  selector: 'm4-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.css']
})
export class SideNavigationComponent {
  @Output() sidenavClose = new EventEmitter();
  token = '';
  usuario: Usuario;
  localStorageUtils = new LocalStorageService();
  constructor(private router: Router) { }
  usuarioLogado(): boolean {
    this.token = this.localStorageUtils.obterTokenUsuario();
    this.usuario = this.localStorageUtils.obterUsuario();
    return this.token !== null;
  }

  logout() {
    this.localStorageUtils.limparDadosLocaisUsuario();
    this.router.navigate(['home']);
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
}
