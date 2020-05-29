import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavMenuComponent } from './nav-menu.component';

@NgModule({

    imports: [ RouterModule, CommonModule ],
    declarations: [ NavMenuComponent ],
    exports: [ NavMenuComponent ]
})

export class NavMenuModule {}