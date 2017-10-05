import { Component, AfterViewChecked, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';
//import { email } from "emailjs/email";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ApiAiClient } from "api-ai-javascript";

declare let jsPDF;

@Component({
  selector: 'chat-page',
  templateUrl: 'chatpage.html'
})
export class ChatPage implements AfterViewChecked, OnInit{
  constructor(public navCtrl: NavController, private _http: Http) {
    this.client = new ApiAiClient({ accessToken: 'd03ed97ae4914599ad08c28082341944' });
  }
  mandrillObject: any;
  url = 'https://pacific-shelf-28291.herokuapp.com';
  //url = 'http://ushydmehepatel7:8080';
  client: any;
  freeText: string = '';
  chatList= [];
  prePopulateArray = [];
  isPopulateDataAvaialble = false;
  prePopulateType = '';
  ngOnInit(){
    this.sendMessage('Hi');
    this.getData(this.url + "/api/getVehicles").subscribe(data => { console.log('vehicles'); });
    this.getData(this.url + "/api/getCoverages").subscribe(data => { console.log('coverages'); });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
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
    this.chatList.push({id:this.chatList.length+1, text:item.text,time: this.getTime(), sent:true});
    this.sendMessage(item.text);
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

  checkList(data, type) {
    this.prePopulateType = type;
    this.isPopulateDataAvaialble = true;
    this.prePopulateArray = data;
  }

  selectionData = [];
  selectionType = '';
  sendMessage(message){
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
            this.selectionData.push({type:'Coverage selected', text: response.result.resolvedQuery});
            let data = [{ text: '$ 300'}, { text: '$ 600'},{ text:  '$ 900'}];
            this.checkList(data, 'radio');
          }
          else if (response.result.action == "quoteSelection") {
            this.selectionData.push({type:'Quoted value', text: response.result.resolvedQuery});
          }
          else if (response.result.action == "emailConfirmation") {
            let subject = ('Coverage Details');
            let table = this.createBody();
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
            doc.fromHTML(table, 20, 20);
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
}
