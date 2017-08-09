import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AuthService } from './shared/auth.service';
import { AuthGuard } from './shared/auth-guard.service';
import { AmicusModule } from '@amicus/core';
import { AuthConfig as AmicusAuthConfig } from './shared/auth.config';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig({
        tokenName: 'token',
        tokenGetter: (() => localStorage.getItem('token')),
        noClientCheck: true
    }), http, options);
}

@NgModule({
    exports: [],
    imports: [
        AmicusModule,
    ],
    providers: [
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [Http, RequestOptions]
        },
        AuthService,
        AuthGuard,
        AmicusAuthConfig,
    ]
})
export class AuthModule {
}
