import {
  Component,
} from '@angular/core';
import { AuthService } from '@amicus/auth';

@Component({
  selector: 'test1',
  template: `
      <div>
          test1 {{ auth.getData().user.id }}
      </div>
  `
})
export class Test1Component {
    constructor(protected auth: AuthService) {

    }
}
