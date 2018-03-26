import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Category } from './../../shared/models/category.model';

@Component({
    selector: 'np-history-filter',
    templateUrl: './history-filter.component.html',
    styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent {
    @Output() onFilterCancel: EventEmitter<any> = new EventEmitter();
    @Output() onFilterApply: EventEmitter<any> = new EventEmitter();

    @Input() categories: Category[] = [];

    timePediods = [
        {type: 'd', label: 'День'},
        {type: 'w', label: 'Неделя'},
        {type: 'M', label: 'Месяц'},
    ];
    types = [
        {type: 'income', label: 'Доход'},
        {type: 'outcome', label: 'Расход'}
    ];

    selectedPeriod = 'd';
    selectedTypes = [];
    selectedCategories = [];

    closeFilter() {
        this.onFilterCancel.emit();

        this.selectedPeriod = 'd';
        this.selectedTypes = [];
        this.selectedCategories = [];
    }

    private calculateInputParams(field: string, checked: boolean, value: string) {
        if (checked) {
            this[field].indexOf(value) === -1 ? this[field].push(value) : null;
        } else {
            this[field] = this[field].filter(t => t !== value);
        }
    }

    handleChangeType({checked, value}) {
        this.calculateInputParams('selectedTypes', checked, value);
    }

    handleChangeCategory({checked, value}) {
        this.calculateInputParams('selectedCategories', checked, value);
    }

    applyFilter() {
        this.onFilterApply.emit({
            period: this.selectedPeriod,
            types: this.selectedTypes,
            categories: this.selectedCategories
        });
    }
}
