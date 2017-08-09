import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import {
    RouterModule,
    PreloadAllModules, Router
} from '@angular/router';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';

import '../styles/styles.scss';
import { AuthModule, AuthConfig } from '@amicus/auth';
import { AmicusModule } from '@amicus/core';
import { EchoModule } from '@amicus/broadcasting';
import { DynamicModule } from '@amicus/support';
import { Test1Component } from './test/test1.component';
import { Test2Component } from './test/test2.component';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
      Test1Component,
      Test2Component,
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules }),
    AmicusModule,
    AuthModule,
    EchoModule,
    DynamicModule,

  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS
  ],

  entryComponents: [
      Test1Component,
      Test2Component
  ]
})
export class AppModule {

    constructor(protected authConfig: AuthConfig) {
    }

}
