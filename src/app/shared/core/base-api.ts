import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";

import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@Injectable()
export class BaseApi {
  // private baseUrl = 'http://localhost:3000/';
  // private baseUrl = 'https://bookkeeping-b29d1.firebaseio.com/';
  // private baseUrl = 'https://console.firebase.google.com/project/bookkeeping-b29d1/database/bookkeeping-b29d1/data/';

  constructor(public http: Http, public db: AngularFireDatabase) {}

  // private getUrl(url: string = ''): string {
  //     return this.baseUrl + url;
  // }

  public get(url: string = ""): Observable<any> {
      // return this.http
      //     .get(this.getUrl(url))
      //     .map((res: Response) => res.json());
      return this.db.list(url).valueChanges();
  }

  public post(url: string = "", data: any = {}): Observable<any> {
      // return this.http
      //     .post(this.getUrl(url), data)
      //     .map((res: Response) => res.json());
      const afList = this.db.list(url);
      afList.push(data);
      const listObservable = afList.snapshotChanges();
      listObservable.subscribe((res) => console.log(res));

      return this.db.list(url).valueChanges();
  }

  public put(url: string = "", data: any = {}): Observable<any> {
      // return this.http
      //     .put(this.getUrl(url), data)
      //     .map((res: Response) => res.json());
      this.db.list(url).snapshotChanges().map(actions => {
          return actions.map(action => ({ key: action.key, ...action.payload.val() }));
      }).subscribe(items => {
          return this.keys = items.map(item => item.key);
      });

      // afList.update(key, { text: newText });
      return this.db.list(url).valueChanges();
  }
}
