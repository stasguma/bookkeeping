import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { User } from '../models/user.model';
// import { BaseApi } from '../core/base-api';

@Injectable()
export class UsersService {
    constructor( public http: HttpClient, public db: AngularFireDatabase ) {
        // super(http, db);
    }

    getUserByEmail(email: string): Observable<any> {
        // return this.get(`users?email=${email}`)
        //     .map( (user: User[]) => user[0] ? user[0] : undefined);

        return this.db.list('users', ref => ref.orderByChild('email').equalTo(email)).valueChanges()
            .pipe(map((user: User[]) => user[0] ? user[0] : undefined));
    }

    createNewUser(user: User): Observable<any> { // : Observable<User>
        // return this.post('users', user);
        const users = this.db.list('users');
        users.push(user);

        return users.valueChanges();
    }
}
