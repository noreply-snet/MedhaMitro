import { Pipe, PipeTransform } from '@angular/core';
import { NoteData } from '../../core/interface/api_int.share';

@Pipe({
  name: 'note'
})
export class NotePipe implements PipeTransform {

  transform(items: NoteData[], searchTerm: string): NoteData[] {
    if (!items || !searchTerm || searchTerm.length === 0) {
      return items;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();

    // Filter the items based on the search term
    const filteredItems = items.filter(item =>
      item.title.toLowerCase().includes(lowerSearchTerm) ||
      item.massage.toLowerCase().includes(lowerSearchTerm)
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


function getMatchCount(item: NoteData, searchTerm: string): number {
  let matchCount = 0;
  if (item.title.toLowerCase().includes(searchTerm)) {
    matchCount += 3;
  }
  if (item.massage.toLowerCase().includes(searchTerm)) {
    matchCount += 2;
  }
  return matchCount;
}