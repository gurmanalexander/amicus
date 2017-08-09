import { Injectable } from '@angular/core';

@Injectable()
export class AmicusEnv {
    public broadcastingDriver = 'pusher';
    public pusherKey = '';
    public pusherCluster = '';
    public pusherAuthEndpoint = '';

    public get(key: string, defaultValue: string = null) {
        return this[key] === undefined ? defaultValue : this[key];
    }
}
