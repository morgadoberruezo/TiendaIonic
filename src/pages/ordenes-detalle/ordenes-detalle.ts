import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CarritoProvider } from '../../providers/index.services';
import { OrdenesPage, HomePage } from '../index.pages';

@IonicPage()
@Component({
  selector: 'page-ordenes-detalle',
  templateUrl: 'ordenes-detalle.html',
})
export class OrdenesDetallePage {

  orden: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public _cs: CarritoProvider, private alertCtrl: AlertController) {
    this.orden = this.navParams.get("orden");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdenesDetallePage');
  }

  public borrar_orden ( $ordenId, idx ){

    this._cs.borrar_orden($ordenId)
        .subscribe (data => {
          console.log(data);
          if (data.status == "error"){
              //manejar el error
              this.alertCtrl.create({
                title: "Orden No Eliminada",
                subTitle: data.msg,
                buttons: ["OK"]
              }).present();
              this.navCtrl.push(HomePage );
          }else {
            this.alertCtrl.create({
              title: "Orden Eliminada",
              subTitle: data.msg,
              buttons: ["OK"]
            }).present();
            this.navCtrl.push(HomePage);
    }



    });

    //this._cs.eliminar_orden( idx );
  //  this.navCtrl.push(OrdenesPage );
  }

}
