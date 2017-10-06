import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatPage } from '../chatbox/chatpage';
import { PDFPage } from '../pdf/pdf';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  redirectToChatBox() {
    this.navCtrl.setRoot(ChatPage);
  }

}
