import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { getUrl } from '../service/config';

@Injectable({ providedIn: 'root' })
export class EventService {

    constructor(private http: HttpClient) {

    }

    getEvents(searchParams?: { [key: string]: any }) {
        searchParams = this.normalize(searchParams);
        if (!searchParams || !Object.keys(searchParams).length) {
            return this.http.get(getUrl('events'));
        } else {
            return this.http.post(getUrl('events'), searchParams);
        }
    }

    getEventById(eventId) {
        return this.http.get(getUrl('events', eventId));
    }

    getMyEvents() {
        return this.http.get(getUrl('myEvents'));
    }

    addEvent(event) {
        return this.http.post(getUrl('events', 'newEvent'), event);
    }

    attendToEvent(eventId) {
        return this.http.patch(getUrl('events', 'join', eventId), null);
    }

    deleteEvent(eventId) {
        return this.http.delete(getUrl('events', eventId));
    }



    private normalize(obj, parentKey = null, parent = {}) {
        if (!obj) { return null; }
        return Object.entries(obj).reduce((prv, [e, v]) => {
            if (typeof v === 'object' && v.constructor === Object) {
                const key = !!parentKey ? `${parentKey}.${e}` : e;
                this.normalize(v, key, prv);
            } else if (!!v) {
                const key = !!parentKey ? `${parentKey}.${e}` : e;
                prv[key] = v;
            }
            return prv
        }, parent);
    }

}