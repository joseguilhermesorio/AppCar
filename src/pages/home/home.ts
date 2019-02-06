import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { HttpErrorResponse } from '@angular/common/http';
import { CarrosProvider } from '../../providers/carros/carros';

import { EscolhaPage } from '../escolha/escolha';

import { Carro } from '../../modelos/carro';
import { NavLifeCycles } from '../../utils/ionic/nav-lifecycles';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    CarrosProvider
  ]
})


export class HomePage implements NavLifeCycles {
  public carros:Carro[];

  constructor(
    public navCtrl: NavController, 
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private _carrosProvider: CarrosProvider
    ) {}

  ionViewDidLoad() {

    let loading = this._loadingCtrl.create({
      content: 'Aguarde...',
      spinner: 'crescent',
    });

    loading.present();

    /**
     * @resposta JSON
     * Para obter sucesso nessa requisiçao, 
     * precisamos startar o web-service node que está nesse mesmo diretório
     */
    this._carrosProvider.listar().subscribe(
      data => {
        this.carros = data;
        loading.dismiss();
      },
      (error: HttpErrorResponse) => {
        console.log(error.statusText);
        loading.dismiss();
        var alerta = this._alertCtrl.create({
          title: 'Falha na conexão',
          subTitle: 'Não foi possivel carregar a lista de carros!',
          buttons:[
            { text: 'Ok' }
          ]
        })
        alerta.present();
      }
    );
  }

  reloadPage() {
   this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  selecionaCarro(carro) {
    this.navCtrl.push(EscolhaPage.name,{
      carroSelecionado: carro
    });
  }

}
