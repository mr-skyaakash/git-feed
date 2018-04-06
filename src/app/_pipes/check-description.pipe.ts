import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'checkDesc'
})

export class CheckDescription implements PipeTransform {
    transform(value: string, args: any[]) {
        if ( value === null || value === '' ) {
            return 'No Description';
        }
        return value;
    }
}
