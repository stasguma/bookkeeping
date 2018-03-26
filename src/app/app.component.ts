import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
    selector: 'np-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    // categories: AngularFireList<any>;
    categoriesRef: AngularFireList<any>;
    keys: any[];
    constructor(db: AngularFireDatabase) {
        db.list('categories').snapshotChanges().map(actions => {
            return actions.map(action => ({ key: action.key, ...action.payload.val() }));
        }).subscribe(items => {
            return this.keys = items.map(item => item.key);
        });

        console.log('categoriesRef', this.categoriesRef);
        window.setTimeout(() => console.log('categories', this.keys), 5000);
        // console.log('categories', this.categories);
    }

}
