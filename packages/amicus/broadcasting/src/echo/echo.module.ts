import { NgModule } from '@angular/core';
import { AmicusModule } from '@amicus/core';
import { AuthModule } from '@amicus/auth';

import { LaravelEchoService } from './shared/laravel-echo.service';
import { LaravelEchoConfig } from './shared/laravel-echo.config';

@NgModule({
    imports: [
        AmicusModule,
        AuthModule,
    ],
    providers: [
        LaravelEchoService,
        LaravelEchoConfig
    ]
})
export class EchoModule {
}
