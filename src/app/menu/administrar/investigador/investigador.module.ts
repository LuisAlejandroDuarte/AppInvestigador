import { InvestigadorRoutes } from './investigador.routing';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { LoginService } from 'src/app/login/service';
import { CustomDateParserFormatter } from './investigador.component';
import { DeferLoadModule } from '@trademe/ng-defer-load';
import { InvestigadorService } from 'src/app/service/investigador/serviceInvestigador';
import { ServiceNivelFormacion } from 'src/app/service/nivelFormacion/serviceNivelFormacion';
import { FormsModule } from '@angular/forms';
import { ServiceNivelFormacionInvestigador } from 'src/app/service/nivelFormacionInvestigador/serviceNivelFormacionInvestigador';




@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      RouterModule.forChild(InvestigadorRoutes),
      DeferLoadModule,
      FormsModule
    ],
    providers:[AuthGuard,LoginService,CustomDateParserFormatter,InvestigadorService,ServiceNivelFormacion,
      ServiceNivelFormacionInvestigador
     ]
  })
  export class InvestigadorModule { }


