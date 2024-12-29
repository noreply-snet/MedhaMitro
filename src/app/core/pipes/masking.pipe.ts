import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'masking'
})
// This pipe is used to mask a credit card number by replacing each character with an asterisk (*)
export class MaskingPipe implements PipeTransform {

  transform(cardNumber: string) {
    if (cardNumber != undefined || cardNumber != null) {

      // add a whitespace after every 4th number
      const regex = /(.{4})/g;
      const cardNumberWithSpaces = cardNumber.match(regex)?.join(' ');

      // return cardNumberWithSpaces ?? maskedCardNumber;
      return cardNumberWithSpaces;

    }
    else {
      // return the original card number
      return cardNumber;
    }
  }
}



@Pipe({
  name: 'passMask'
})
export class PassMaskPipe implements PipeTransform {
  transform(value: string, status: boolean): string {
    if (value === null || value === undefined || value.length===0){
      return '';
    }

    if (status==true) {
      // Replace each character with an asterisk (*)
      return value.replace(/./g, '*');
    } else {
      return value;
    }
  }
}

@Pipe({
  name: 'cardNoMask'
})
export class CardNoMaskPipe implements PipeTransform {
  transform(value: string, status: boolean): string {
    if (!value || value.length === 0) {
      return '';
    }

    if (status) {
      // Hide all but the last 4 digits
      const hiddenDigits = value.slice(0, -4).replace(/\d/g, 'X');
      const lastFourDigits = value.slice(-4);
      return hiddenDigits + lastFourDigits;
    } else {
      return value;
    }
  }
}
