webpackJsonp([0],{

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

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chatbox_chatpage__ = __webpack_require__(228);
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
        selector: 'page-home',template:/*ion-inline-start:"C:\MyDrive\finalapp\ionicappchatbox\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Home</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h3>Chat Box</h3>\n\n  <p>\n    To chat with please click here link, So we will be happy to help you. <a (click)="redirectToChatBox()" >Click here</a> will show you the way.\n  </p>\n\n  <button ion-button secondary menuToggle>Toggle Menu</button>\n</ion-content>\n'/*ion-inline-end:"C:\MyDrive\finalapp\ionicappchatbox\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */]) === "function" && _a || Object])
], HomePage);

var _a;
//# sourceMappingURL=home.js.map

/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_api_ai_javascript__ = __webpack_require__(252);
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
    function ChatPage(navCtrl, _http) {
        this.navCtrl = navCtrl;
        this._http = _http;
        this.url = 'https://pacific-shelf-28291.herokuapp.com';
        this.freeText = '';
        this.chatList = [];
        this.prePopulateArray = [];
        this.isPopulateDataAvaialble = false;
        this.prePopulateType = '';
        this.selectedCoverages = '';
        this.selectionData = [];
        this.selectionType = '';
        this.client = new __WEBPACK_IMPORTED_MODULE_4_api_ai_javascript__["a" /* ApiAiClient */]({ accessToken: 'd03ed97ae4914599ad08c28082341944' });
    }
    ChatPage.prototype.ngOnInit = function () {
        this.sendMessage('Hi');
    };
    ChatPage.prototype.ngAfterViewChecked = function () {
        this.scrollToBottom();
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
        this.chatList.push({ id: this.chatList.length + 1, text: item.text, time: this.getTime(), sent: true });
        this.sendMessage(item.text);
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
    ChatPage.prototype.sendMessage = function (message) {
        var _this = this;
        this.isPopulateDataAvaialble = false;
        this.prePopulateArray = [];
        this.selectionData.push({ type: this.selectionType, text: message });
        this.selectionType = '';
        this.client.textRequest(message)
            .then(function (response) {
            _this.chatList.push({ id: _this.chatList.length + 1, text: response.result.fulfillment.speech, time: _this.getTime(), sent: false });
            _this.freeText = '';
            if (response.result.action) {
                if (response.result.action.length > 0) {
                    _this.isPopulateDataAvaialble = true;
                    if (response.result.action == "BusinessName") {
                        _this.selectionData.push({ type: response.result.action, text: response.result.resolvedQuery });
                        _this.prePopulateType = 'button';
                        _this.prePopulateArray = [{ text: "BAP" }, { text: "BOP" }];
                    }
                    else if (response.result.action == "Address") {
                        _this.prePopulateType = 'button';
                        _this.getData(_this.url + '/api/getChatMessages').subscribe(function (data) {
                            if (data) {
                                _this.selectionData.push({ type: response.result.action, text: response.result.resolvedQuery });
                                _this.prePopulateArray = data;
                            }
                        });
                    }
                    else if (response.result.action == "Coverages") {
                        _this.prePopulateType = 'checkBoxList';
                        _this.getData(_this.url + "/api/getCoverages").subscribe(function (data) {
                            _this.prePopulateArray = data;
                        });
                    }
                    else if (response.result.action == "emailConfirmation") {
                        // let email = ('testusertest1111@gmail.com');
                        var subject = ('Coverage Details');
                        var body = ('<html><head>Good Day</head><p>Below are the details captured from our converstaion, Please reply to us if anything needs to be correted or missing</p>' + _this.createBody() + '<p>We will get back to you soon.</p></html>');
                        var params = {
                            "name": "Marcus Frankbutter",
                            "toEmail": _this.chatList[_this.chatList.length - 2].text,
                            "subject": subject,
                            "body": body
                        };
                        _this.sendEmail(params).subscribe(function (data) {
                            console.log('mail sent');
                        });
                    }
                    else if (response.result.action == "Make") {
                        _this.getData(_this.url + "/api/getVehicles").subscribe(function (data) {
                            _this.selectionData.push({ type: response.result.action, text: response.result.resolvedQuery });
                            _this.prePopulateType = 'button';
                            _this.prePopulateArray = data;
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
    ChatPage.prototype.sendEmail = function (params) {
        return this.post([params], 'email', 'sendEmail').map(function (data) {
            return data.result;
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
        selector: 'chat-page',template:/*ion-inline-start:"C:\MyDrive\finalapp\ionicappchatbox\src\pages\chatbox\chatpage.html"*/' <ion-header>\n\n      <ion-navbar>\n\n        <button ion-button menuToggle>\n\n          <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-title>Chat Box</ion-title>\n\n      </ion-navbar>\n\n    </ion-header>\n\n  <ion-content class="chat-connent">\n\n    <ion-list no-lines>\n\n      <ion-item class="content-background" *ngFor="let message of chatList; let i = index" >\n\n        <div  [ngClass]="{\'last-msg\': i == chatList.length-1}">\n\n          <div class="msj-rta macro" *ngIf="message.sent">\n\n            <div class="text text-r">\n\n              <p>{{ message.text }}</p>\n\n              <p class="align-right"><small>{{ message.time }}</small></p>\n\n            </div>\n\n            <div class="avatar" style="padding:0px 0px 0px 50px !important">\n\n              <img class="img-circle"  src="../../assets/icon/Webp.net-resizeimage.png">\n\n            </div>\n\n          </div>\n\n          <div class="msj macro" *ngIf="!message.sent">\n\n            <div class="avatar">\n\n              <img class="img-circle" src="../../assets/icon/Webp.net-resizeimage.png">\n\n            </div>\n\n            <div class="text text-l">\n\n              <p>{{ message.text }}</p>\n\n              <p style="text-align: right;"><small>{{ message.time }}</small></p>\n\n            </div>\n\n          </div>\n\n        </div>\n\n      </ion-item>\n\n    </ion-list>\n\n    <div *ngIf="isPopulateDataAvaialble" style="margin-bottom: 30px;">\n\n        <div *ngIf="prePopulateType == \'button\'">\n\n          <span *ngFor="let item of prePopulateArray">\n\n            <button class="selection-button" (click)="onSelection($event, item)">{{item.text}}</button>\n\n          </span>\n\n        </div>\n\n        <div *ngIf="prePopulateType == \'checkBoxList\'">\n\n            <ion-list no-lines >\n\n              <ion-item no-lines *ngFor="let item of prePopulateArray; let indx = index;">\n\n                <ion-label>{{item.text}}</ion-label>\n\n                <ion-checkbox (click)="onCheckBoxSelection(indx)"></ion-checkbox>\n\n              </ion-item>\n\n            </ion-list>\n\n        </div>\n\n    </div>\n\n    <div class="bottom-div">\n\n      <input class="input-text" type="text"  placeholder="Type your message" (keydown)="addText($event)" [(ngModel)]="freeText" />\n\n      <button class="send-button" (click)="addTextButton()">Send</button>\n\n    </div>\n\n  </ion-content>\n\n  \n\n  '/*ion-inline-end:"C:\MyDrive\finalapp\ionicappchatbox\src\pages\chatbox\chatpage.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]) === "function" && _b || Object])
], ChatPage);

var _a, _b;
//# sourceMappingURL=chatpage.js.map

/***/ }),

/***/ 256:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_chatbox_chatpage__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_list_list__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__ = __webpack_require__(226);
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
            __WEBPACK_IMPORTED_MODULE_7__pages_list_list__["a" /* ListPage */]
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
            __WEBPACK_IMPORTED_MODULE_7__pages_list_list__["a" /* ListPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__["a" /* SplashScreen */],
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(256);
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
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
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

/***/ })

},[257]);
//# sourceMappingURL=main.js.map