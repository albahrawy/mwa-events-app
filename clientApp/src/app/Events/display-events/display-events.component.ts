import { AfterViewInit, Component, ContentChild, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
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


  constructor(private builder: FormBuilder, private eventService: EventService, private router: Router) {
    this.searchgrp = this.builder.group({
      keyword: [''],
      category: [''],
      joined: [''],
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

  onEventClick(eventId) {
    this.router.navigate(['/events', eventId]);
  }

  filterOnlyJoind(args) {
    console.log(args);
  }
}