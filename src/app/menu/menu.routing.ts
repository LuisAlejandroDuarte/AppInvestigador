import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { AuthGuard } from '../guards/auth.guard';
import { ConvocatoriaComponent } from './convocatoria/convocatoria.component';



export const MenuRoutes: Routes = [
    {
        path: '',
        children: [ {
            path: '',
            component: MenuComponent          
        },{
            path: 'convocatoria',
            component: ConvocatoriaComponent          
        }]
    }
];
