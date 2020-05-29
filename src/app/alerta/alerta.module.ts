import {NgModule} from '@angular/core';
import {AlertaComponent} from './alerta';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

@NgModule({

    imports: [
        CommonModule,
        FormsModule,
        
    ],
    declarations: [
        AlertaComponent      
    ],
    providers: [
    ],
    exports: [
        AlertaComponent      
    ]    
})

export class SharedAlerta {}