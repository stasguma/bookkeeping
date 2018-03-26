import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../../shared/services/auth.service';
import { User } from '../../../../shared/models/user.model';

@Component({
    selector: 'np-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    date: Date = new Date();
    user: User;

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        this.user = JSON.parse( window.localStorage.getItem('user') );
    }

    onLogout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

}
