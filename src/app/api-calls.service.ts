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

  url = "https://dry-lake-13557.herokuapp.com/"
  saveMes(myMes){
    return this.http.post(this.url + 'api/saveMes', myMes)
      .map((response: Response) => response)
  }

  getMes(id){
    return this.http.get(this.url + 'api/getMes/' + id)
      .map((response: Response) => response)
  }

  deleteMes(id){
    return this.http.get(this.url + 'api/deleteMes/' + id)
      .map((response: Response) => response)
  }

  //https://medium.com/@BaaniLeen/connecting-angular-5-app-to-mongodb-database-mean-stack-9b4b4232e219
}
