import { Component, EventEmitter, Input, Output, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from './../../shared/models/category.model';

@Component({
    selector: 'np-add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnDestroy {
    sub1: Subscription;

    @Input() categories: Category[] = [];
    // @Output() onCategoryAdd: EventEmitter<Category> = new EventEmitter();

    constructor(private categoriesService: CategoriesService) { }

    onSubmit(form: NgForm)  {
        let { name, capacity } = form.value;

        if (capacity < 0) {
            capacity *= -1;
        }

        const id = this.categories.length + 1,
              key = null,
              category = new Category(name, capacity, id, key);

        this.sub1 = this.categoriesService.addCategory(category)
            .subscribe( (category: Category) => {
                form.reset();
                form.form.patchValue({capacity: 1});

                // this.onCategoryAdd.emit(category);
            });
    }

    ngOnDestroy() {
        if (this.sub1) {
            this.sub1.unsubscribe();
        }
    }

}
