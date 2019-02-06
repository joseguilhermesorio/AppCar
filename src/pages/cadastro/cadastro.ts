import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Carro } from '../../modelos/carro';
import { AgendamentosProvider } from '../../providers/agendamentos/agendamentos';

import { HomePage } from '../home/home';
import { Agendamento } from '../../modelos/agendamento';

import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  public carro: Carro;
  public precoTotal: number;


  //Variaveis do Formulario
  public nome:string = '';
  public endereco:string = '';
  public email:string = '';
  public data: string = new Date().toISOString();

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private agendamentoProvider: AgendamentosProvider,
    private _alert: AlertController,
    private _loading: LoadingController,
    private _storage: Storage
    ) {
    this.carro = this.navParams.get('carroSelecionado');
    this.precoTotal = this.navParams.get('precoTotal');
  }

  agendar() {


    let loading = this._loading.create({
      content: 'Enviando...',
      spinner: 'crescent'  
    })
    loading.present();

    //Validacao dos campos
    if(!this.nome || !this.email || !this.endereco) {
      let alertaPreenchimento = this._alert.create({
        title: "Preenchimento Obrigatório",
        subTitle: "Preencha todos os campos!",
        buttons:[
          {text: 'Ok'}
        ]
      });
      alertaPreenchimento.present();
      loading.dismiss();
      return;
    }

    let alerta = this._alert.create({
      title: 'Agendamento Efetuado!',
      subTitle: 'Seu agendamento foi recebido pela corretora, aguarde que em breve entraremos em contato!',
      buttons:[
        {
          text: 'Ok',
          //Funcao que ao clicar no Ok direciona para a pagina Inicial
          handler: () => {
            this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    });

    let agendamento:Agendamento = {
      nomeCliente: this.nome,
      enderecoCliente: this.endereco,
      emailCliente: this.email,
      modeloCarro: this.carro.nome,
      precoTotal: this.precoTotal,
      data: this.data,
      confirmado: false,
      enviado: false
    };

    this.agendamentoProvider.agendar(agendamento)
      .mergeMap((valor) => {
        let observable = this.salvar(agendamento);
        if(valor instanceof Error) {
          throw valor;
        }
        return observable;
      })
      .subscribe(
        () => {
          loading.dismiss();
          alerta.present();
        },
        error => {
          alerta.setTitle('Erro');
          alerta.setSubTitle('Ocorreu um erro no agendamento, por favor tente mais tarde!');
          alerta.present();
          loading.dismiss();
          console.log(error);
        }
      );
  }

  salvar(agendamento) {
    let chave = this.email + this.data.substr(0, 10);
    let promise = this._storage.set(chave, agendamento);

    return Observable.fromPromise(promise);
  }

  

}
