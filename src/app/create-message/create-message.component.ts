import { Component, OnInit, Input} from '@angular/core';
import CryptoJS from 'crypto-js/crypto-js';
import { ApiCallsService } from '../api-calls.service';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.css']
})
export class CreateMessageComponent implements OnInit {
  message = ""; 
  link = ""; 

  constructor(private apiCalls: ApiCallsService) {
    
   }

   copyLink(){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.link;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
   

  ngOnInit() {
  }

  sendMes(){
    var key = String(this.generateKey(String(CryptoJS.MD5(this.message))));
    var cryptedText = CryptoJS.AES.encrypt(this.message, key);
    this.apiCalls.saveMes({message : String(cryptedText)} )
      .subscribe(data => {
        this.link = 'http:localhost:4200/message/' + (<any>data).data + '/' + key;
      });
  }

  generateKey(p){
    var salt = CryptoJS.lib.WordArray.random(128/8);
    return CryptoJS.PBKDF2(p, salt, { keySize: 512/32, iterations: 1000 });     
}

}
