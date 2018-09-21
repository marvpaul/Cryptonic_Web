import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http'; 

import { Observable } from 'rxjs/Observable'; 
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'; 

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  constructor(private http: HttpClient) {  }

  saveMes(myMes){
    return this.http.post('http://localhost:8080/api/saveMes', myMes)
      .map((response: Response) => response)
  }

  getMes(id){
    return this.http.get('http://localhost:8080/api/getMes/' + id)
      .map((response: Response) => response)
  }

  deleteMes(id){
    return this.http.get('http://localhost:8080/api/deleteMes/' + id)
      .map((response: Response) => response)
  }

  //https://medium.com/@BaaniLeen/connecting-angular-5-app-to-mongodb-database-mean-stack-9b4b4232e219
}
