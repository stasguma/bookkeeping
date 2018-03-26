import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';

import { CategoriesService } from "./../../shared/services/categories.service";
import { EventsService } from "./../../shared/services/events.service";
import { NPEvent } from "./../../shared/models/event.model";
import { Category } from "./../../shared/models/category.model";

@Component({
    selector: "np-history-detail",
    templateUrl: "./history-detail.component.html",
    styleUrls: ["./history-detail.component.scss"]
})
export class HistoryDetailComponent implements OnInit, OnDestroy {
    constructor(
        private route: ActivatedRoute,
        private categoriesService: CategoriesService,
        private eventsService: EventsService
    ) {}

    sub1: Subscription;
    category: Category;
    event: NPEvent;
    isLoaded = false;

    ngOnInit() {
        this.sub1 = this.route.params
            .mergeMap((params: Params) => this.eventsService.getEventById(params['id']))
            .mergeMap((event: NPEvent) => {
                this.event = event;

                return this.categoriesService.getCategoryById(event.category);
            })
            .subscribe((category: Category) => {
                this.category = category;
                this.isLoaded = true;
            })
    }

    ngOnDestroy() {
        if (this.sub1) {
            this.sub1.unsubscribe();
        }
    }
}
