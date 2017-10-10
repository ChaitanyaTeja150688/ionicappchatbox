import { Component, AfterViewChecked, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';
//import { email } from "emailjs/email";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ApiAiClient } from "api-ai-javascript";
import { SpeechRecognitionService } from './speechservice';

declare let jsPDF;

@Component({
  selector: 'chat-page',
  templateUrl: 'chatpage.html'
})
export class ChatPage implements AfterViewChecked, OnInit{
  constructor(public navCtrl: NavController, private _http: Http, private speechRecognitionService: SpeechRecognitionService) {
    this.client = new ApiAiClient({ accessToken: 'd03ed97ae4914599ad08c28082341944' });
    this.showSearchButton = true;
  }
  mandrillObject: any;
  url = 'https://pacific-shelf-28291.herokuapp.com';
  // url = 'http://ushydmehepatel7:8080';
  client: any;
  freeText: string = '';
  chatList= [];
  prePopulateArray = [];
  isPopulateDataAvaialble = false;
  prePopulateType = '';
  showSearchButton: boolean;
  disableInput: boolean = false;
  ngOnInit(){
    this.disableInput = false;
    this.sendMessage('Hi');
    this.getData(this.url + "/api/getVehicles").subscribe(data => { console.log('vehicles'); });
    this.getData(this.url + "/api/getCoverages").subscribe(data => { console.log('coverages'); });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnDestroy() {
    this.speechRecognitionService.DestroySpeechObject();
  }
  isEnable: boolean = false;
  activateSpeechSearchMovie(): void {
    if(this.showSearchButton && this.isEnable) {
      this.showSearchButton = false;
      this.speechRecognitionService.record()
        .subscribe(
        //listener
        (value) => {
            this.freeText = value;
            this.showSearchButton = true;
            console.log(value);
        },
        //errror
        (err) => {
            console.log(err);
            if (err.error == "no-speech") {
                console.log("--restatring service--");
                this.activateSpeechSearchMovie();
            }
        },
        //completion
        () => {
            this.showSearchButton = true;
            console.log("--complete--");
            this.activateSpeechSearchMovie();
        }
      );
    }
}

  addText($event){
    if($event.keyCode=="13"){
      this.addTextButton();
    }
  }

  addTextButton(){
    if(this.freeText.length > 0){
      this.chatList.push({id:this.chatList.length+1, text:this.freeText,time: this.getTime(), sent:true});
      this.sendMessage(this.freeText);
    }
  }

  selectedCoverages: string = '';
  onSelection(event: any, item): void {
    if(this.disableInput) {
      if(item.text == 'Quit'){
        window.alert('Thank you');
      } else {
        this.chatList = [];
        this.selectionData = [];
        this.showSearchButton = true;
        this.ngOnInit();
      }
    } else {
      this.chatList.push({id:this.chatList.length+1, text:item.text,time: this.getTime(), sent:true});
      this.sendMessage(item.text);
    }
  }

  createBody(){
    let table = '<table style="border-collapse: collapse;width: 100%;">'
    for(let item of this.selectionData){
      if(item.type){
        table = table + '<tr style="background-color: #f2f2f2"><td style="text-align: left;padding: 8px;border: 1px solid black;">' + item.type + '</td><td style="text-align: left;padding: 8px;border: 1px solid black;">' + item.text + '</td></tr>';
      }
    }
    table = table + '</table>';
    return table;
  }

  isEven(n) {
    n = Number(n);
    return n === 0 || !!(n && !(n%2));
  }

  createEmailBody(){
    let table = ''
    let index = 0;
    for(let item of this.selectionData){
      if(item.type){
        if(item.type != 'Quoted value'){
          if(!this.isEven(index+1)){
            table = table + '<tr><td style="text-align: left;font-size: 1.2em;line-height: 3.4em;background: #EEEEEE;padding-left: 10px;width: 20%;">' + item.type + '</td><td style="text-align: left;font-size: 1.2em;line-height: 3.4em;background: #EEEEEE;padding-left: 10px;width: 60%;">' + item.text + '</td></tr>';
          }
          else{
            table = table + '<tr><td style="text-align: left;font-size: 1.2em;line-height: 3.4em;padding-left: 10px;width: 20%;">' + item.type + '</td><td style="text-align: left;font-size: 1.2em;line-height: 3.4em;padding-left: 10px;width: 60%;">' + item.text + '</td></tr>';
          }item.text
        }
        else if(item.type === 'Quoted value'){
          let quoteOffereed = item.text === "$1,000 - Monthly" ? '$50' : (item.text === "$2,500 - Quaterly (save $500)" ? '$125' : '$4,50');
          let total = item.text === "$1,000 - Monthly" ? '$1,050 - Monthly' : (item.text === "$2,500 - Quaterly (save $500)" ? '$2,625 - Quaterly' : '$9,450 - Yearly');
          table = table + '<tr><td style="padding-left: 10px;text-align:left;border-top: 1px solid #C1CED9;border-top: 1px solid #C1CED9;font-size: 1.2em;line-height: 3.4em;background: #EEEEEE;">Covergaed Quote Value</td><td style="text-align: left;border-top: 1px solid #C1CED9;font-size: 1.2em;border-top: 1px solid #C1CED9;line-height: 3.4em;background: #EEEEEE;padding-left: 5%;">'+ item.text +'</td></tr><tr><td  style="padding-left: 10px;text-align:left;border-top: 1px solid #C1CED9;border-top: 1px solid #C1CED9;font-size: 1.2em;line-height: 3.4em;">TAX 5%</td><td style="text-align: left;border-top: 1px solid #C1CED9;font-size: 1.2em;border-top: 1px solid #C1CED9;line-height: 3.4em;padding-left: 5%;">' + quoteOffereed + '</td></tr><tr><td style="padding-left: 10px;text-align:left;border-top: 1px solid #C1CED9;border-top: 1px solid #C1CED9;font-size: 1.2em;line-height: 3.4em;background: #EEEEEE;">GRAND TOTAL</td><td style="text-align: left;border-top: 1px solid #C1CED9;font-size: 1.2em;border-top: 1px solid #C1CED9;line-height: 3.4em;background: #EEEEEE;padding-left: 5%;">'+ total +'</td></tr>';
        }
        index++;
      }
    }
    return table;
  }

  checkList(data, type) {
    this.prePopulateType = type;
    this.isPopulateDataAvaialble = true;
    this.prePopulateArray = data;
  }

  selectionData = [];
  selectionType = '';
  sendMessage(message){
    this.showSearchButton = true;
    this.isEnable = false;
    this.speechRecognitionService.DestroySpeechObject();
    this.isPopulateDataAvaialble = false;
    this.prePopulateArray = [];
    this.selectionData.push({type:this.selectionType, text: message});
    this.selectionType = '';
    let checkCorporationStatus = false;
    if(this.chatList.length >= 2) {
      if(this.chatList[this.chatList.length-2].text == 'Sure, I will be able to assist you with that. To begin with, can you please provide your business name?') {
        checkCorporationStatus = true;
      }
    }
    this.client.textRequest(checkCorporationStatus ? message + ' corporation' :  message)
    .then((response) => {
      checkCorporationStatus = false;
      this.chatList.push({id:this.chatList.length+1, text:response.result.fulfillment.speech,time: this.getTime(), sent:false});
      this.freeText = '';
      if(response.result.action){
        if(response.result.action.length > 0){
          if (response.result.action == "BusinessName") {
            this.selectionData.push({type:response.result.action, text: response.result.resolvedQuery});
            let data = [{ text: "BAP" }, { text: "BOP" }];
            this.checkList(data, 'button');
          }
          else if(response.result.action == "Address"){
            this.getData(this.url +'/api/getChatMessages').subscribe((data) => {
              if (data) {
                this.selectionData.push({type:response.result.action, text: response.result.resolvedQuery});
                this.checkList(data, 'button');
              }
            });
          }
          else if (response.result.action == "Coverages") {
            this.getData(this.url + "/api/getCoverages").subscribe(data => {
              this.checkList(data, 'checkBoxList');
            });
          }
          else if (response.result.action == "CoverageSelected") {
            this.radioSelected = '';
            this.selectionData.push({type:'Coverage selected', text: response.result.resolvedQuery});
            let data = [{ text: '$1,000 - Monthly'}, { text: '$2,500 - Quaterly (save $500)'},{ text:  '$9,000 - Yearly (save $3,000)'}];
            this.checkList(data, 'radio');
          }
          else if (response.result.action == "quoteSelection") {
            this.selectionData.push({type:'Quoted value', text: response.result.resolvedQuery});
          }
          else if (response.result.action == "emailConfirmation") {
            this.disableInput = true;
            let data = [{ text: "Start over new chat" }, { text: "Quit" }];
            this.checkList(data, 'button');
            let subject = ('Coverage Details');
            let table = this.createBody();
            let table1 = this.createEmailBody();
            let xyz = '<body style="border: 1px soild grey;width:100%;height:100%;overflow-y: auto; padding-left: 5%;padding-right: 5%;padding-top: 2%;"><h1 style="width:100%;background:blue;color:white;display: table;clear: both; text-align:center;font-family: Junge;font-size: 2.4em;line-height: 1.4em;font-weight: normal;text-align: center;"> Insurance Coverage Details</h1><p style="padding-left:20px;">Good Day! </p><p style="padding-left:20px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;We are glad to help you in quoting your policy. </p>' +
              '<p style="padding-left:20px;">Below are the details captured from our conversation, Please reply to us if anything needs to be correted or missing.</p><table style="margin-left:10%;width: 80%;margin-bottom: 30px;"><thead><tr><th style="text-align: left;padding: 5px 20px;color: #5D6975;border-bottom: 1px solid #C1CED9;white-space: nowrap; font-weight: normal;line-height: 1.4em;font-size: 1.6em">Classification</th><th style="text-align: left;padding: 5px 20px;color: #5D6975;border-bottom: 1px solid #C1CED9;white-space: nowrap; font-weight: normal;line-height: 1.4em;font-size: 1.6em">Values</th>' +
              '</tr></thead><tbody>' + table1 + '</tbody></table><p>Please contact our team on below address or else you contact through email/phone on below details.</p>' +
              '<div id="details" style="display: table;clear: both;"><div style="float: left;"><div style="padding-right: 10px;height: 30px;display: inline-block;text-align: center;line-height: 30px;vertical-align: middle;"><span>Company Name:   </span>Insurance Company</div><br/>' +
              '<div style="padding-right: 10px;height: 30px;display: inline-block;text-align: center;line-height: 30px;vertical-align: middle;"><span>Address:   </span>455 Foggy Heights, AZ 85004, US</div><br/><div style="padding-right: 10px;height: 30px;display: inline-block;text-align: center;line-height: 30px;vertical-align: middle;"><span>Phone:   </span>(602) 111-0000</div><br/><div style="padding-right: 10px;height: 30px;display: inline-block;text-align: center;line-height: 30px;vertical-align: middle;"><span>Email:   </span> <a href="mailto:john@example.com">company@example.com</a></div><br/>' +
              '</div></div><div id="notices"><div>NOTICE:</div><div class="notice">A finance charge of 1.5% will be made on unpaid balances after 30 days.</div></div></body>';
              
            let body = ('<html><head>Good Day! </head><p>Below are the details captured from our conversation, Please reply to us if anything needs to be correted or missing</p>'+ table +'<p>We will get back to you soon.</p></html>');
            let objectBody = [{
              "name": "Marcus Frankbutter",
              "toEmail": this.chatList[this.chatList.length-2].text,
              "subject": subject,
              "body": body
            }]
            // let doc = new jsPDF();
            // let elementHandler = {
            //   '#ignorePDF': function (element, renderer) {
            //     return true;
            //   }
            // };
            // doc.fromHTML(table,15,15,{
            //   'width': 180,'elementHandlers': elementHandler
            // });
            // let file = doc.output();
            var doc = new jsPDF("l", "pt", "letter");
            doc.fromHTML(xyz, 20, 20);
            var file = doc.output('blob');
            this.sendEmail({params : objectBody}, file).subscribe(
              data => {
                console.log('mail sent');
              }
            );
          }
          else if(response.result.action == "Make"){
            this.getData(this.url + "/api/getVehicles").subscribe(data => {
              this.selectionData.push({type:response.result.action, text: response.result.resolvedQuery});
              this.checkList(data, 'button');
            });
          }
          else if(response.result.action != 'input.unknown'){
            this.selectionData.push({type:response.result.action, text: response.result.resolvedQuery});
          }
        }
      }
    })
    .catch((error) => {/* do something here too */ });
  }

  scrollToBottom(): void {
    document.querySelector('.last-msg')?document.querySelector('.last-msg').scrollIntoView():void(0);
  }

  getTime(){
    let date = new Date();
    return date.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', hour12: true });
  }

  radioSelected: any;
  onRadioSelection(item, indx) {
    this.freeText = this.radioSelected;
  }
  
  onCheckBoxSelection(index){
    let selectedArray = '';
    this.prePopulateArray[index].checked = !this.prePopulateArray[index].checked;
    for(let key of this.prePopulateArray){
      if(key.checked === true){
          selectedArray = selectedArray === '' ? key.text : selectedArray + ', ' + key.text;
      }
    }
    this.freeText = selectedArray;
  }

  getData(getUrl): Observable<any[]> {
    let myHeaders = new Headers();
    let url = getUrl;
    myHeaders.append('x-apikey', '475c35720b2d03bae18ce68095778adf0e782');
    let options = new RequestOptions({ headers: myHeaders });
    return this._http.get(url, options).map(this.extractData).catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    if (body.result && body.result.response) {
      return { result: body.result.response };
    } else {
      return body;
    }
  };

  handleError(error: Response) {
    if (error.status == 404) {
      return Observable.throw(error);
    } else {
      let errObj, errorJSON;
      errorJSON = error.json();
      errObj = errorJSON.error || errorJSON;
      errObj.status = error.status;
      errObj.statusText = error.statusText;
      return Observable.throw(errObj);
    }
  };

  sendEmail(params, file): Observable<any> {
    let url = this.url + '/api/sendEmail';
    var fd = new FormData();     // To carry on your data  
    fd.append('file',file);
    fd.append('body', JSON.stringify(params));
    return this._http.post(url, fd)
    .map((res: Response) => {
      return res.json();
    })
    .catch((error: any) => {
      return Observable.throw(error.json().error || 'Server error');
    });
  }

  post(data, method, handler): Observable<any> {
    let body = { id: '1', method: method, params: data, jsonrpc: '2.0' }
    let requestPayload = JSON.stringify(body);
    let url = this.url + '/api/' + handler;
    return this._http.post(url, requestPayload)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => {
        return Observable.throw(error.json().error || 'Server error');
      });
  }

//   upgrade() {
//     //start_button.style.visibility = 'hidden';
//     //showInfo('info_upgrade');
//   }
//   final_transcript = '';
//   recognizing = false;
//   ignore_onend;
//   start_timestamp;
//   recognition: any;
//   checkWindow () {
//   let windowCheck = 'webkitSpeechRecognition' in window;
//   if (!windowCheck) {
//     // upgrade();
//   } else {
//     //start_button.style.display = 'inline-block';
//     this.recognition = new webkitSpeechRecognition();
//     this.recognition.continuous = true;
//     this.recognition.interimResults = true;
//     this.recognition.onstart = function() {
//       this.recognizing = true;
//       //this.showInfo('info_speak_now');
//       //start_img.src = 'mic-animate.gif';
//     };
//     // recognition.onerror = function(event) {
//     //   if (event.error == 'no-speech') {
//     //     start_img.src = 'mic.gif';
//     //     this.showInfo('info_no_speech');
//     //     ignore_onend = true;
//     //   }
//     //   if (event.error == 'audio-capture') {
//     //     start_img.src = 'mic.gif';
//     //     this.showInfo('info_no_microphone');
//     //     ignore_onend = true;
//     //   }
//     //   if (event.error == 'not-allowed') {
//     //     if (event.timeStamp - start_timestamp < 100) {
//     //       this.showInfo('info_blocked');
//     //     } else {
//     //       this.showInfo('info_denied');
//     //     }
//     //     ignore_onend = true;
//     //   }
//     // };
//     this.recognition.onend = function() {
//       this.recognizing = false;
//       if (this.ignore_onend) {
//         return;
//       }
//       //start_img.src = 'mic.gif';
//       if (!this.final_transcript) {
//         this.showInfo('info_start');
//         return;
//       }
//       this.showInfo('');
//       if (window.getSelection) {
//         window.getSelection().removeAllRanges();
//         var range = document.createRange();
//         range.selectNode(document.getElementById('final_span'));
//         window.getSelection().addRange(range);
//       }
//     };
//     this.recognition.onresult = function(event) {
//       var interim_transcript = '';
//       for (var i = event.resultIndex; i < event.results.length; ++i) {
//         if (event.results[i].isFinal) {
//           this.final_transcript += event.results[i][0].transcript;
//         } else {
//           interim_transcript += event.results[i][0].transcript;
//         }
//       }
//       //this.final_transcript = capitalize(this.final_transcript);
//       //final_span.innerHTML = linebreak(this.final_transcript);
//       //interim_span.innerHTML = linebreak(interim_transcript);
//       if (this.final_transcript || interim_transcript) {
//         //showButtons('inline-block');
//       }
//     };
//   }
// }

// showInfo(s) {
// //   if (s) {
// //     for (var child = info.firstChild; child; child = child.nextSibling) {
// //       if (child.style) {
// //         child.style.display = child.id == s ? 'inline' : 'none';
// //       }
// //     }
// //     info.style.visibility = 'visible';
// //   } else {
// //     info.style.visibility = 'hidden';
// //   }
//  }

//  startButton(event) {
//   if (this.recognizing) {
//     this.recognition.stop();
//     return;
//   }
//   this.final_transcript = '';
//   this.recognition.lang = 'English';
//   this.recognition.start();
//   this.ignore_onend = false;
// //  final_span.innerHTML = '';
//   //interim_span.innerHTML = '';
//   //start_img.src = 'mic-slash.gif';
//   this.showInfo('info_allow');
//   //this.showButtons('none');
//   //start_timestamp = event.timeStamp;
// }


}
