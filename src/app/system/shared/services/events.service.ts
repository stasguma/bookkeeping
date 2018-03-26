import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { BaseApi } from './../../../shared/core/base-api';
import { NPEvent } from './../models/event.model';

@Injectable()
export class EventsService extends BaseApi{

    constructor( public http: Http, public db: AngularFireDatabase ) {
        super(http, db);
    }

    addEvent(event: NPEvent): Observable<NPEvent> {
        return this.post('events', event);
    }

    getEvents(): Observable<NPEvent[]> {
        return this.get('events');
    }

    getEventById(id: string): Observable<NPEvent> {
        return this.get(`events/${id}`);
    }
}
