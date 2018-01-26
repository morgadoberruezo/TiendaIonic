import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

//servicios
import { ProductosProvider, CarritoProvider, UsuarioProvider } from '../providers/index.services';
import { HttpModule } from '@angular/http';
//pipes
import { ImagenPipe } from '../pipes/imagen/imagen';
//paginas
import { HomePage, CarritoPage, CategoriasPage, ProductoPage, PorCategoriasPage,
         LoginPage, OrdenesPage, OrdenesDetallePage, TabsPage } from '../pages/index.pages';

//localStorage
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    ImagenPipe,
    HomePage, CarritoPage,CategoriasPage, ProductoPage, PorCategoriasPage,
    LoginPage, OrdenesPage, OrdenesDetallePage, TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, CarritoPage,CategoriasPage, ProductoPage, PorCategoriasPage,
    LoginPage, OrdenesPage, OrdenesDetallePage, TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CarritoProvider,
    ProductosProvider,
    UsuarioProvider
  ]
})
export class AppModule {}
