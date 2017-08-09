import { NgModule } from '@angular/core';
import { DynamicDirective } from './shared/dynamic.directive';

@NgModule({
    exports: [
        DynamicDirective
    ],
    imports: [

    ],
    declarations: [
        DynamicDirective
    ],
    providers: []
})
export class DynamicModule {
}
