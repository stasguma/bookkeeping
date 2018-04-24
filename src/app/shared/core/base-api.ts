import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class BaseApi {
    private baseUrl = "http://localhost:3000/";
    // private baseUrl = 'https://bookkeeping-b29d1.firebaseio.com/';
    // private baseUrl = 'https://console.firebase.google.com/project/bookkeeping-b29d1/database/bookkeeping-b29d1/data/';

    constructor(public http: Http) {}

    private getUrl(url: string = ""): string {
        return this.baseUrl + url;
    }

    public get(url: string = ""): Observable<any> {
        return this.http
            .get(this.getUrl(url))
            .map((res: Response) => res.json());
    }

    public post(url: string = "", data: any = {}): Observable<any> {
        return this.http
            .post(this.getUrl(url), data)
            .map((res: Response) => res.json());
    }

    public put(url: string = "", data: any = {}): Observable<any> {
        return this.http
            .put(this.getUrl(url), data)
            .map((res: Response) => res.json());
    }
}
