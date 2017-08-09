import {
    ComponentFactoryResolver, Directive, Input, OnInit,
    ViewContainerRef
} from '@angular/core';

@Directive({
    selector: 'ng-template[dynamic]',
})
export class DynamicDirective implements OnInit {
    @Input() protected component;
    constructor(
        protected viewContainerRef: ViewContainerRef,
        protected componentFactoryResolver: ComponentFactoryResolver
    ) {

    }

    public ngOnInit(): void {
        let componentFactory =
            this.componentFactoryResolver.resolveComponentFactory(this.component);

        this.viewContainerRef.clear();

        this.viewContainerRef.createComponent(componentFactory);
    }
}
