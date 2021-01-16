import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SideNavigationComponent } from './navigation/side-navigation/side-navigation.component';
import { AppRoutingModule } from './app.routing.module';
import { RouterModule } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { CustomDialogComponent } from './material/custom-dialog/custom-dialog.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';

registerLocaleData(localePt);
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    HeaderComponent,
    SideNavigationComponent,
    DisclaimerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    RouterModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  entryComponents: [CustomDialogComponent, DisclaimerComponent],
})
export class AppModule { }
