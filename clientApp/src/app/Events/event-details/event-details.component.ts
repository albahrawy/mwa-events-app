
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { EventService } from 'src/app/service/events.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private eventService: EventService) { }

  event$: Observable<any>;

  ngOnInit(): void {
    this.event$ = this.route.paramMap.pipe(mergeMap(p => this.eventService.getEventById(p.get('eventId'))));
  }

  attend(eventId, btn) {
    this.eventService.attendToEvent(eventId).subscribe(e => {
      btn.text = 'Joined';
      btn.disabled = true;
    });
  }

}
