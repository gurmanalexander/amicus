import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import { Subject } from 'rxjs/Subject';
import { AuthService } from '@amicus/auth';
import { LaravelEchoConfig } from './laravel-echo.config';

@Injectable()
export class LaravelEchoService {
    public echo = new Subject<any>();

    protected connectionHandler = null;

    constructor(protected auth: AuthService, protected config: LaravelEchoConfig) {
        this.auth.onAuthChanged.subscribe((isAuth) => {
            if (isAuth && this.getConnection()) {
                try {
                    this.echo.next(
                        new Echo(this.getConnection())
                    );
                } catch (exception) {
                    this.echo.next(null);
                    console.warn('Laravel-echo: connection failed! Check credentials');
                }
            } else {
                this.echo.next(null);
            }
        });
    }

    protected getConnection() {
        if (!this.connectionHandler && this.config.connections[this.config.defaultConnection]) {
            this.connectionHandler = this.config.connections[this.config.defaultConnection];
        }
        return this.connectionHandler;
    }
}
