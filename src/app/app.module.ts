import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { CentroService } from './service/centro/serviceCentro';
import { ZonaService } from './service/zona/serviceZona';
import { ProgramaService } from './service/programa/servicePrograma';
import { EscuelaService } from './service/escuela/serviceEscuela';
import { TipoDocumentoService } from './service/tipoDocumento/serviceTipoDocumento';
import { TipoCargoService } from './service/tipoCargo/service.tipoCargo';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedAlerta } from './alerta/alerta.module';
import { AppRoutes } from './app-routing';
import { NavMenuService } from './nav-menu/nav-menu.service';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { NavMenuModule } from './nav-menu/nav-menu.module';
import { registerLocaleData } from '@angular/common';
import localeEsCO from '@angular/common/locales/es-CO';
import localeDeExtra from "@angular/common/locales/extra/es-CO";



registerLocaleData(localeEsCO, 'es-CO',localeDeExtra);
@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,    
    SharedAlerta,
    NavMenuModule

  ], 
  declarations: [
    AppComponent,    
    AdminLayoutComponent,
    AuthLayoutComponent        
  ],
  
    providers:[CentroService,
      ZonaService,ProgramaService,EscuelaService,TipoDocumentoService,
    TipoCargoService,NavMenuService,{ provide: LOCALE_ID, useValue: "es-CO"}],
    exports: [RouterModule] ,
  bootstrap: [AppComponent]
})
export class AppModule { }
