import { Pipe, PipeTransform } from '@angular/core';
import { AtmData } from '../interface/interfaces.share';

@Pipe({
  name: 'card'
})
export class CardPipe implements PipeTransform {
  transform(items: AtmData[], searchTerm: string): AtmData[] {
    if (!items || !searchTerm || searchTerm.length === 0) {
      return items;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();

    // Filter the items based on the search term
    const filteredItems = items.filter(item =>
      item.name.toLowerCase().includes(lowerSearchTerm) ||
      item.cardNumber.toString().toLowerCase().includes(lowerSearchTerm)
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

function getMatchCount(item: AtmData, searchTerm: string): number {
  let matchCount = 0;
  if (item.name.toLowerCase().includes(searchTerm)) {
    matchCount += 3;
  }
  if (item.cardNumber.toString().toLowerCase().includes(searchTerm)) {
    matchCount += 2;
  }
  return matchCount;
}
