webpackJsonp([0],{

/***/ 122:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_api_ai_javascript__ = __webpack_require__(571);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__speechservice__ = __webpack_require__(255);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { email } from "emailjs/email";



var ChatPage = (function () {
    function ChatPage(navCtrl, _http, speechRecognitionService) {
        this.navCtrl = navCtrl;
        this._http = _http;
        this.speechRecognitionService = speechRecognitionService;
        this.url = 'https://pacific-shelf-28291.herokuapp.com';
        this.freeText = '';
        this.chatList = [];
        this.prePopulateArray = [];
        this.isPopulateDataAvaialble = false;
        this.prePopulateType = '';
        this.disableInput = false;
        this.isEnable = false;
        this.selectedCoverages = '';
        this.selectionData = [];
        this.selectionType = '';
        this.client = new __WEBPACK_IMPORTED_MODULE_4_api_ai_javascript__["a" /* ApiAiClient */]({ accessToken: 'd03ed97ae4914599ad08c28082341944' });
        this.showSearchButton = true;
    }
    ChatPage.prototype.ngOnInit = function () {
        this.disableInput = false;
        this.sendMessage('Hi');
        this.getData(this.url + "/api/getVehicles").subscribe(function (data) { console.log('vehicles'); });
        this.getData(this.url + "/api/getCoverages").subscribe(function (data) { console.log('coverages'); });
    };
    ChatPage.prototype.ngAfterViewChecked = function () {
        this.scrollToBottom();
    };
    ChatPage.prototype.ngOnDestroy = function () {
        this.speechRecognitionService.DestroySpeechObject();
    };
    ChatPage.prototype.activateSpeechSearchMovie = function () {
        var _this = this;
        if (this.showSearchButton && this.isEnable) {
            this.showSearchButton = false;
            this.speechRecognitionService.record()
                .subscribe(
            //listener
            function (value) {
                _this.freeText = value;
                _this.showSearchButton = true;
                console.log(value);
            }, 
            //errror
            function (err) {
                console.log(err);
                if (err.error == "no-speech") {
                    console.log("--restatring service--");
                    _this.activateSpeechSearchMovie();
                }
            }, 
            //completion
            function () {
                _this.showSearchButton = true;
                console.log("--complete--");
                _this.activateSpeechSearchMovie();
            });
        }
    };
    ChatPage.prototype.addText = function ($event) {
        if ($event.keyCode == "13") {
            this.addTextButton();
        }
    };
    ChatPage.prototype.addTextButton = function () {
        if (this.freeText.length > 0) {
            this.chatList.push({ id: this.chatList.length + 1, text: this.freeText, time: this.getTime(), sent: true });
            this.sendMessage(this.freeText);
        }
    };
    ChatPage.prototype.onSelection = function (event, item) {
        if (this.disableInput) {
            if (item.text == 'Quit') {
                window.alert('Thank you');
            }
            else {
                this.chatList = [];
                this.selectionData = [];
                this.showSearchButton = true;
                this.ngOnInit();
            }
        }
        else {
            this.chatList.push({ id: this.chatList.length + 1, text: item.text, time: this.getTime(), sent: true });
            this.sendMessage(item.text);
        }
    };
    ChatPage.prototype.createBody = function () {
        var table = '<table style="border-collapse: collapse;width: 100%;">';
        for (var _i = 0, _a = this.selectionData; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.type) {
                table = table + '<tr style="background-color: #f2f2f2"><td style="text-align: left;padding: 8px;border: 1px solid black;">' + item.type + '</td><td style="text-align: left;padding: 8px;border: 1px solid black;">' + item.text + '</td></tr>';
            }
        }
        table = table + '</table>';
        return table;
    };
    ChatPage.prototype.isEven = function (n) {
        n = Number(n);
        return n === 0 || !!(n && !(n % 2));
    };
    ChatPage.prototype.createEmailBody = function () {
        var table = '';
        var index = 0;
        for (var _i = 0, _a = this.selectionData; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.type) {
                if (item.type != 'Quoted value') {
                    if (!this.isEven(index + 1)) {
                        table = table + '<tr><td style="text-align: left;font-size: 1.2em;line-height: 3.4em;background: #EEEEEE;padding-left: 10px;width: 20%;">' + item.type + '</td><td style="text-align: left;font-size: 1.2em;line-height: 3.4em;background: #EEEEEE;padding-left: 10px;width: 60%;">' + item.text + '</td></tr>';
                    }
                    else {
                        table = table + '<tr><td style="text-align: left;font-size: 1.2em;line-height: 3.4em;padding-left: 10px;width: 20%;">' + item.type + '</td><td style="text-align: left;font-size: 1.2em;line-height: 3.4em;padding-left: 10px;width: 60%;">' + item.text + '</td></tr>';
                    }
                    item.text;
                }
                else if (item.type === 'Quoted value') {
                    var quoteOffereed = item.text === "$1,000 - Monthly" ? '$50' : (item.text === "$2,500 - Quaterly (save $500)" ? '$125' : '$4,50');
                    var total = item.text === "$1,000 - Monthly" ? '$1,050 - Monthly' : (item.text === "$2,500 - Quaterly (save $500)" ? '$2,625 - Quaterly' : '$9,450 - Yearly');
                    table = table + '<tr><td style="padding-left: 10px;text-align:left;border-top: 1px solid #C1CED9;border-top: 1px solid #C1CED9;font-size: 1.2em;line-height: 3.4em;background: #EEEEEE;">Covergaed Quote Value</td><td style="text-align: left;border-top: 1px solid #C1CED9;font-size: 1.2em;border-top: 1px solid #C1CED9;line-height: 3.4em;background: #EEEEEE;padding-left: 5%;">' + item.text + '</td></tr><tr><td  style="padding-left: 10px;text-align:left;border-top: 1px solid #C1CED9;border-top: 1px solid #C1CED9;font-size: 1.2em;line-height: 3.4em;">TAX 5%</td><td style="text-align: left;border-top: 1px solid #C1CED9;font-size: 1.2em;border-top: 1px solid #C1CED9;line-height: 3.4em;padding-left: 5%;">' + quoteOffereed + '</td></tr><tr><td style="padding-left: 10px;text-align:left;border-top: 1px solid #C1CED9;border-top: 1px solid #C1CED9;font-size: 1.2em;line-height: 3.4em;background: #EEEEEE;">GRAND TOTAL</td><td style="text-align: left;border-top: 1px solid #C1CED9;font-size: 1.2em;border-top: 1px solid #C1CED9;line-height: 3.4em;background: #EEEEEE;padding-left: 5%;">' + total + '</td></tr>';
                }
                index++;
            }
        }
        return table;
    };
    ChatPage.prototype.checkList = function (data, type) {
        this.prePopulateType = type;
        this.isPopulateDataAvaialble = true;
        this.prePopulateArray = data;
    };
    ChatPage.prototype.sendMessage = function (message) {
        var _this = this;
        this.showSearchButton = true;
        this.isEnable = false;
        this.speechRecognitionService.DestroySpeechObject();
        this.isPopulateDataAvaialble = false;
        this.prePopulateArray = [];
        this.selectionData.push({ type: this.selectionType, text: message });
        this.selectionType = '';
        var checkCorporationStatus = false;
        if (this.chatList.length >= 2) {
            if (this.chatList[this.chatList.length - 2].text == 'Sure, I will be able to assist you with that. To begin with, can you please provide your business name?') {
                checkCorporationStatus = true;
            }
        }
        this.client.textRequest(checkCorporationStatus ? message + ' corporation' : message)
            .then(function (response) {
            checkCorporationStatus = false;
            _this.chatList.push({ id: _this.chatList.length + 1, text: response.result.fulfillment.speech, time: _this.getTime(), sent: false });
            _this.freeText = '';
            if (response.result.action) {
                if (response.result.action.length > 0) {
                    if (response.result.action == "BusinessName") {
                        _this.selectionData.push({ type: response.result.action, text: response.result.resolvedQuery });
                        var data = [{ text: "BAP" }, { text: "BOP" }];
                        _this.checkList(data, 'button');
                    }
                    else if (response.result.action == "Address") {
                        _this.getData(_this.url + '/api/getChatMessages').subscribe(function (data) {
                            if (data) {
                                _this.selectionData.push({ type: response.result.action, text: response.result.resolvedQuery });
                                _this.checkList(data, 'button');
                            }
                        });
                    }
                    else if (response.result.action == "Coverages") {
                        _this.getData(_this.url + "/api/getCoverages").subscribe(function (data) {
                            _this.checkList(data, 'checkBoxList');
                        });
                    }
                    else if (response.result.action == "CoverageSelected") {
                        _this.radioSelected = '';
                        _this.selectionData.push({ type: 'Coverage selected', text: response.result.resolvedQuery });
                        var data = [{ text: '$1,000 - Monthly' }, { text: '$2,500 - Quaterly (save $500)' }, { text: '$9,000 - Yearly (save $3,000)' }];
                        _this.checkList(data, 'radio');
                    }
                    else if (response.result.action == "quoteSelection") {
                        _this.selectionData.push({ type: 'Quoted value', text: response.result.resolvedQuery });
                    }
                    else if (response.result.action == "emailConfirmation") {
                        _this.disableInput = true;
                        var data = [{ text: "Start over new chat" }, { text: "Quit" }];
                        _this.checkList(data, 'button');
                        var subject = ('Coverage Details');
                        var table = _this.createBody();
                        var table1 = _this.createEmailBody();
                        var xyz = '<body style="border: 1px soild grey;width:100%;height:100%;overflow-y: auto; padding-left: 5%;padding-right: 5%;padding-top: 2%;"><h1 style="width:100%;background:blue;color:white;display: table;clear: both; text-align:center;font-family: Junge;font-size: 2.4em;line-height: 1.4em;font-weight: normal;text-align: center;"> Insurance Coverage Details</h1><p style="padding-left:20px;">Good Day! </p><p style="padding-left:20px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;We are glad to help you in quoting your policy. </p>' +
                            '<p style="padding-left:20px;">Below are the details captured from our conversation, Please reply to us if anything needs to be correted or missing.</p><table style="margin-left:10%;width: 80%;margin-bottom: 30px;"><thead><tr><th style="text-align: left;padding: 5px 20px;color: #5D6975;border-bottom: 1px solid #C1CED9;white-space: nowrap; font-weight: normal;line-height: 1.4em;font-size: 1.6em">Classification</th><th style="text-align: left;padding: 5px 20px;color: #5D6975;border-bottom: 1px solid #C1CED9;white-space: nowrap; font-weight: normal;line-height: 1.4em;font-size: 1.6em">Values</th>' +
                            '</tr></thead><tbody>' + table1 + '</tbody></table><p>Please contact our team on below address or else you contact through email/phone on below details.</p>' +
                            '<div id="details" style="display: table;clear: both;"><div style="float: left;"><div style="padding-right: 10px;height: 30px;display: inline-block;text-align: center;line-height: 30px;vertical-align: middle;"><span>Company Name:   </span>Insurance Company</div><br/>' +
                            '<div style="padding-right: 10px;height: 30px;display: inline-block;text-align: center;line-height: 30px;vertical-align: middle;"><span>Address:   </span>455 Foggy Heights, AZ 85004, US</div><br/><div style="padding-right: 10px;height: 30px;display: inline-block;text-align: center;line-height: 30px;vertical-align: middle;"><span>Phone:   </span>(602) 111-0000</div><br/><div style="padding-right: 10px;height: 30px;display: inline-block;text-align: center;line-height: 30px;vertical-align: middle;"><span>Email:   </span> <a href="mailto:john@example.com">company@example.com</a></div><br/>' +
                            '</div></div><div id="notices"><div>NOTICE:</div><div class="notice">A finance charge of 1.5% will be made on unpaid balances after 30 days.</div></div></body>';
                        var body = ('<html><head>Good Day! </head><p>Below are the details captured from our conversation, Please reply to us if anything needs to be correted or missing</p>' + table + '<p>We will get back to you soon.</p></html>');
                        var objectBody = [{
                                "name": "Marcus Frankbutter",
                                "toEmail": _this.chatList[_this.chatList.length - 2].text,
                                "subject": subject,
                                "body": body
                            }];
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
                        _this.sendEmail({ params: objectBody }, file).subscribe(function (data) {
                            console.log('mail sent');
                        });
                    }
                    else if (response.result.action == "Make") {
                        _this.getData(_this.url + "/api/getVehicles").subscribe(function (data) {
                            _this.selectionData.push({ type: response.result.action, text: response.result.resolvedQuery });
                            _this.checkList(data, 'button');
                        });
                    }
                    else if (response.result.action != 'input.unknown') {
                        _this.selectionData.push({ type: response.result.action, text: response.result.resolvedQuery });
                    }
                }
            }
        })
            .catch(function (error) { });
    };
    ChatPage.prototype.scrollToBottom = function () {
        document.querySelector('.last-msg') ? document.querySelector('.last-msg').scrollIntoView() : void (0);
    };
    ChatPage.prototype.getTime = function () {
        var date = new Date();
        return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    };
    ChatPage.prototype.onRadioSelection = function (item, indx) {
        this.freeText = this.radioSelected;
    };
    ChatPage.prototype.onCheckBoxSelection = function (index) {
        var selectedArray = '';
        this.prePopulateArray[index].checked = !this.prePopulateArray[index].checked;
        for (var _i = 0, _a = this.prePopulateArray; _i < _a.length; _i++) {
            var key = _a[_i];
            if (key.checked === true) {
                selectedArray = selectedArray === '' ? key.text : selectedArray + ', ' + key.text;
            }
        }
        this.freeText = selectedArray;
    };
    ChatPage.prototype.getData = function (getUrl) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]();
        var url = getUrl;
        myHeaders.append('x-apikey', '475c35720b2d03bae18ce68095778adf0e782');
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* RequestOptions */]({ headers: myHeaders });
        return this._http.get(url, options).map(this.extractData).catch(this.handleError);
    };
    ChatPage.prototype.extractData = function (res) {
        var body = res.json();
        if (body.result && body.result.response) {
            return { result: body.result.response };
        }
        else {
            return body;
        }
    };
    ;
    ChatPage.prototype.handleError = function (error) {
        if (error.status == 404) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].throw(error);
        }
        else {
            var errObj = void 0, errorJSON = void 0;
            errorJSON = error.json();
            errObj = errorJSON.error || errorJSON;
            errObj.status = error.status;
            errObj.statusText = error.statusText;
            return __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].throw(errObj);
        }
    };
    ;
    ChatPage.prototype.sendEmail = function (params, file) {
        var url = this.url + '/api/sendEmail';
        var fd = new FormData(); // To carry on your data  
        fd.append('file', file);
        fd.append('body', JSON.stringify(params));
        return this._http.post(url, fd)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].throw(error.json().error || 'Server error');
        });
    };
    ChatPage.prototype.post = function (data, method, handler) {
        var body = { id: '1', method: method, params: data, jsonrpc: '2.0' };
        var requestPayload = JSON.stringify(body);
        var url = this.url + '/api/' + handler;
        return this._http.post(url, requestPayload)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].throw(error.json().error || 'Server error');
        });
    };
    return ChatPage;
}());
ChatPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'chat-page',template:/*ion-inline-start:"C:\MyDrive\finalapp\ionicappchatbox\src\pages\chatbox\chatpage.html"*/' <ion-header>\n\n      <ion-navbar>\n\n        <ion-title>Virtual Agent</ion-title>\n\n      </ion-navbar>\n\n    </ion-header>\n\n  <ion-content class="chat-connent">\n\n    <ion-list no-lines>\n\n      <ion-item class="content-background" *ngFor="let message of chatList; let i = index" >\n\n        <div  [ngClass]="{\'last-msg\': i == chatList.length-1}">\n\n          <div class="msj-rta macro" *ngIf="message.sent">\n\n            <div class="text text-r">\n\n              <p>{{ message.text }}</p>\n\n              <p class="align-right"><small>{{ message.time }}</small></p>\n\n            </div>\n\n            <div class="avatar" style="padding:0px 0px 0px 50px !important">\n\n              <img class="img-circle"  src="../../assets/icon/Webp.net-resizeimage.png">\n\n            </div>\n\n          </div>\n\n          <div class="msj macro" *ngIf="!message.sent">\n\n            <div class="avatar">\n\n              <img class="img-circle" src="../../assets/icon/Webp.net-resizeimage.png">\n\n            </div>\n\n            <div class="text text-l">\n\n              <p>{{ message.text }}</p>\n\n              <p style="text-align: right;"><small>{{ message.time }}</small></p>\n\n            </div>\n\n          </div>\n\n        </div>\n\n      </ion-item>\n\n    </ion-list>\n\n  </ion-content>\n\n  <ion-footer>\n\n      <ion-toolbar *ngIf="isPopulateDataAvaialble">\n\n        <div *ngIf="prePopulateType == \'button\'">\n\n          <span *ngFor="let item of prePopulateArray">\n\n            <button class="selection-button" (click)="onSelection($event, item)">{{item.text}}</button>\n\n          </span>\n\n        </div>\n\n        <div *ngIf="prePopulateType == \'checkBoxList\'">\n\n          <ion-list no-lines >\n\n            <ion-item no-lines *ngFor="let item of prePopulateArray; let indx = index;">\n\n              <ion-label>{{item.text}}</ion-label>\n\n              <ion-checkbox (click)="onCheckBoxSelection(indx)"></ion-checkbox>\n\n            </ion-item>\n\n          </ion-list>\n\n        </div>\n\n        <div *ngIf="prePopulateType == \'radio\'">\n\n          <ion-list radio-group  [(ngModel)]="radioSelected">\n\n            <ion-item no-lines  *ngFor="let item of prePopulateArray; let indx = index;">\n\n              <ion-radio value="{{item.text}}" (click)="onRadioSelection(item, indx)"></ion-radio>\n\n              <ion-label>{{item.text}}</ion-label>\n\n            </ion-item>\n\n          </ion-list>\n\n        </div>\n\n      </ion-toolbar>\n\n      <ion-toolbar>\n\n        <input class="input-text" [disabled]="disableInput" type="text"  placeholder="Type your message" (keydown)="addText($event)" [(ngModel)]="freeText" />\n\n        <ion-buttons end>\n\n          <button ion-button icon-right color="royal" (click)="addTextButton()">Send<ion-icon name="send"></ion-icon></button>\n\n          <button id="start_button" [disabled]="!showSearchButton" (click)="isEnable = true;activateSpeechSearchMovie();" style="display: inline-block;background: white;">\n\n              <img alt="Start" id="start_img" *ngIf="!showSearchButton" src="https://www.google.com/intl/en/chrome/assets/common/images/content/mic-animate.gif">\n\n              <img alt="Start" id="start_img" *ngIf="showSearchButton" src="https://www.google.com/intl/en/chrome/assets/common/images/content/mic.gif">\n\n          </button>\n\n        </ion-buttons>\n\n      </ion-toolbar>\n\n    </ion-footer>\n\n  \n\n  '/*ion-inline-end:"C:\MyDrive\finalapp\ionicappchatbox\src\pages\chatbox\chatpage.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__speechservice__["a" /* SpeechRecognitionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__speechservice__["a" /* SpeechRecognitionService */]) === "function" && _c || Object])
], ChatPage);

