import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, throwError } from 'rxjs';
import { mergeMap, first, switchMap, map } from 'rxjs/operators';

import { Category } from './../../shared/models/category.model';
import { NPEvent } from './../../shared/models/event.model';
import { EventsService} from './../../shared/services/events.service';
import { BillService} from './../../shared/services/bill.service';
import { Bill } from './../../shared/models/bill.model';
import { Message } from './../../../shared/models/message.model';

@Component({
    selector: 'np-add-event',
    templateUrl: './add-event.component.html',
    styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {
    @Input() categories: Category[] = [];

    events: NPEvent[];
    types = [
        {type: 'income', label: 'Доход'},
        {type: 'outcome', label: 'Расход'}
    ];
    message: Message;
    sub1$: Subscription;
    sub2$: Subscription;

    constructor(
        private eventsService: EventsService,
        private billService: BillService
    ) { }

    ngOnInit() {
        this.message = new Message('danger', '');

        this.eventsService.getEvents()
            .subscribe( (events: NPEvent[]) => this.events = events );

    }

    private showMessage(text: string) {
        this.message.text = text;
        window.setTimeout(() => this.message.text = '', 5000);
    }

    onSubmit(form: NgForm) {
        let { amount, type, description, category } = form.value;

        if (amount < 0) {
            amount *= -1;
        }

        const id: number = this.events.length + 1,
        catName = null,
        key = null;

        const event = new NPEvent(
            type, amount, +category,
            Date.now(), description, id, catName, key
        );

        this.sub1$ = this.billService.getBill()
            .pipe(
                first(),
                map((bill: Bill) => {
                    let value = 0;

                    if (type === 'outcome') {
                        if (amount > bill.value) {
                            this.showMessage(`На счету недостаточно средств. Вам нехватает ${amount - bill.value}`);
                            throw new Error(`На счету недостаточно средств. Вам нехватает ${amount - bill.value}`);
                        } else {
                            value = bill.value - amount;
                        }
                    } else {
                        value = bill.value + amount;
                    }

                    return {value, currency: bill.currency};
                }),
                switchMap(({value, currency}) => {
                    return this.billService.updateBill({value, currency})
                        .pipe(
                            first(),
                            switchMap(() => this.eventsService.addEvent(event)),
                        )
                })
            )
            .subscribe(
                () => {
                    form.reset();
                    form.setValue({
                        amount: 1,
                        description: "",
                        category: 1,
                        type: 'outcome'
                    });
                },
                error => console.log('error', error)
            );
    }

    ngOnDestroy() {
        if (this.sub1$) {
            this.sub1$.unsubscribe();
        }
        if (this.sub2$) {
            this.sub2$.unsubscribe();
        }
    }

}
