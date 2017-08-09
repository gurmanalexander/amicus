import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { tokenNotExpired, JwtHelper, AuthConfigConsts } from 'angular2-jwt';
import { AuthConfig } from './auth.config';

@Injectable()
export class AuthService {

    /*
    * You can subscribe to Authorization status changes
    * */
    public onAuthChanged = new Subject<boolean>();

    protected isLoggedIn: boolean = null;

    protected jwtHelper: JwtHelper = new JwtHelper();

    /*
    * JWTToken payload data
    * */
    protected data: any = null;

    constructor(protected config: AuthConfig, protected router: Router) {
        this.onAuthChanged.subscribe((isAuth: boolean) => {
            this.isLoggedIn = isAuth;
            if (!this.isLoggedIn) {
                this.data = null;
                this.router.navigate([this.config.loginURL]);
            }
        });
    }

    public login(token: string = null) {
        if (token) {
            this.setToken(token);
        }
        this.tryChange(true);
    }

    public logout() {
        this.tryChange(false);
        localStorage.removeItem(AuthConfigConsts.DEFAULT_TOKEN_NAME);
    }

    public check() {
        if (this.isLoggedIn === null) {
            this.tryChange(true);
        }
        return this.isLoggedIn === true;
    }

    /*
    * This method returns JWTToken payload data, if JWTToken is correct
    * */
    public getData() {
        if (!this.data && this.checkToken()) {
            this.data = this.jwtHelper.decodeToken(this.getToken());
        }
        return this.data;
    }

    public setToken(token: string) {
        localStorage.setItem(AuthConfigConsts.DEFAULT_TOKEN_NAME, token);
    }

    public getToken() {
        return localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME);
    }

    /*
    * Trying to change Authorization status
    * */
    protected tryChange(isAuth: boolean) {
        if (isAuth && !this.checkToken()) {
            if (this.isLoggedIn) {
                this.onAuthChanged.next(false);
            }
        } else if (isAuth !== this.isLoggedIn) {
            this.onAuthChanged.next(isAuth);
            return true;
        }
        return false;
    }

    /*
    * Check JWTToken is correct.
    * If Exception trying to logout
    * */
    protected checkToken() {
        try {
            return tokenNotExpired();
        } catch (e) {
            this.tryChange(false);
            console.warn('Incorrect Token Exception');
        }
        return false;
    }

}
