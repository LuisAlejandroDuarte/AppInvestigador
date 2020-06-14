import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';



export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full',
  }, {
    path: 'menu',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
        import('./menu/menu.module').then(m => m.MenuModule)       
      }]
  },{
    path: 'administrar/:id',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
        import('./menu/administrar/administrar.module').then(m=>m.AdministrarModule)
      }]
  },{
    path: 'investigador/:id',
    component: AdminLayoutComponent,    
    children: [
      {
        path: '',
        loadChildren: () =>
        import('./menu/administrar/investigador/investigador.module').then(m=>m.InvestigadorModule)
      }]
  },{
    path: 'convocatoria',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
        import('./menu/menuconvocatoria/convocatoria.module').then(m=>m.ConvocatoriaModule)
      }]
  },{
    path: 'semillero/:id',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
        import('./menu/semillero/semillero.module').then(m=>m.SemilleroModule)
      }]
  },{
    path: 'grupo/:id',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
        import('./menu/grupo/grupo.module').then(m=>m.GrupoModule)
      }]
  },{
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }, {
  path: '', 
  component: AuthLayoutComponent,
  children: [
    {
      path: '',
      loadChildren:()=>
      import('./login/login.module').then(m => m.LoginModule)           
    }]
   } ];

