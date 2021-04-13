
import { FlatTreeControl } from '@angular/cdk/tree';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { EventService } from 'src/app/service/events.service';
import { UserService } from 'src/app/service/userservice.service';


@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  private userEmail: String;
  commentCtrl: FormControl;
  constructor(private route: ActivatedRoute, private eventService: EventService, userService: UserService) {

    this.commentCtrl = new FormControl();
    this.userEmail = userService.getUserInfo()?.email;
  }

  event$: Observable<any>;
  eventId: string;
  ngOnInit(): void {
    this.event$ = this.route.paramMap.pipe(mergeMap(p => {
      this.eventId = p.get('eventId');
      return this.eventService.getEventById(this.eventId);
    }), map(e => this.joinedEventMap(e)));
  }

  attend(event, btn) {
    this.eventService.attendToEvent(event._id, !event.isJoind).subscribe(e => event.isJoind = e.isJoind);
  }

  addComment(ev: KeyboardEvent) {
    if (ev.code == "Enter") {
      const commentValue = this.commentCtrl.value;
      this.commentCtrl.reset();
      this.eventService.addComment(commentValue, this.eventId)
        .subscribe(d => {
          this.event$ = of(this.joinedEventMap(d));
        }, err => {
          console.log(err);
        });
    }

  }

  private joinedEventMap(e) {
    e.isJoind = !!this.userEmail && !!e?.attendees?.find(a => a.email == this.userEmail);
    console.log(e.comments.length)
    return e;
  }


}
