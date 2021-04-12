
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { EventService } from 'src/app/service/events.service';


@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit{

 

 

  commentCtrl: FormControl;
  constructor(private route: ActivatedRoute, private eventService: EventService) {
    this.commentCtrl = new FormControl();
  }

  event$: Observable<any>;
  eventId: string;
  ngOnInit(): void {
    this.event$ = this.route.paramMap.pipe(mergeMap(p => {
      this.eventId = p.get('eventId');
      return this.eventService.getEventById(this.eventId);
    }));
  }

  attend(eventId, btn) {
    this.eventService.attendToEvent(eventId).subscribe(e => {
      btn.text = 'Joined';
      btn.disabled = true;
    });
  }
  addComment(ev: KeyboardEvent) {
    if (ev.code == "Enter") {
      const commentValue = this.commentCtrl.value;
      this.commentCtrl.reset();
      this.eventService.addComment(commentValue, this.eventId)
        .subscribe(d => {
          this.event$ = of(d);
        }, err => {
          console.log(err);
        });
    }

  }

  


}
