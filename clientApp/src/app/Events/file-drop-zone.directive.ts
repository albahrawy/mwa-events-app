import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
    selector: '[fileDropZone]'
})
export class FileDropZoneDirective {

    @Output() fileDrop = new EventEmitter<DragEvent>();

    @HostBinding('class.drop-zone-active') active = false;

    @HostListener('drop', ['$event'])
    onDrop(event: DragEvent): void {
        event.preventDefault();
        this.active = false;
        this.fileDrop.emit(event);
    }

    @HostListener('dragover', ['$event'])
    onDragOver(event: DragEvent): void {
        event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
        this.active = true;
    }

    @HostListener('dragleave', ['$event'])
    onDragLeave(event: DragEvent): void {
        this.active = false;
    }

    @HostListener('body:dragover', ['$event'])
    onBodyDragOver(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
    }
    @HostListener('body:drop', ['$event'])
    onBodyDrop(event: DragEvent): void {
        event.preventDefault();
    }
}
