import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";


@Component({
    selector: 'ex-button',
    template: `<button mat-button (click)="buttonClicked.emit($event)" [disabled]="disabled">{{text}}</button>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExButton {

    @Output() buttonClicked = new EventEmitter();
    @Input() text: String;
    @Input() disabled: boolean;
}