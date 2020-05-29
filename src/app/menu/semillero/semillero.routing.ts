import { Routes } from '@angular/router';
import { SemilleroComponent } from './semillero.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

export const SemilleroRoutes: Routes = [
    {
        path: '',
        children: [{
            path: '',
            component: SemilleroComponent,
            canActivate:[AuthGuard]          
        }]
    }
];