import { Pipe, PipeTransform } from '@angular/core';
import { AtmDataReUp } from '../../core/interface/api_int.share';

@Pipe({
  name: 'card'
})
export class CardPipe implements PipeTransform {
  transform(items: AtmDataReUp[], searchTerm: string): AtmDataReUp[] {
    if (!items || !searchTerm || searchTerm.length === 0) {
      return items;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();

    // Filter the items based on the search term
    const filteredItems = items.filter(item =>
      item.name.toLowerCase().includes(lowerSearchTerm) ||
      item.card_number.toString().includes(lowerSearchTerm)
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

function getMatchCount(item: AtmDataReUp, searchTerm: string): number {
  let matchCount = 0;
  if (item.name.toLowerCase().includes(searchTerm)) {
    matchCount += 3;
  }
  if (item.card_number.toString().includes(searchTerm)) {
    matchCount += 2;
  }
  return matchCount;
}
