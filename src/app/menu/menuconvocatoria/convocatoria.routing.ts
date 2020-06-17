import { Routes } from '@angular/router';
import { MenuConvocatoriaComponent } from './menuconvocatoria.component';
import { ConvocatoriaComponent } from './convocatoria/convocatoria.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { EditConvocatoriaComponent } from './convocatoria/editconvocatoria/editconvocatoria.component';
import { PropuestaComponent } from './propuesta/propuesta.component';
import { EditPropuestaComponent } from './propuesta/editpropuesta/editpropuesta.component';
import { EvaluarComponent } from './evaluar/evaluar.component';
import { EditevaluarComponent } from './evaluar/editevaluar/editevaluar.component';

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
            
        },{
            path: 'propuesta',
            component: PropuestaComponent,
            canActivate:[AuthGuard]      
            
        },{
            path: 'editpropuesta/:id',
            component: EditPropuestaComponent,
            canActivate:[AuthGuard]      
            
        },{
            path: 'evaluar',
            component: EvaluarComponent,
            canActivate:[AuthGuard]      
            
        },{
            path: 'editevaluar/:id',
            component: EditevaluarComponent,
            canActivate:[AuthGuard]      
            
        }]       
    }
];