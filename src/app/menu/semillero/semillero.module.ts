import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SemilleroRoutes } from './semillero.routing';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { LoginService } from 'src/app/login/service';

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      RouterModule.forChild(SemilleroRoutes),
    ],
    providers:[AuthGuard,LoginService]
  })
  export class SemilleroModule { }