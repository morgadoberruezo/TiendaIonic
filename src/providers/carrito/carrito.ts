import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AlertController, Platform, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
//usuario service
import { UsuarioProvider } from '../usuario/usuario';
//paginas del modal
import { LoginPage, CarritoPage } from '../../pages/index.pages';

@Injectable()
export class CarritoProvider {
  //definir una interfaz para los elementos que añadimos al carrito
  items:any[] = [];
  total_carrito: number = 0;

  constructor(public http: Http, private alertCtrl: AlertController,
              private platform: Platform, private storage: Storage,
              private _us:UsuarioProvider, private modalCtrl: ModalController) {


    this.cargar_storage();
    this.calcular_total();
  }

  eliminar_item( idx: number ){
    this.items.splice(idx, 1);
    this.calcular_total();
    this.guardar_storage();
  }

  ver_carrito(){
    let modal: any;
    //hemos de detectar si el usuario inicio sesión
    if (this._us.token){
      //mostrar página del carrito
      modal = this.modalCtrl.create( CarritoPage );
    }else{
      //mostrar el login
      modal = this.modalCtrl.create ( LoginPage );
      //depués del login mostramos el carrito
    }
    modal.present();
    modal.onDidDismiss( (abrircarrito:boolean) =>{
      if (abrircarrito){
        this.modalCtrl.create( CarritoPage ).present();
      }
    })
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

  agregar_carrito ( new_item:any ){
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
    this.calcular_total();
    this.guardar_storage();
  }

  calcular_total(){
    this.total_carrito = 0;
    for (let item of this.items){
      this.total_carrito += Number (item.precioCompra);
    }
  }

}
