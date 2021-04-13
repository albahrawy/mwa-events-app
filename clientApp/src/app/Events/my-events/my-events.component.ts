import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventService } from 'src/app/service/events.service';
import { PopupService } from 'src/app/service/popup-msg.service';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.scss']
})
export class MyEventsComponent implements OnInit {

  private userEmail: String;
  events$: Observable<any>;

  constructor(private eventService: EventService, private router: Router, private popupService: PopupService) {
  }

  ngOnInit(): void {
    this.events$ = this.eventService.getMyEvents();
  }

  delete(event) {
    if (this.popupService.confirm("Are you sure you want to delete this event")) {
      this.eventService.deleteEvent(event._id).subscribe(d => event.hidden = true);
    }
  }

  edit(eventId) {
    this.router.navigate(['/events','editevent', eventId]);
  }
}
