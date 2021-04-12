import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from 'src/app/service/events.service';
import { PopupService } from 'src/app/service/popup-msg.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent {

  fg: FormGroup;
  imageFile: File;
  hasImage: boolean;
  busy = false;
  @ViewChild('imgElement') imgElement: ElementRef<HTMLImageElement>;

  constructor(private builder: FormBuilder, private eventService: EventService, private popupService: PopupService) {
    this.fg = this.builder.group({
      name: ['', [Validators.required]],
      title: [''],
      category: [''],
      description: ['', [Validators.required]],
      date: ['', [Validators.required]],
      address: this.builder.group({
        state: ['', [Validators.required]],
        city: ['', [Validators.required]],
        zip: ['', [Validators.required]]
      })
    });
  }

  onFileChange(event: any): void {
    this.hasImage = false;
    const _fileList: FileList = event?.dataTransfer?.files || event?.target?.files || event?.srcElement?.files;
    const _file = _fileList?.[0];
    if (!!_file) {
      this.imageFile = _file;
      this.hasImage = true;
      const urlCreator = (window as any).URL || (window as any).webkitURL;
      this.imgElement.nativeElement.onload = (e) => urlCreator.revokeObjectURL(this.imgElement.nativeElement.src);
      this.imgElement.nativeElement.src = urlCreator?.createObjectURL(_file);
    }
  }

  createEvent() {
    this.busy = true;
    const data: { [key: string]: any } = this.fg.value;
    let body: any = data;
    if (!!this.imageFile) {
      const formData = new FormData();

      for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'object' && value.constructor === Object) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      }
      formData.append('image', this.imageFile);
      body = formData;
    }

    this.eventService.addEvent(body).subscribe(
      d => {
        this.popupService.show("Event added successfully");
      },
      err => console.log(err),
      () => { this.busy = false });
  }
}
