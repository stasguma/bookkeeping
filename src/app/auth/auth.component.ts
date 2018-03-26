import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import { fadeStateTrigger } from './../shared/animations/fade.animation';

@Component({
    selector: 'np-auth',
    templateUrl: './auth.component.html',
    animations: [fadeStateTrigger]
})
export class AuthComponent {
    @HostBinding('@fade') a = true;
}
