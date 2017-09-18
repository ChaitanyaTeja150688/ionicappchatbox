import { Component, AfterViewChecked, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';
//import { email } from "emailjs/email";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ApiAiClient } from "api-ai-javascript";

@Component({
  selector: 'chat-page',
  templateUrl: 'chatpage.html'
})
export class ChatPage implements AfterViewChecked, OnInit{
  constructor(public navCtrl: NavController, private _http: Http) {
    this.client = new ApiAiClient({ accessToken: 'd03ed97ae4914599ad08c28082341944' });
    
  }
  url = 'https://pacific-shelf-28291.herokuapp.com';
  client: any;
  freeText: string = '';
  chatList= [];
  prePopulateArray = [];
  isPopulateDataAvaialble = false;
  prePopulateType = '';
  ngOnInit(){
    this.sendMessage('Hi');
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

  selectionData = [];
  selectionType = '';
  sendMessage(message){
    this.isPopulateDataAvaialble = false;
    this.prePopulateArray = [];
    this.selectionData.push({type:this.selectionType, text: message});
    this.selectionType = '';
    this.client.textRequest(message)
    .then((response) => {
      this.chatList.push({id:this.chatList.length+1, text:response.result.fulfillment.speech,time: this.getTime(), sent:false});
      this.freeText = '';
      if(response.result.action){
        if(response.result.action.length > 0){
          this.isPopulateDataAvaialble = true;
          if (response.result.action == "BusinessName") {
            this.selectionData.push({type:response.result.action, text: response.result.resolvedQuery});
            this.prePopulateType = 'button';
            this.prePopulateArray = [{ text: "BAP" }, { text: "BOP" }]
          }
          else if(response.result.action == "Address"){
            this.prePopulateType = 'button';
            this.getData(this.url +'/api/getChatMessages').subscribe((data) => {
              if (data) {
                this.selectionData.push({type:response.result.action, text: response.result.resolvedQuery});
                this.prePopulateArray = data;
              }
            });
          }
          else if (response.result.action == "Coverages") {
            this.prePopulateType = 'checkBoxList';
            this.getData(this.url + "/api/getCoverages").subscribe(data => {
              this.prePopulateArray = data;
            });
          }
          else if (response.result.action == "emailConfirmation") {
            // let email = ('testusertest1111@gmail.com');
            let subject = ('Coverage Details');
            let body = ('<html><head>Good Day</head><p>Below are the details captured from our converstaion, Please reply to us if anything needs to be correted or missing</p>'+ this.createBody() +'<p>We will get back to you soon.</p></html>');
            let params = {
              "name": "Marcus Frankbutter",
              "toEmail": this.chatList[this.chatList.length-2].text,
              "subject": subject,
              "body": body
            }
            this.sendEmail(params).subscribe(
              data => {
                console.log('mail sent');
              }
            );
          }
          else if(response.result.action == "Make"){
            this.getData(this.url + "/api/getVehicles").subscribe(data => {
              this.selectionData.push({type:response.result.action, text: response.result.resolvedQuery});
              this.prePopulateType = 'button';
              this.prePopulateArray = data;
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

  sendEmail(params): Observable<any> {
    return this.post([params], 'email', 'sendEmail').map(data => {
      return data.result;
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
