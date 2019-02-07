import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, LoadingController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { HttpClientModule } from '@angular/common/http';

import { CarrosProvider } from '../providers/carros/carros';
import { AgendamentosProvider } from '../providers/agendamentos/agendamentos';

import { IonicStorageModule } from '@ionic/storage';

import 'rxjs/add/operator/do';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { UsuarioProvider } from '../providers/usuario/usuario';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp,{mode: 'md'}),
    IonicStorageModule.forRoot({
      name: 'aluracar',
      storeName: 'agendamentos',
      driverOrder: ['indexeddb']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LoadingController,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CarrosProvider,
    AgendamentosProvider,
    UsuarioProvider
  ]
})
export class AppModule {}
