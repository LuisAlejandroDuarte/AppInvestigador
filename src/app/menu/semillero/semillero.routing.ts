import { Routes } from '@angular/router';
import { SemilleroComponent } from './semillero.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { EditSemilleroComponent } from './edit-semillero/edit-semillero.component';

export const SemilleroRoutes: Routes = [
    {
        path: '',
        children: [{
            path: '',
            component: SemilleroComponent,
            canActivate:[AuthGuard]          
        },{
            path: 'edit-semillero/:id',
            component: EditSemilleroComponent,
            canActivate:[AuthGuard]         
        }]
    }
];