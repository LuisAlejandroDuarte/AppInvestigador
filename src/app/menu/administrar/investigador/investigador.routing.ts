import { Routes } from '@angular/router';
import { InvestigadorComponent } from './investigador.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

export const InvestigadorRoutes: Routes = [
    {
        path: '',
        children: [{
            path: '',
            component: InvestigadorComponent,    
            canActivate:[AuthGuard]              
        }]
    }
];