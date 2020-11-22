import { Injectable } from '@angular/core';
import { CanDeactivate, CanActivate, Router } from '@angular/router';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogModel, CustomDialogComponent } from 'src/app/material/custom-dialog/custom-dialog.component';

@Injectable()
export class UsuarioGuard implements CanDeactivate<CadastroComponent>, CanActivate {

    localStorageUtils = new LocalStorageUtils();

    constructor(private router: Router, public dialog: MatDialog) {
    }

    confirmDialog(): Promise<boolean> {
        const message = 'Tem certeza que deseja abandonar o preenchimento do formulario?';
        const dialogData = new ConfirmDialogModel('Atenção!', message);
        const dialogRef = this.dialog.open(CustomDialogComponent, {
            maxWidth: '400px',
            data: dialogData
        });


        return dialogRef.afterClosed().toPromise();

    }

    canDeactivate(component: CadastroComponent) {
        if (component.mudancasNaoSalvas) {
            return this.confirmDialog().then((result: boolean) => {
                return result;
            });
        }
        else {
            return true;
        }
    }

    canActivate() {
        if (this.localStorageUtils.obterTokenUsuario()) {
            this.router.navigate(['/home']);
        }
        return true;
    }
}
