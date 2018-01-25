
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
  pagina:number = 1;
  public productos: any[] = [];

  constructor(public http: Http) {
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
                    let nuevaData = this.agrupar ( data, 2 );
                    this.productos.push(...nuevaData);

                    this.pagina++;
                    console.log(this.pagina);
                  }
                  //la promesa termina
                  resolve();
        });
    }) ;
    return promesa;

  }

  private agrupar( arr: any, tamano:number) {
    let nuevoArreglo = [];
    for (let i = 0; i < arr.length; i+=tamano)
      nuevoArreglo.push( arr.slice(i, i+tamano));
    console.log(nuevoArreglo);
    return nuevoArreglo;
  }

}
