import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Bill } from '../models/bill.model';
import { BaseApi } from '../../../shared/core/base-api';

@Injectable()
export class BillService extends BaseApi {

    constructor( public http: Http, public db: AngularFireDatabase ) {
        super(http, db);
    }

    getBill(): Observable<Bill> {
        return this.get('bill');
    }

    updateBill(bill: Bill): Observable<Bill> {
        return this.put('bill', bill);
    }

    getCurrency(base: string = "RUB"): Observable<any> {
        return this.http
          .get(`https://api.fixer.io/latest?base=${base}`)
          .map((res: Response) => res.json());
    }
}
