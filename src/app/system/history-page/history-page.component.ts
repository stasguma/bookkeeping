import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
import * as moment from 'moment';

import { CategoriesService } from "./../shared/services/categories.service";
import { EventsService } from "./../shared/services/events.service";
import { Category } from "./../shared/models/category.model";
import { NPEvent } from "./../shared/models/event.model";

@Component({
  selector: 'np-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

    constructor(
        private categoriesService: CategoriesService,
        private eventsService: EventsService
    ) {}

    sub1: Subscription;
    isLoaded = false;
    categories: Category[] = [];
    events: NPEvent[] = [];
    filteredEvents: NPEvent[] = [];

    chartData = [];

    isFilterVisible = false;

    ngOnInit() {
        this.sub1 = combineLatest(
            this.categoriesService.getCategories(),
            this.eventsService.getEvents()
        ).subscribe( (data: [ Category[], NPEvent[] ]) => {

            this.categories = data[0];
            this.events = data[1];

            this.setOriginalEvents();
            this.calculateChartData();

            this.isLoaded = true;
        });
    }

    private setOriginalEvents() {
        this.filteredEvents = this.events.slice();
    }

    calculateChartData() {
        this.chartData = [];

        this.categories.forEach( (cat) => {
            const catEvents = this.filteredEvents.filter( (e) => e.category === cat.id && e.type === "outcome");

            this.chartData.push({
                name: cat.name,
                value: catEvents.reduce( (total, e) => {
                    total += e.amount;
                    return total;
                }, 0)
            });
        });
    }

    private toggleFilterVisibility(dir: boolean) {
        this.isFilterVisible = dir;
    }

    openFilter() {
        this.toggleFilterVisibility(true);
    }

    onFilterCancel() {
        this.toggleFilterVisibility(false);
        this.setOriginalEvents();
        this.calculateChartData();
    }

    onFilterApply(filterData: any) {
        this.toggleFilterVisibility(false);
        this.setOriginalEvents();

        const startPeriod = moment().startOf(filterData.period).startOf('d');
        const endPeriod = moment().endOf(filterData.period).endOf('d');

        this.filteredEvents = this.filteredEvents
            .filter(e => {
                return filterData.types.indexOf(e.type) !== -1;
            })
            .filter(e => {
                return filterData.categories.indexOf( e.category.toString() ) !== -1;
            })
            .filter(e => {
                const momentDate = moment(e.date);
                return momentDate.isBetween(startPeriod, endPeriod);
            });

        this.calculateChartData();
    }

    ngOnDestroy() {
        if (this.sub1) {
            this.sub1.unsubscribe();
        }
    }

}
