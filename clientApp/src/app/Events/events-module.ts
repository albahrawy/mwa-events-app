import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth.guard";
import { MaterialModule } from "../material.module";
import { CreateEventComponent } from "./create-event/create-event.component";
import { DisplayEventComponent } from "./display-events/display-events.component";
import { EditEventComponent } from "./edit-event/edit-event.component";
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
        path: 'editevent/:eventId', component: EditEventComponent, canActivate: [AuthGuard]
    },
    {
        path: ':eventId', component: EventDetailsComponent, canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        DisplayEventComponent,
        CreateEventComponent,
        EditEventComponent,
        EventDetailsComponent,
        MyEventsComponent,
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