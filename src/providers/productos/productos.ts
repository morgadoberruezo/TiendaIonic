
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { URL_SERVICIOS } from './../../config/url.services';


@Injectable()
export class ProductosProvider {
  pagina:number = 1;
  public productos: any[] = [];
  public categorias: any[] = [];
  public productosCategoria: any[] = [];

  constructor(public http: Http) {
    this.cargar_todos();
    this.cargar_categorias();
    this.cargar_por_categorias(1);
  }

  cargar_por_categorias (categoria:number){
    let url = URL_SERVICIOS + "productos/categoria/"+categoria+"/1";
    this.http.get( url )
            .map ( resp => resp.json())
            .subscribe (data => {
              console.log("categoria 1")
              console.log(data);
              this.productosCategoria = data.productos;
              console.log(data.productos);
            })
  }

  cargar_categorias() {
    let url = URL_SERVICIOS + "categorias/listar";

    this.http.get( url )
            .map (resp => resp.json())
            .subscribe(data => {
              if (data.error == "true"){
                console.log('problemas');
                //problemas
              }else {
              //  this.categorias = data.categorias;
                console.log('categoris');
                console.log(data.categorias);
                this.categorias = data.categorias;
              }
            })

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
