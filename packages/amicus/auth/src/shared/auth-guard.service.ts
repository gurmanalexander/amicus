import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthConfig } from './auth.config';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(protected auth: AuthService,
                protected config: AuthConfig,
                protected router: Router) {
    }

    public canActivate() {
        // If user is not logged in we'll send them to the login page
        if (!this.auth.check()) {
            this.router.navigate([this.config.loginURL]);
            return false;
        }
        return true;
    }

}
