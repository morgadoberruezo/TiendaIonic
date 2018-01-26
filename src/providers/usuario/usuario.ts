import { Http, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AlertController, Platform } from 'ionic-angular';
import { URL_SERVICIOS } from '../../config/url.services';
import { Storage } from '@ionic/storage';

@Injectable()
export class UsuarioProvider {
  token:string;
  usuario:any;

  constructor(public http: Http, private alertCtrl: AlertController,
              private platform: Platform, private storage: Storage) {
          this.cargar_storage();
  }

  activo():boolean {
    if (this.token)
      return true;
    else
      return false;
  }

  ingresar( correo:string, contrasena:string){
    let data = new URLSearchParams();
    let usu:any = {
      'correo':correo,
      'contrasena':contrasena,
      'getHash':"true"
    }

    data.append("data",JSON.stringify(usu));
    let url = URL_SERVICIOS + "login";

    return this.http.post( url, data )
                  .map ( resp => {
                    //devuelve un Observable al cual hay q subscribirse
                    //posteriormente
                    let data_resp = resp.json();
                    console.log( data_resp );
                    if (data_resp.status == "error"){
                      this.alertCtrl.create({
                        title:"Error al iniciar el login",
                        subTitle: data_resp.data,
                        buttons:["OK"]
                      }).present();
                    }else {
                      this.token = data_resp.token;
                      this.usuario = data_resp.usuario;
                      //Guardamos en storage
                      this.guardar_storage();
                    }
                  })
  }

  cerrar_sesion(){
    this.token = null;
    this.usuario = null;
//actualizar storage
    this.guardar_storage();

  }

  guardar_storage(){
    if ( this.platform.is("cordova")){
      //dispositivo. Se guarda en una BD sqlite
      this.storage.set("token",this.token);
      this.storage.set("usuario",this.usuario);
    }else {
      //desktop
      if (this.token){
        localStorage.setItem("token", this.token);
        localStorage.setItem("usuario", this.usuario);
      }else {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
      }



    }
  }
  cargar_storage(){
    let promesa = new Promise ( (resolve, reject)=>{
        if (this.platform.is("cordova")){
          //dispositivo.Trabajamos con una promesa para detectar cuando el localStorage esta cargar_todos
          //esperamos a que este ready
          this.storage.ready() //regresa una PROMESA
                    .then( ()=>{
                        this.storage.get("token")
                            .then( token => {
                              if (token){
                                this.token = token;
                              }
                              resolve(); //se acaba la promesa
                            });
                        this.storage.get("usuario")
                            .then( usuario => {
                              if (usuario){
                                this.usuario = usuario;
                              }
                              resolve(); //se acaba la promesa
                            })
              })
        }else {
        //computadora
          if (localStorage.getItem("token")){
            //existe items en LS

              this.token = localStorage.getItem("token") ;
              this.usuario = JSON.parse( localStorage.getItem("usuario") );
          }
          resolve();//se acaba la promesa

        }
    });

    return promesa;


  }

}
