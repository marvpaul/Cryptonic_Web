import { Component, OnInit, Input} from '@angular/core';
import CryptoJS from 'crypto-js/crypto-js';
import { ApiCallsService } from '../api-calls.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.css']
})
export class CreateMessageComponent implements OnInit {
  message = ""; 
  link = ""; 


  lastCreatedMess = null;

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
    //Check if there is a certain time between last send mes and this one
    if(this.lastCreatedMess == null || (Date.now() - this.lastCreatedMess)/1000 > 10 ){
      if(this.message != ""){
        this.lastCreatedMess = Date.now();
      var key = String(this.generateKey(Math.random().toString()));
      var cryptedText = CryptoJS.AES.encrypt(this.message, key);
      this.apiCalls.saveMes({message : String(cryptedText)} )
        .subscribe(data => {
          this.link = window.location.href + 'message/' + (<any>data).data + '/' + key;
        });
      } else{
        swal("No text", "Please enter a text before sending a message!", "error");
      }
      
    } else{
      swal("Timeout", "Please wait 10 seconds after creating a message!", "warning");
    }
    
  }

  generateKey(p){
    var salt = CryptoJS.lib.WordArray.random(128/8);
    return CryptoJS.PBKDF2(p, salt, { keySize: 512/32, iterations: 1000 });     
}

}
