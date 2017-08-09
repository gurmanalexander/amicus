/**
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AuthService } from '@amicus/auth';
import { Test1Component } from './test/test1.component';
import { Test2Component } from './test/test2.component';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
      <div>
          ok
          <div *ngIf="auth.check()">login</div>
          <ng-template dynamic *ngFor="let test of tests" [component]="test">
              
          </ng-template>
      </div>
  `
})
export class AppComponent implements OnInit {
  public angularclassLogo = 'assets/img/angularclass-avatar.png';
  public name = 'Angular 2 Webpack Starter';
  public url = 'https://twitter.com/AngularClass';

  public tests = [];

  constructor(protected auth: AuthService) {
      console.log('ok');
      console.log(this.auth);
  }

  public ngOnInit() {
      this.tests.push(Test1Component);
      this.tests.push(Test2Component);
      setTimeout(() => {
          console.log('here');
          this.tests.push(Test2Component);
          setTimeout(() => {
              console.log('here');
              this.tests.push(Test1Component);
          }, 2000);
      }, 2000);
  }

}
