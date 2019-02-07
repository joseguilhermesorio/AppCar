import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Usuario } from '../../modelos/usuario';


@Injectable()
export class UsuarioProvider {

  private _url:string = "http://localhost:8080/api/login";
  private _usuarioLogado:Usuario;

  constructor(public http: HttpClient) {  
  }

  efetuaLogin(email, senha) {
    return this.http.post<Usuario>(this._url, { email, senha })
            .do((usuario) => this._usuarioLogado = usuario);
  }

  obtemUsuarioLogado() {
    return this._usuarioLogado;
  }
}
