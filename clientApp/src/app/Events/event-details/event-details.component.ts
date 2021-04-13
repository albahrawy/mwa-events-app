
import { FlatTreeControl } from '@angular/cdk/tree';
<<<<<<< HEAD
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> d527ef286b39b3ab1e94b22ff1b747989e8a423a
import { FormControl } from '@angular/forms';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
<<<<<<< HEAD
import { map, mergeMap } from 'rxjs/operators';
=======
import { mergeMap } from 'rxjs/operators';
>>>>>>> d527ef286b39b3ab1e94b22ff1b747989e8a423a
import { EventService } from 'src/app/service/events.service';
import { UserService } from 'src/app/service/userservice.service';



@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
<<<<<<< HEAD
export class EventDetailsComponent implements OnInit {
  private userEmail: String;
  commentCtrl: FormControl;
  constructor(private route: ActivatedRoute, private eventService: EventService, userService: UserService) {

    this.commentCtrl = new FormControl();
    this.userEmail = userService.getUserInfo()?.email;
  }

=======
export class EventDetailsComponent implements OnInit{

 

 

  commentCtrl: FormControl;
  constructor(private route: ActivatedRoute, private eventService: EventService) {
    this.commentCtrl = new FormControl();
  }

>>>>>>> d527ef286b39b3ab1e94b22ff1b747989e8a423a
  event$: Observable<any>;
  eventId: string;
  ngOnInit(): void {
    this.event$ = this.route.paramMap.pipe(mergeMap(p => {
      this.eventId = p.get('eventId');
      return this.eventService.getEventById(this.eventId);
<<<<<<< HEAD
    }), map(e => this.joinedEventMap(e)));
  }

  attend(event, btn) {
    this.eventService.attendToEvent(event._id, !event.isJoind).subscribe(e => event.isJoind = e.isJoind);
  }

=======
    }));
  }

  attend(eventId, btn) {
    this.eventService.attendToEvent(eventId).subscribe(e => {
      btn.text = 'Joined';
      btn.disabled = true;
    });
  }
>>>>>>> d527ef286b39b3ab1e94b22ff1b747989e8a423a
  addComment(ev: KeyboardEvent) {
    if (ev.code == "Enter") {
      const commentValue = this.commentCtrl.value;
      this.commentCtrl.reset();
      this.eventService.addComment(commentValue, this.eventId)
        .subscribe(d => {
<<<<<<< HEAD
          this.event$ = of(this.joinedEventMap(d));
=======
          this.event$ = of(d);
>>>>>>> d527ef286b39b3ab1e94b22ff1b747989e8a423a
        }, err => {
          console.log(err);
        });
    }

  }

<<<<<<< HEAD
  private joinedEventMap(e) {
    e.isJoind = !!this.userEmail && !!e?.attendees?.find(a => a.email == this.userEmail);
    console.log(e.comments.length)
    return e;
  }
=======
  
>>>>>>> d527ef286b39b3ab1e94b22ff1b747989e8a423a


}
