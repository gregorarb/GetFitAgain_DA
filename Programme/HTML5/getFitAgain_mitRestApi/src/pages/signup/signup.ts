import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
	responseData : any;
	userData = { "PersonID": "", "prename": "", "surname": "", "birthdate": "", "street": "", "postcode": "", "Town": "", "Phonenumber": "", "Email": "a", "sex": "" }
  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup(){

  	this.navCtrl.push(HomePage);


  }
  login(){
  	this.navCtrl.push(LoginPage)
  }

}