var _a, _b, _c;
//# sourceMappingURL=chatpage.js.map

/***/ }),

/***/ 138:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 138;

/***/ }),

/***/ 181:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 181;

/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chatbox_chatpage__ = __webpack_require__(122);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomePage = (function () {
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    HomePage.prototype.redirectToChatBox = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__chatbox_chatpage__["a" /* ChatPage */]);
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"C:\MyDrive\finalapp\ionicappchatbox\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar>\n    <!-- <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button> -->\n    <ion-title>Welcome</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <!-- <h3>Chat Box</h3> -->\n\n  <p>\n    To chat with please click here link, So we will be happy to help you. <a (click)="redirectToChatBox()" >Click here</a> will show you the way.\n  </p>\n\n  <!-- <button ion-button secondary menuToggle>Toggle Menu</button> -->\n</ion-content>\n'/*ion-inline-end:"C:\MyDrive\finalapp\ionicappchatbox\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 255:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpeechRecognitionService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__(577);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SpeechRecognitionService = (function () {
    function SpeechRecognitionService(zone) {
        this.zone = zone;
    }
    SpeechRecognitionService.prototype.record = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].create(function (observer) {
            var webkitSpeechRecognition = window.webkitSpeechRecognition;
            _this.speechRecognition = new webkitSpeechRecognition();
            _this.speechRecognition.continuous = true;
            //this.speechRecognition.interimResults = true;
            _this.speechRecognition.lang = 'en-us';
            _this.speechRecognition.maxAlternatives = 1;
            _this.speechRecognition.onresult = function (speech) {
                var term = "";
                if (speech.results) {
                    var result = speech.results[speech.resultIndex];
                    var transcript = result[0].transcript;
                    if (result.isFinal) {
                        if (result[0].confidence < 0.3) {
                            console.log("Unrecognized result - Please try again");
                        }
                        else {
                            term = __WEBPACK_IMPORTED_MODULE_2_lodash__["trim"](transcript);
                            console.log("Did you said? -> " + term + " , If not then say something else...");
                        }
                    }
                }
                _this.zone.run(function () {
                    observer.next(term);
                });
            };
            _this.speechRecognition.onerror = function (error) {
                observer.error(error);
            };
            _this.speechRecognition.onend = function () {
                observer.complete();
            };
            _this.speechRecognition.start();
            console.log("Say something - We are listening !!!");
        });
    };
    SpeechRecognitionService.prototype.DestroySpeechObject = function () {
        if (this.speechRecognition)
            this.speechRecognition.stop();
    };
    return SpeechRecognitionService;
}());
SpeechRecognitionService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */]) === "function" && _a || Object])
], SpeechRecognitionService);

