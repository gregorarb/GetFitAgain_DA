import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WelcomePage } from '../pages/welcome/welcome';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
//import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MytasksPage } from "../pages/mytasks/mytasks";
import { FeedbackPage } from '../pages/feedback/feedback';
import { ManageFeedbacksPage } from '../pages/manage-feedbacks/manage-feedbacks';
import { FeedbackstatisticsPage } from '../pages/feedbackstatistics/feedbackstatistics';
import { ManageQuestionsPage } from '../pages/manage-questions/manage-questions';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = WelcomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Mein Training', component: MytasksPage },
      { title: 'Geben Sie uns Feedback', component: FeedbackPage},
      { title: 'Fragenverwaltung', component: ManageQuestionsPage},
      { title: 'Feedbackverwaltung', component: ManageFeedbacksPage},
      { title: 'Feedbackstatistiken', component: FeedbackstatisticsPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
    //  this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

 

}
