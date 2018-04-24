import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { User } from '../models/user.model';
// import { BaseApi } from '../core/base-api';

@Injectable()
export class UsersService {
    constructor( public http: Http, public db: AngularFireDatabase ) {
        // super(http, db);
    }

    getUserByEmail(email: string): Observable<any> {
        // return this.get(`users?email=${email}`)
        //     .map( (user: User[]) => user[0] ? user[0] : undefined);

        return this.db.list('users', ref => ref.orderByChild('email').equalTo(email)).valueChanges()
            .map((user: User[]) => user[0] ? user[0] : undefined);
    }

    createNewUser(user: User): Observable<any> { // : Observable<User>
        // return this.post('users', user);
        const users = this.db.list('users');
        users.push(user);

        return users.valueChanges();
    }
}
