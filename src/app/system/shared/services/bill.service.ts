import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

import { Bill } from '../models/bill.model';
// import { BaseApi } from '../../../shared/core/base-api';

@Injectable()
export class BillService {

    bill: AngularFireObject<Bill>;
    billRef: Observable<any>;

    constructor( public http: HttpClient, public db: AngularFireDatabase ) {
        // super(http, db);
        this.bill = db.object('bill');
        this.billRef = db.object('bill').valueChanges();
    }

    getBill(): Observable<any> { //: Observable<Bill>
        // return this.get('bill');
        return this.billRef;
    }

    updateBill(bill: Bill): Observable<any> { // : Observable<Bill>
        // return this.put('bill', bill);
        this.bill.update(bill);

        return this.billRef;
    }

    getCurrency(base: string = "EUR"): Observable<any> {
        return this.http
          .get(`https://api.exchangeratesapi.io/api/latest?base=${base}`);
          // .get(`http://data.fixer.io/api/latest?access_key=e2284628c406198445c817a4fa3725f8&base=${base}`);
    }
}
