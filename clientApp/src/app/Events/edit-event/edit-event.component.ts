import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { EventService } from 'src/app/service/events.service';
import { PopupService } from 'src/app/service/popup-msg.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {

  private eventId: string;

  imgUrl: string;

  fg: FormGroup;
  imageFile: File;
  hasImage: boolean;
  busy = false;

  @ViewChild('imgElement') imgElement: ElementRef<HTMLImageElement>;

  constructor(private builder: FormBuilder, private eventService: EventService,
    private popupService: PopupService, private router: Router, private route: ActivatedRoute) {
    this.fg = this.builder.group({
      name: ['', [Validators.required]],
      title: [''],
      category: [''],
      description: ['', [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      address: this.builder.group({
        state: ['', [Validators.required]],
        city: ['', [Validators.required]],
        zip: ['', [Validators.required]]
      })
    });
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(mergeMap(p => this.eventService.getEventById(p.get('eventId'))))
      .subscribe(
        d => {
          this.fg.patchValue(d);
          this.imgUrl = d.image;
          this.hasImage = !!this.imgUrl;
          this.eventId = d._id;
        },
        err => {
          console.log(err);
          this.navigateToMyEvents();
        }
      );
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
      this.fg.markAsDirty();
    }
  }

  updateEvent() {
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

    this.eventService.updateEvent(this.eventId, body).subscribe(
      d => {
        this.popupService.show("Event Updated successfully");
        this.navigateToMyEvents();
      },
      err => {
        this.popupService.show("Event did not update, check console for details");
        console.log(err);
        this.busy = false;
      });
  }

  cancelUpdate() {
    if (!this.fg.dirty || this.popupService.confirm("Are you sure you want to discard updates")) {
      this.navigateToMyEvents();
    }
  }

  private navigateToMyEvents() {
    this.router.navigate(['/events', 'myevents']);
  }

}
