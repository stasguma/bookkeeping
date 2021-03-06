import { Component, Input, OnInit } from '@angular/core';

import { Category } from './../../shared/models/category.model';
import { NPEvent } from './../../shared/models/event.model';

@Component({
    selector: 'np-history-events',
    templateUrl: './history-events.component.html',
    styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {
    @Input() categories: Category[];
    @Input() events: NPEvent[];

    constructor() { }

    searchValue = '';
    searchPlaceholder = 'Сумма';
    searchField = 'amount';

    ngOnInit() {
        this.events.forEach( (e) => {
            e.catName = this.categories.find(c => c.id === e.category).name;
        });
    }

    getEventClass(e: NPEvent) {
        return {
            'label': true,
            'label-danger': e.type === 'outcome',
            'label-success': e.type === 'income'
        }
    }

    changeCriteria(field: string) {
        const namesMap = {
            amount: 'Сумма',
            date: 'Дата',
            category: 'Категория',
            type: 'Тип'
        };

        this.searchPlaceholder = namesMap[field];
        this.searchField = field;
    }

}
