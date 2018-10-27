import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http'; 

import { Observable } from 'rxjs/Observable'; 
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'; 

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  constructor(private http: HttpClient) {  }

  /**
   * Request for saving a message on the server
   * @param myMes the message as a string
   */
  saveMes(myMes){
    return this.http.post(environment.apiEndpoint + 'api/saveMes', myMes)
      .map((response: Response) => response)
  }

  /**
   * Request to get a certain message from server by id
   * @param id of a certain message
   */
  getMes(id){
    return this.http.get(environment.apiEndpoint+ 'api/getMes/' + id)
      .map((response: Response) => response)
  }

  /**
   * Request to delete a certain message from server by id
   * @param id of a certain message
   */
  deleteMes(id){
    return this.http.get(environment.apiEndpoint + 'api/deleteMes/' + id)
      .map((response: Response) => response)
  }
}
