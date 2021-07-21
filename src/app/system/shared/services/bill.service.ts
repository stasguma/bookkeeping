import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';

import { Bill } from '../models/bill.model';
// import { BaseApi } from '../../../shared/core/base-api';

@Injectable()
export class BillService {

    bill: AngularFireObject<Bill>;
    billRef: Observable<any>;

    constructor( public http: HttpClient, public db: AngularFireDatabase ) {
        this.bill = db.object('bill');
        this.billRef = db.object('bill').valueChanges();
    }

    getBill(): Observable<Bill> {
        return this.billRef;
    }

    updateBill(bill: Bill): Observable<Bill> {
        this.bill.update(bill);
        return this.bill.valueChanges();
    }

    getCurrency(base: string = "EUR"): Observable<any> {
        return this.http
          .get(`https://v6.exchangerate-api.com/v6/${environment.CURRENCY_API_ACCESS_KEY}/latest/${base}`);
    }
}
