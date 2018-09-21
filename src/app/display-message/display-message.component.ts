import { Component, OnInit } from '@angular/core';
import CryptoJS from 'crypto-js/crypto-js';
import { ApiCallsService } from '../api-calls.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-display-message',
  templateUrl: './display-message.component.html',
  styleUrls: ['./display-message.component.css']
})
export class DisplayMessageComponent implements OnInit {

  constructor(private apiCalls: ApiCallsService, private activatedRoute: ActivatedRoute) { }
  id = ""; 
  hash = ""; 
  decryptedText  = "";
  hasAccepted = false;
  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.hash = params.hash;
    });
  }

  accept(){
    this.hasAccepted = true; 
    this.getMes();
  }

  getMes(){
    
    this.apiCalls.getMes(this.id)
     .subscribe(data => {
       try{
        var bytes = CryptoJS.AES.decrypt((<any>data).message, this.hash);
        var mes = bytes.toString(CryptoJS.enc.Utf8);
        this.decryptedText = mes; 

        this.apiCalls.deleteMes(this.id)
        .subscribe(data => {
            console.log("Deleted");
          });
       } catch (e){
        this.decryptedText = "Not valid anymore!";
       }
      },
      error => {this.decryptedText = "Not found!"});
  }

}
