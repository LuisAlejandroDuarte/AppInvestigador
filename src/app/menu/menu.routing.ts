import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { AuthGuard } from '../guards/auth.guard';
import { MenuConvocatoriaComponent } from './menuconvocatoria/menuconvocatoria.component';
import { ConvocatoriaComponent } from './menuconvocatoria/convocatoria/convocatoria.component';



export const MenuRoutes: Routes = [
    {
        path: '',
        children: [ {
            path: '',
            component: MenuComponent          
        }]
    }
];
