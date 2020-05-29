import { GrupoComponent } from './grupo.component';
import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { EditGrupoComponent } from './edit-grupo/edit-grupo.component';

export const GrupoRoutes: Routes = [
    {
        path: '',
        children: [{
            path: '',
            component: GrupoComponent,  
            canActivate:[AuthGuard]        
        },{
            path: 'edit-grupo/:id',
            component: EditGrupoComponent,
            canActivate:[AuthGuard]         
        }]
    }    
];