import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { UsersService } from '../../shared/services/users.service';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/user.model';
import { Message } from '../../shared/models/message.model';
import { fadeStateTrigger } from './../../shared/animations/fade.animation';

@Component({
    selector: 'np-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit {

    form: FormGroup;
    message: Message;

    constructor(
        private usersService: UsersService,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.message = new Message('danger', '');

        this.route.queryParams
            .subscribe( (params: Params) => {

                if (params['nowCanLogin']) {

                    this.showMessage('Теперь вы можете зайти в систему', 'success');
                } else if (params['accessDenied']) {

                    this.showMessage('Для работы с системой вам необходимо войти', 'danger');
                }
            });

        this.form = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
        });

    }

    private showMessage(text: string, type: string = 'danger') {
        this.message = new Message(type, text);
        window.setTimeout( () => {
            this.message.text = '';
        }, 5000);
    }

    onSubmit() {
        const formData = this.form.value;

        this.usersService.getUserByEmail(formData.email)
            .subscribe( (user: User) => {

                if (user) {
                    if (user.password === formData.password) {
                        this.message.text = "";
                        window.localStorage.setItem('user', JSON.stringify(user));
                        this.authService.login();
                        this.router.navigate(['/system', 'bill']);
                    } else {
                        this.showMessage("Пароль введён неправильно");
                    }
                } else {
                    this.showMessage("Такого пользователя не существует");
                }
            });
    }
}
