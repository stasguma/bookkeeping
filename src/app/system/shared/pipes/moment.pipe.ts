import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'

@Pipe({
    name: 'npMoment'
})
export class MomentPipe implements PipeTransform {

    transform(value: string, formatTo: string = 'DD.MM.YYYY'): string {
        return moment(value).format(formatTo);
    }

}
