import { AfterViewInit, Component, ContentChild, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { EventService } from "src/app/service/events.service";

/**
 * @title Card with multiple sections
 */
@Component({
  selector: "display-event",
  templateUrl: "./display-events.component.html",
  styleUrls: ["./display-events.component.scss"]
})
export class DisplayEventComponent implements OnInit {

  searchgrp: FormGroup;
  events$: Observable<any>;
  

  constructor(private builder: FormBuilder, private eventService: EventService) {
    this.searchgrp = this.builder.group({
      keyword: [''],
      category: [''],
      address: this.builder.group({
        state: [''],
        city: [''],
        zip: ['']
      })
    });


  }

  ngOnInit(): void {
    this.events$ = this.eventService.getEvents();
  }

  doSearch() {
    const searchValue = this.searchgrp.value;
    this.events$ = this.eventService.getEvents(searchValue);
  }

  attend(eventId, btn) {
    this.eventService.attendToEvent(eventId).subscribe(e => {
      btn.text = 'Joined';
      btn.disabled = true;
    });
  }
}