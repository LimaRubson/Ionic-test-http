import { Jsonp } from '@angular/http';
import { Injectable } from '@angular/core';
import { SearchItemPage } from '../../pages/search-item/search-item';

/*
  Generated class for the SearchProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SearchProvider {
  apiRoot: string = 'https://itunes.apple.com/search';
  results: SearchItemPage[];

  constructor(public jsonp: Jsonp) {

    this.results = [];

    console.log('Hello SearchProvider Provider');
  
  }

  search(term: string) {
    return new Promise((resolve, reject) => {
      this.results = [];
      let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20&callback=JSONP_CALLBACK`;
      this.jsonp.request(apiURL)
          .toPromise()
          .then(
            res => { //Sucess
              this.results = res.json().results.map(item => {
                console.log(item);
                return new SearchItemPage(
                  item.trackName,
                  item.artistName,
                  item.artworkUrl60,
                  item.artistId
                );
              });
              resolve(this.results);
            },
            msg => { //Error
              reject(msg);
            }
          );
    });
  }
}
