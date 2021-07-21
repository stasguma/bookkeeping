import { Component, OnInit, Input } from '@angular/core';
import { Bill } from '../../shared/models/bill.model';

@Component({
    selector: 'np-bill-card',
    templateUrl: './bill-card.component.html',
    styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

    @Input() bill: Bill;
    @Input() currency: any;

    dollar: number;
    gbp: number;

    constructor() { }

    ngOnInit() {
        const { conversion_rates } = this.currency;

        this.dollar = conversion_rates['USD'] * this.bill.value;
        this.gbp = conversion_rates['GBP'] * this.bill.value;
    }

}
