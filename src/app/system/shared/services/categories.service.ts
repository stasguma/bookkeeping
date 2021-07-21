import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Category } from '../models/category.model';
// import { BaseApi } from '../../../shared/core/base-api';

@Injectable()
export class CategoriesService {

    categories: AngularFireList<Category>;
    categoriesRef: Observable<any>;

    constructor( public http: HttpClient, public db: AngularFireDatabase ) {
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
        return this.categoriesRef;
    }

    updateCategory(category): Observable<any> { // : Observable<Category>
        let catId = category.key ? category.key : category.id - 1;
        let catRef = this.db.object(`categories/${catId}`);
        catRef.update(category);
        return catRef.valueChanges();
    }

    getCategoryByKey(key: string): Observable<any> { // : Observable<Category>
        return this.db.object(`categories/${key}`).valueChanges();
    }
}