var _a;
//# sourceMappingURL=speechservice.js.map

/***/ }),

/***/ 256:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListPage = ListPage_1 = (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ListPage_1, {
            item: item
        });
    };
    return ListPage;
}());
ListPage = ListPage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-list',template:/*ion-inline-start:"C:\MyDrive\finalapp\ionicappchatbox\src\pages\list\list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      <ion-icon [name]="item.icon" item-left></ion-icon>\n      {{item.title}}\n      <div class="item-note" item-right>\n        {{item.note}}\n      </div>\n    </button>\n  </ion-list>\n  <div *ngIf="selectedItem" padding>\n    You navigated here from <b>{{selectedItem.title}}</b>\n  </div>\n</ion-content>\n'/*ion-inline-end:"C:\MyDrive\finalapp\ionicappchatbox\src\pages\list\list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
], ListPage);

var ListPage_1;
//# sourceMappingURL=list.js.map

/***/ }),

/***/ 257:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(262);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 262:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_chatbox_chatpage__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_list_list__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_pdf_pdf__ = __webpack_require__(579);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_chatbox_speechservice__ = __webpack_require__(255);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_chatbox_chatpage__["a" /* ChatPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_list_list__["a" /* ListPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_pdf_pdf__["a" /* PDFPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */]),
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_chatbox_chatpage__["a" /* ChatPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_list_list__["a" /* ListPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_pdf_pdf__["a" /* PDFPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_11__pages_chatbox_speechservice__["a" /* SpeechRecognitionService */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_chatbox_chatpage__ = __webpack_require__(122);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_chatbox_chatpage__["a" /* ChatPage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'List', component: __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\MyDrive\finalapp\ionicappchatbox\src\app\app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"C:\MyDrive\finalapp\ionicappchatbox\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 579:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PDFPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var PDFPage = (function () {
    function PDFPage() {
    }
    return PDFPage;
}());
PDFPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'pdf-page',template:/*ion-inline-start:"C:\MyDrive\finalapp\ionicappchatbox\src\pages\pdf\pdf.html"*/'<body style="border: 1px soild grey;width:100%;height:100%;overflow-y: auto; padding-left: 5%;padding-right: 5%;padding-top: 2%;">\n\n    <h1 style="width:100%;background:blue;color:white;display: table;clear: both; text-align:center;font-family: Junge;font-size: 2.4em;line-height: 1.4em;font-weight: normal;text-align: center;"> Insurance Coverage Details</h1>\n\n    <p style="padding-left:20px;">Good Day! </p>\n\n    <p style="padding-left:20px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad We are glad. </p>\n\n    <p style="padding-left:20px;">Below are the details captured from our conversation, Please reply to us if anything needs to be correted or missing.</p>\n\n    <table style="margin-left:10%;width: 80%;margin-bottom: 30px;">\n\n        <thead>\n\n            <tr>\n\n                <th style="text-align: left;padding: 5px 20px;color: #5D6975;border-bottom: 1px solid #C1CED9;white-space: nowrap; font-weight: normal;line-height: 1.4em;font-size: 1.6em">Classification</th>\n\n                <th style="text-align: left;padding: 5px 20px;color: #5D6975;border-bottom: 1px solid #C1CED9;white-space: nowrap; font-weight: normal;line-height: 1.4em;font-size: 1.6em">Values</th>\n\n            </tr>\n\n        </thead>\n\n        <tbody>\n\n            <tr>\n\n                <td style="text-align: left;font-size: 1.2em;line-height: 3.4em;background: #EEEEEE;padding-left: 10px;width: 20%;">BusinessName</td>\n\n                <td style="text-align: left;font-size: 1.2em;line-height: 3.4em;background: #EEEEEE;padding-left: 10px;width: 60%;">del corporation</td>\n\n            </tr>\n\n            <tr>\n\n                <td style="text-align: left;font-size: 1.2em;line-height: 3.4em;padding-left: 10px;width: 20%;">LobSelection</td>\n\n                <td style="text-align: left;font-size: 1.2em;line-height: 3.4em;padding-left: 10px;width: 60%;">BAP</td>\n\n            </tr>\n\n            <tr>\n\n                <td style="text-align: left;font-size: 1.2em;line-height: 3.4em;background: #EEEEEE;padding-left: 10px;width: 20%;">Coverage selected</td>\n\n                <td style="text-align: left;font-size: 1.2em;line-height: 3.4em;background: #EEEEEE;padding-left: 10px;width: 60%;">Liability Coverage</td>\n\n            </tr>\n\n            <tr>\n\n                <td style="padding-left: 10px;text-align:left;border-top: 1px solid #C1CED9;border-top: 1px solid #C1CED9;font-size: 1.2em;line-height: 3.4em;background: #EEEEEE;">Covergaed Quote Value</td>\n\n                <td style="text-align: left;border-top: 1px solid #C1CED9;font-size: 1.2em;border-top: 1px solid #C1CED9;line-height: 3.4em;background: #EEEEEE;padding-left: 5%;">$ 900</td>\n\n            </tr>\n\n            <tr><td  style="padding-left: 10px;text-align:left;border-top: 1px solid #C1CED9;border-top: 1px solid #C1CED9;font-size: 1.2em;line-height: 3.4em;">TAX 25%</td>\n\n                <td style="text-align: left;border-top: 1px solid #C1CED9;font-size: 1.2em;border-top: 1px solid #C1CED9;line-height: 3.4em;padding-left: 5%;">$1,300.00</td>\n\n            </tr>\n\n            <tr>\n\n                <td style="padding-left: 10px;text-align:left;border-top: 1px solid #C1CED9;border-top: 1px solid #C1CED9;font-size: 1.2em;line-height: 3.4em;background: #EEEEEE;">GRAND TOTAL</td>\n\n                <td style="text-align: left;border-top: 1px solid #C1CED9;font-size: 1.2em;border-top: 1px solid #C1CED9;line-height: 3.4em;background: #EEEEEE;padding-left: 5%;">$6,500.00</td>\n\n            </tr>\n\n        </tbody>\n\n    </table><p>Please contact our team on below address or else you contact through email/phone on below details.</p><div id="details" style="display: table;clear: both;"><div style="float: left;"><div style="padding-right: 10px;height: 30px;display: inline-block;text-align: center;line-height: 30px;vertical-align: middle;"><span>Company Name:   </span>Insurance Company</div><br/><div style="padding-right: 10px;height: 30px;display: inline-block;text-align: center;line-height: 30px;vertical-align: middle;"><span>Address:   </span>455 Foggy Heights, AZ 85004, US</div><br/><div style="padding-right: 10px;height: 30px;display: inline-block;text-align: center;line-height: 30px;vertical-align: middle;"><span>Phone:   </span>(602) 111-0000</div><br/><div style="padding-right: 10px;height: 30px;display: inline-block;text-align: center;line-height: 30px;vertical-align: middle;"><span>Email:   </span> <a href="mailto:john@example.com">company@example.com</a></div><br/></div></div><div id="notices"><div>NOTICE:</div><div class="notice">A finance charge of 1.5% will be made on unpaid balances after 30 days.</div></div></body>'/*ion-inline-end:"C:\MyDrive\finalapp\ionicappchatbox\src\pages\pdf\pdf.html"*/
    })
], PDFPage);

//# sourceMappingURL=pdf.js.map

/***/ })

},[257]);
//# sourceMappingURL=main.js.map