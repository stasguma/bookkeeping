import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Category } from '../models/category.model';
import { BaseApi } from '../../../shared/core/base-api';

@Injectable()
export class CategoriesService extends BaseApi {

    constructor( public http: Http, public db: AngularFireDatabase ) {
        super(http, db);
    }

    addCategory(category): Observable<Category> {
        return this.post('categories', category);
    }

    getCategories(): Observable<Category[]> {
        return this.get('categories');
    }

    updateCategory(category): Observable<Category> {
        return this.put(`categories/${category.id}`, category);
    }

    getCategoryById(id: number): Observable<Category> {
        return this.get(`categories/${id}`);
    }
}
