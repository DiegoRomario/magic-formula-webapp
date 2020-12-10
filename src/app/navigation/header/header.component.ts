import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/usuario/models/usuario.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'm4-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();

  token = '';
  usuario: Usuario;
  localStorageUtils = new LocalStorageService();

  ngOnInit(): void {}
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };
  constructor(private router: Router) {}

  usuarioLogado(): boolean {
    this.token = this.localStorageUtils.obterTokenUsuario();
    this.usuario = this.localStorageUtils.obterUsuario();

    return this.token !== null;
  }

  logout() {
    this.localStorageUtils.limparDadosLocaisUsuario();
    this.router.navigate(['/magic-formula/acoes']);
  }
}
