import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth.guard";
import { ExButton } from "../inner-components/ex-button";
import { IsJoind } from "../inner-components/is-joined.pipe";
import { MaterialModule } from "../material.module";
import { CreateEventComponent } from "./create-event/create-event.component";
import { DisplayEventComponent } from "./display-events/display-events.component";
import { EventDetailsComponent } from "./event-details/event-details.component";
import { FileDropZoneDirective } from "./file-drop-zone.directive";
import { FromApiUrlPipe } from "./from-api";
import { MyEventsComponent } from "./my-events/my-events.component";

const routes: Routes = [
    {
        path: '', component: DisplayEventComponent, canActivate: [AuthGuard]
    },
    {
        path: 'myevents', component: MyEventsComponent, canActivate: [AuthGuard]
    },
    {
        path: 'newevent', component: CreateEventComponent, canActivate: [AuthGuard]
    },
    {
        path: ':eventId', component: EventDetailsComponent, canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        DisplayEventComponent,
        CreateEventComponent,
        EventDetailsComponent,
        MyEventsComponent,
        ExButton,
        IsJoind,
        FromApiUrlPipe,
        FileDropZoneDirective
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ]
})
export class EventsModule {

}