import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { CategoriesService } from './../../shared/services/categories.service';
import { Category } from './../../shared/models/category.model';
import { Message } from './../../../shared/models/message.model';

@Component({
    selector: 'np-edit-category',
    templateUrl: './edit-category.component.html',
    styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {
    sub1: Subscription;

    @Input() categories: Category[] = [];
    // @Output() onCategoryEdit: EventEmitter<Category> = new EventEmitter();

    currentCategoryId = 1;
    currentCategory: Category;
    message: Message;

    constructor(private categoriesService: CategoriesService) { }

    ngOnInit() {
        this.message = new Message('success', '');
        this.onCategoryChange();
    }

    onCategoryChange() {
        this.currentCategory = this.categories
            .find( c => c.id === +this.currentCategoryId );
    }

    onSubmit(form: NgForm) {
        let { name, capacity } = form.value;

        if (capacity < 0) {
            capacity *= -1;
        }

        const key = this.currentCategory.key || null;
        const category = new Category(name, capacity, +this.currentCategoryId, key);

        this.sub1 = this.categoriesService.updateCategory(category)
            .subscribe( (category: Category) => {
                // this.onCategoryEdit.emit(category);
                this.message.text = "Категория успешно отредактирована";
                window.setTimeout( () => this.message.text = '', 5000);
            });
    }

    ngOnDestroy() {
        if (this.sub1) {
            this.sub1.unsubscribe();
        }
    }

}
