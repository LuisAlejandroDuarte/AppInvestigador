import { Routes } from '@angular/router';
import { ConvocatoriaComponent } from './convocatoria.component';

export const ConvocatoriaRoutes: Routes = [
    {
        path: '',
        children: [{
            path: '',
            component: ConvocatoriaComponent        
        }]
    }
];