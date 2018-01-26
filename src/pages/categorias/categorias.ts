import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductosProvider } from '../../providers/index.services';
import { PorCategoriasPage } from '../index.pages';


@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  porCategorias = PorCategoriasPage;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public _ps:ProductosProvider ) {
  }



}
