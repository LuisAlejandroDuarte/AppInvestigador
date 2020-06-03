import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SemilleroRoutes } from './semillero.routing';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { LoginService } from 'src/app/login/service';
import { SemilleroService } from 'src/app/service/semillero/serviceSemillero';
import { EditSemilleroComponent } from './edit-semillero/edit-semillero.component';
import { SharedAlerta } from 'src/app/alerta/alerta.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [EditSemilleroComponent],
    imports: [
      CommonModule,
      SharedAlerta,
      NgbModule,
      FormsModule,
      RouterModule.forChild(SemilleroRoutes),
    ],
    providers:[AuthGuard,LoginService,SemilleroService]
  })
  export class SemilleroModule { }