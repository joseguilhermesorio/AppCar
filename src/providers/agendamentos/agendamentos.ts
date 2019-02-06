import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable()
export class AgendamentosProvider {

  private _url:string = 'http://localhost:8080/api/agendamento/agenda';

  constructor(public http: HttpClient) {
    
  }

  agendar(agendamento) {
    return this.http.post(this._url, agendamento)
    .do(() => agendamento.enviado = true)
    .catch((err) => Observable.of(new Error('Ocorreu um erro no agendamento, por favor tente mais tarde!')));
  }

}
