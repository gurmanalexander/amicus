import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AmicusConfig } from './shared/amicus.config';
import { AmicusEnv } from './shared/amicus.env';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        HttpModule,
        JsonpModule,
    ],

    exports: [],

    declarations: [],

    providers: [
        AmicusEnv,
        AmicusConfig,
    ]
})
export class AmicusModule {
}
