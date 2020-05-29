import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { InvestigadorComponent } from 'src/app/menu/administrar/investigador/investigador.component';
import { AdministrarComponent } from './administrar.component';

export const AdministrarRoutes: Routes = [
    {
        path: '',
        children: [{
            path: '',
            component: AdministrarComponent,      
            canActivate:[AuthGuard]                  
        },{
            path: 'Usuarios',
            component: UsuariosComponent,
            canActivate:[AuthGuard]         
        },{
            path: 'investigador/:id',
            component: InvestigadorComponent,
            canActivate:[AuthGuard]         
        }]
    }
];