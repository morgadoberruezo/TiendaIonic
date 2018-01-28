import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarritoProvider } from '../../providers/index.services';
import { OrdenesDetallePage } from '../../pages/index.pages';

@IonicPage()
@Component({
  selector: 'page-ordenes',
  templateUrl: 'ordenes.html',
})
export class OrdenesPage {
  ordenesDetalle = OrdenesDetallePage;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public _cs: CarritoProvider) {
  }

  ionViewWillEnter() {
    console.log('cargando ordenes ...');
    this._cs.cargar_ordenes();
  }

}
