import { Component, OnInit } from '@angular/core';
import CryptoJS from 'crypto-js/crypto-js';
import { ApiCallsService } from '../api-calls.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-display-message',
  templateUrl: './display-message.component.html',
  styleUrls: ['./display-message.component.css']
})
export class DisplayMessageComponent implements OnInit {

  constructor(private apiCalls: ApiCallsService, private activatedRoute: ActivatedRoute) { }
  id = "";
  pass = "";
  decryptedText = "";
  hasAccepted = false;
  statusInfo = 'Loading';
  loading = false;
  deletedInfo = ""; 

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.pass = params.pass;
    });
  }

  accept() {
    this.hasAccepted = true;
    this.getMes();
  }

  getMes() {
    this.loading = true; 
    //TODO: Error handling does not work!
    try {
      let mess = this.apiCalls.getMes(this.id);
      mess.subscribe((data: any) => {
        if(data === null){
          this.decryptedText = "Not found!"; 
          this.statusInfo = '<span class="badge bg-warning">1</span> Expired';
          this.loading = false;
        } else{
          var bytes = CryptoJS.AES.decrypt((<any>data).message, this.pass);
          var mes = bytes.toString(CryptoJS.enc.Utf8);
          this.decryptedText = mes;
          this.loading = false;
          this.statusInfo = '<span class="badge bg-warning">1</span> Message decrypted successfully!';
          this.deletedInfo = '<i class="fas fa-check"></i> Deleted from server!';
        }});
    } catch (e) {
      this.decryptedText = "Not valid anymore!";
      this.statusInfo = '<span class="badge bg-warning">1</span> Expired';
      this.loading = false;
    }
  }
}
