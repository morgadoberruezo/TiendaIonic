import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductosProvider } from '../../providers/productos/productos';
//navegaremos a la página producto
import { ProductoPage } from '../producto/producto';
import { CarritoProvider } from '../../providers/index.services';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  productoPage = ProductoPage;
  productos:any[] = [];
  constructor(public navCtrl: NavController,
              public _ps:ProductosProvider,
              private _cs: CarritoProvider) {
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
