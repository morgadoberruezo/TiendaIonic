
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { URL_SERVICIOS } from './../../config/url.services';

/*
  Generated class for the ProductosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductosProvider {
  pagina:number = 0;
  public productos: any[] = [];

  constructor(public http: Http) {
    console.log('Hello ProductosProvider Provider');
    this.cargar_todos();

  }
  cargar_todos(){

    // creamos un proceso asíncrono con una PROMESA
    let promesa = new Promise((resolve,reject) => { //devuelve una PROMESA
        //cuerpo de la promesa. Ejecutamos el proceso asíncrono
        let url = URL_SERVICIOS + "productos/obtener_productos_page?pagina="+this.pagina;
        this.http.get( url ) //genera un observador al que posteriormente debemos de subscribirnos
                .map ( resp => resp.json() ) // de la respuesta datos json + headers + ... necesitamos la data
                .subscribe( data => {
                  console.log(data);
                  if (data.error){

                  }else {
                    this.productos.push(...data);
                    console.log(this.productos);
                    this.pagina++;
                    console.log(this.pagina);
                  }
                  //la promesa termina
                  resolve();
        });
    }) ;
    return promesa;
  //  let url = URL_SERVICIOS + "pedidos/obtener_pedidos";


  }

}
