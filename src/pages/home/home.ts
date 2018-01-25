import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductosProvider } from '../../providers/productos/productos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  productos:any[] = [];
  constructor(public navCtrl: NavController, public _ps:ProductosProvider) {
    this.productos = _ps.productos;
  }

  siguiente( infiniteScroll ){
    //cargar-todos devuelve una promesa
    this._ps.cargar_todos(  )
          .then( ()=>{
            infiniteScroll.complete();
          }
        )
  }

}
