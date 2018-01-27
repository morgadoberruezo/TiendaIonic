import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductosProvider } from '../../providers/productos/productos';
//navegaremos a la página producto
import { ProductoPage } from '../producto/producto';
import { CarritoProvider } from '../../providers/index.services';
import { UsuarioProvider } from '../../providers/index.services';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  productoPage = ProductoPage;
  productos:any[] = [];
  constructor(public navCtrl: NavController,
              public _ps:ProductosProvider,
              public _cs: CarritoProvider,
              public _us: UsuarioProvider) {
    this.productos = _ps.productos;
    console.log(this._us.activo());
    console.log(this._cs.items);
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
