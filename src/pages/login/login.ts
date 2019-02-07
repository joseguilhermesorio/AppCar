import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Usuario } from '../../modelos/usuario';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public email:string = 'joao@alura.com.br';
  public senha:string = 'alura123';

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private usuarioProvider: UsuarioProvider,
    private _alertCtrl: AlertController
    ) {
  }

  efetuaLogin() {

    this.usuarioProvider
    .efetuaLogin(this.email, this.senha)
    .subscribe(
      (usuario:Usuario) => {
        this.navCtrl.setRoot(HomePage);
      },
      () => {
        this._alertCtrl.create({
          title: 'Aviso!',
          subTitle: 'Não foi possível efetuar o login!',
          buttons: [
            {text: 'Ok'}
          ]
        }).present();
        
      }
    )

    
  }

}
