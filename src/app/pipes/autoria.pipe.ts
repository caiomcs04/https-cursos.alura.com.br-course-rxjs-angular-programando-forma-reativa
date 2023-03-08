import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'autoria'
})
export class AutoriaPipe implements PipeTransform {

  transform(authors: Array<string>): string {
    if(authors){
      return authors[0]
    }
    return '';
  }

}
