import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-search-item',
  templateUrl: 'search-item.html',
})
export class SearchItemPage {

  constructor(
    public name: string,
    public artist: string,
    public thumbnail: string,
    public artistId: any) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchItemPage');
  }

}
