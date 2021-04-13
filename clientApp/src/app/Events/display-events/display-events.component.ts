import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { EventService } from "src/app/service/events.service";
import { UserService } from "src/app/service/userservice.service";

/**
 * @title Card with multiple sections
 */
@Component({
  selector: "display-event",
  templateUrl: "./display-events.component.html",
  styleUrls: ["./display-events.component.scss"]
})
export class DisplayEventComponent implements OnInit {

  private userEmail: String;
  searchgrp: FormGroup;
  events$: Observable<any>;

  constructor(private builder: FormBuilder, private eventService: EventService,
    private router: Router, userService: UserService) {
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

    this.userEmail = userService.getUserInfo()?.email;
  }

  ngOnInit(): void {
    this.getData();
  }

  doSearch() {
    this.getData(this.searchgrp.value);
  }

  getData(searchValue?: any) {
    this.events$ = this.eventService.getEvents(searchValue).pipe(map(events => {
      return events.map(e => {
        e.isJoind = !!this.userEmail && !!e?.attendees?.find(a => a.email == this.userEmail);
        return e;
      });
    }));
  }

  attend(event, btn) {
    this.eventService.attendToEvent(event._id, !event.isJoind).subscribe(e => event.isJoind = e.isJoind);
  }

  onEventClick(eventId) {
    this.router.navigate(['/events', eventId]);
  }

  filterOnlyJoind(args) {
    console.log(args);
  }
}