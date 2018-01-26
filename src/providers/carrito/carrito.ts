import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AlertController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Injectable()
export class CarritoProvider {
  //definir una interfaz para los elementos que añadimos al carrito
  items:any[] = [];
  constructor(public http: Http, private alertCtrl: AlertController,
              private platform: Platform, private storage: Storage) {


    this.cargar_storage();

  }

  guardar_storage(){
    if ( this.platform.is("cordova")){
      //dispositivo. Se guarda en una BD sqlite
      this.storage.set("items",this.items);
    }else {
      //desktop
      localStorage.setItem("items", JSON.stringify (this.items));

    }
  }
  cargar_storage(){
    let promesa = new Promise ( (resolve, reject)=>{
        if (this.platform.is("cordova")){
          //dispositivo.Trabajamos con una promesa para detectar cuando el localStorage esta cargar_todos
          //esperamos a que este ready
          this.storage.ready() //regresa una PROMESA
                    .then( ()=>{
                        this.storage.get("items")
                            .then( items => {
                              if (items){
                                this.items = items;
                              }
                              resolve(); //se acaba la promesa
                            })
                  })
        }else {
        //computadora
          if (localStorage.getItem("items")){
            //existe items en LS

              this.items = JSON.parse( localStorage.getItem("items") );
          }
          resolve();//se acaba la promesa

        }
    });

    return promesa;


  }

  private agregar_carrito ( new_item:any ){
    for ( let item of this.items ){
      if (item.codigo == new_item.codigo){
        //se intenta adicionar el mismo item.Mensaje de alerta
        this.alertCtrl.create({
          title: "Item existe",
          subTitle: new_item.producto + ", ya existe en su carrito de compras",
          buttons: ["OK"]
        }).present();
        return;
      }
    }
    //con el return anterior, si llega aqui no esta añadido
    this.items.push( new_item );
    this.guardar_storage();
  }

}
