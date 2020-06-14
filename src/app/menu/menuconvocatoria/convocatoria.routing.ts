import { Routes } from '@angular/router';
import { MenuConvocatoriaComponent } from './menuconvocatoria.component';
import { ConvocatoriaComponent } from './convocatoria/convocatoria.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { EditConvocatoriaComponent } from './convocatoria/editconvocatoria/editconvocatoria.component';

export const ConvocatoriaRoutes: Routes = [
    {
        path: '',
        children: [ {
            path: '',
            component: MenuConvocatoriaComponent          
        },{
            path: 'gestion',
            component: ConvocatoriaComponent,
            canActivate:[AuthGuard]      
            
        },{
            path: 'editconvocatoria/:id',
            component: EditConvocatoriaComponent,
            canActivate:[AuthGuard]      
            
        }]       
    }
];