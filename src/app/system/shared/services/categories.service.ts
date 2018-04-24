import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

import { Category } from '../models/category.model';
// import { BaseApi } from '../../../shared/core/base-api';

@Injectable()
export class CategoriesService {

    categories: AngularFireList<Category>;
    categoriesRef: Observable<any>;

    constructor( public http: Http, public db: AngularFireDatabase ) {
        // super(http, db);
        this.categories = db.list('categories');
        this.categoriesRef = db.list('categories').valueChanges();
    }

    addCategory(category: Category): Observable<any> { // : Observable<Category>
        // return this.post('categories', category);
        const addedCatRef = this.categories.push(category);
        const addedCat =  this.db.object('categories/' + addedCatRef.key);
        addedCat.update({key: addedCatRef.key});
        return addedCat.valueChanges();
    }

    getCategories(): Observable<any> { // : Observable<Category[]>
        // return this.get('categories');
        return this.categoriesRef;
    }

    updateCategory(category): Observable<any> { // : Observable<Category>
        // return this.put(`categories/${category.id}`, category);
        let catId = category.key ? category.key : category.id - 1;
        let catRef = this.db.object(`categories/${catId}`);
        catRef.update(category);
        return catRef.valueChanges();
    }

    getCategoryById(id: number): Observable<any> { // : Observable<Category>
        // return this.get(`categories/${id}`);
        let catId = id - 1;
        return this.db.object(`categories/${catId}`).valueChanges();
    }
}
