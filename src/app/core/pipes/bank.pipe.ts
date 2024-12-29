import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bank'
})
export class BankPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
