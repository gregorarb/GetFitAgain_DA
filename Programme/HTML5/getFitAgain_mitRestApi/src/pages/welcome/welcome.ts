import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from "../login/login";
import { SignupPage } from "../signup/signup";
import { HomePage } from "../home/home";

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }
  login(){
    console.log('asdf');
    this.navCtrl.push(LoginPage);
    console.log("123f");
  }
  signup(){
	this.navCtrl.push(SignupPage, {}, {animate: false});
  }

}
