import { Injectable } from '@angular/core';
import { AmicusEnv } from '@amicus/core';
import { AuthService } from '@amicus/auth';

@Injectable()
export class LaravelEchoConfig {

    public defaultConnection = this.env.get('broadcastingDriver', 'pusher');

    public connections: object = {
        pusher: {
            broadcaster: 'pusher',
            key: this.env.get('pusherKey'),
            cluster: this.env.get('pusherCluster'),
            encrypted: true,
            authEndpoint: this.env.get('pusherAuthEndpoint'),
            auth: {
                headers: {Authorization: 'Bearer ' + this.auth.getToken()}
            }
        }
    };

    constructor(protected env: AmicusEnv, protected auth: AuthService) {

    }
}
