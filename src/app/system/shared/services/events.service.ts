import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { NPEvent } from './../models/event.model';
// import { BaseApi } from './../../../shared/core/base-api';

@Injectable()
export class EventsService {

    events: AngularFireList<NPEvent>;
    eventsRef: Observable<any>;

    constructor( public http: Http, public db: AngularFireDatabase ) {
        // super(http, db);
        this.events = db.list('events');
        this.eventsRef = db.list('events').valueChanges();
    }

    addEvent(event: NPEvent): Observable<any> { // : Observable<NPEvent[]>
        // return this.post('events', event);
        const eventRef = this.events.push(event);
        const evt =  this.db.object('events/' + eventRef.key);
        evt.update({key: eventRef.key});
        return evt.valueChanges();
    }

    getEvents(): Observable<any> { // : Observable<NPEvent[]>
        // return this.get('events');
        return this.eventsRef;
    }

    getEventById(id: string): Observable<any> { //: Observable<NPEvent>
        // return this.get(`events/${id}`);
        let eventId = +id - 1;
        return this.db.object(`events/${eventId}`).valueChanges();
    }
}
