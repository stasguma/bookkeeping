import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { NPEvent } from './../models/event.model';
// import { BaseApi } from './../../../shared/core/base-api';

@Injectable()
export class EventsService {

    events: AngularFireList<NPEvent>;
    eventsRef: Observable<any>;

    constructor( public http: HttpClient, public db: AngularFireDatabase ) {
        this.events = db.list('events');
        this.eventsRef = db.list('events').valueChanges();
    }

    addEvent(event: NPEvent): Observable<any> { // : Observable<NPEvent[]>
        const eventRef = this.events.push(event);
        const evt =  this.db.object('events/' + eventRef.key);
        evt.update({key: eventRef.key});
        return evt.valueChanges();
    }

    getEvents(): Observable<any> { // : Observable<NPEvent[]>
        return this.eventsRef;
    }

    getEventById(id: string): Observable<any> { //: Observable<NPEvent>
        let eventId = +id - 1;
        return this.db.object(`events/${eventId}`).valueChanges();
    }
}
