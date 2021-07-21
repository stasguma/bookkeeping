import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from 'rxjs';
import { map, mergeMap  } from 'rxjs/operators';

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
    sub2: Subscription;
    category: Category;
    categories;
    filteredEvent: NPEvent[];
    event: NPEvent;
    events: NPEvent[];
    isLoaded = false;

    ngOnInit() {
        this.sub1 = this.eventsService.getEvents()
            .subscribe((events: NPEvent[]) => {
                this.events = events;

                this.sub2 = this.route.params
                    .pipe(
                        map((params: Params) => {
                            return this.filteredEvent = this.events.filter((e) => {
                                return e.id === +params['id']
                            });

                        }),
                        mergeMap((event: NPEvent[]) => {
                            this.event = event[0];
                            return this.categoriesService.getCategories();
                        }),
                        mergeMap((categories: Category[]) => {
                            const cat = categories.filter((c) => c.id === this.event.category);
                            return this.categoriesService.getCategoryByKey(cat[0].key)
                        })

                    )
                    .subscribe((category: Category) => {
                        this.category = category;
                        this.isLoaded = true;
                    });
            })
        // this.sub1 = this.route.params
        //     .mergeMap((params: Params) => this.eventsService.getEventById(params['id']))
        //     .mergeMap((event: NPEvent) => {
        //         this.event = event;
        //
        //         return this.categoriesService.getCategoryById(event.category);
        //     })
        //     .subscribe((category: Category) => {
        //         this.category = category;
        //         this.isLoaded = true;
        //     })
    }

    ngOnDestroy() {
        if (this.sub1) {
            this.sub1.unsubscribe();
        }
        if (this.sub2) {
            this.sub2.unsubscribe();
        }
    }
}
