import { Pipe, PipeTransform } from '@angular/core';
import { BankData } from '../../core/interface/api_int.share';

@Pipe({
  name: 'bank'
})
export class BankPipe implements PipeTransform {

  transform(items: BankData[], searchTerm: string): BankData[] {
    if (!items || !searchTerm || searchTerm.length === 0) {
      return items;
    }
    var lowerSearchTerm: string;
    try {
      lowerSearchTerm = searchTerm.toLowerCase();
    } catch (error) {
      lowerSearchTerm = searchTerm;
    }

    // Filter the items based on the search term
    const filteredItems = items.filter(item =>
      item.name.toLowerCase().includes(lowerSearchTerm) ||
      item.acc_number.toString().toLowerCase().includes(lowerSearchTerm)
    );

    // Sort the filtered items based on the matching pattern
    filteredItems.sort((a, b) => {
      const aMatchCount = getMatchCount(a, lowerSearchTerm);
      const bMatchCount = getMatchCount(b, lowerSearchTerm);
      return bMatchCount - aMatchCount;
    });

    return filteredItems;
  }

}

function getMatchCount(item: BankData, searchTerm: string): number {
  let matchCount = 0;
  if (item.name.toLowerCase().includes(searchTerm)) {
    matchCount += 3;
  }
  if (item.acc_number.toString().toLowerCase().includes(searchTerm)) {
    matchCount += 2;
  }
  return matchCount;
}