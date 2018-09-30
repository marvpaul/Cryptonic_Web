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
  loadingMessage = false;


  lastCreatedMess = null;

  constructor(private apiCalls: ApiCallsService) {
    
   }

   copyToClipboard(el) {

      // resolve the element
      el = (typeof el === 'string') ? document.querySelector(el) : el;

      // handle iOS as a special case
      if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {

          // save current contentEditable/readOnly status
          var editable = el.contentEditable;
          var readOnly = el.readOnly;

          // convert to editable with readonly to stop iOS keyboard opening
          el.contentEditable = true;
          el.readOnly = true;

          // create a selectable range
          var range = document.createRange();
          range.selectNodeContents(el);

          // select the range
          var selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
          el.setSelectionRange(0, 999999);

          // restore contentEditable/readOnly to original state
          el.contentEditable = editable;
          el.readOnly = readOnly;
      }
      else {
          el.select();
      }

      // execute copy command
      document.execCommand('copy');
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

  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

  sendMes(){
    //Check if there is a certain time between last send mes and this one
    if(this.lastCreatedMess == null || (Date.now() - this.lastCreatedMess)/1000 > 10 ){
      if(this.message != ""){
        this.loadingMessage = true; 
        this.lastCreatedMess = Date.now();
        setTimeout(function() {
          window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
        }, 300);
      var key = String(this.generateKey(Math.random().toString()));
      var cryptedText = CryptoJS.AES.encrypt(this.message, key);
      this.apiCalls.saveMes({message : String(cryptedText)} )
        .subscribe(data => {
          
          this.link = window.location.href + 'message/' + (<any>data).data + '/' + key;
          this.loadingMessage = false; 
          setTimeout(function() {
            window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
          }, 300);
          
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
