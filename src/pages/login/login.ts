import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/index.services';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  contrasena: string = "";
  correo:string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private viewCtrl: ViewController,
              private _us: UsuarioProvider ) {

                //cierra el modal
      //  this.viewCtrl.dismiss();
  }

  login(){
    this._us.ingresar(this.correo, this.contrasena) //devuelve un Observable
              .subscribe( () => {
                  if (this._us.activo()){
                    this.viewCtrl.dismiss(true);
                  }
              });
  }



}
