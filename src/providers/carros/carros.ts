import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Carro } from '../../modelos/carro';

@Injectable()
export class CarrosProvider {

  constructor(public http: HttpClient) {
    
  }

  listar() {
    return this.http.get<Carro[]>('http://localhost:8080/api/carro/listatodos');
  }

}
