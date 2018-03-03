import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Nav, Platform, NavController } from 'ionic-angular';
import { ChartsModule } from 'ng2-charts';

import { WelcomePage } from '../pages/welcome/welcome';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MytasksPage } from "../pages/mytasks/mytasks";
import { DetailviewPage } from '../pages/detailview/detailview'
import { TaskdetailsPage } from '../pages/taskdetails/taskdetails';
import { FeedbackPage } from '../pages/feedback/feedback';
import { FeedbackquestionsPage } from '../pages/feedbackquestions/feedbackquestions';
import { ManageQuestionsPage } from '../pages/manage-questions/manage-questions';
import { QuestionDetailsPage } from '../pages/question-details/question-details';
import { ManageFeedbacksPage } from '../pages/manage-feedbacks/manage-feedbacks';
import { FeedbackDetailsPage } from '../pages/feedback-details/feedback-details';
import { FeedbackstatisticsPage } from '../pages/feedbackstatistics/feedbackstatistics';
import { StatisticKindofquestionOnePage } from '../pages/statistic-kindofquestion-one/statistic-kindofquestion-one';
import { StatisticKindofquestionTwoPage } from '../pages/statistic-kindofquestion-two/statistic-kindofquestion-two';
import { StatisticKindofquestionThreePage } from '../pages/statistic-kindofquestion-three/statistic-kindofquestion-three';



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';



@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    LoginPage,
    SignupPage,
    HomePage,
    ListPage,
    MytasksPage,
    DetailviewPage,
    TaskdetailsPage,
    FeedbackPage,
    FeedbackquestionsPage,
    ManageQuestionsPage,
    QuestionDetailsPage,
    ManageFeedbacksPage,
    FeedbackDetailsPage,
    FeedbackstatisticsPage,
    StatisticKindofquestionOnePage,
    StatisticKindofquestionTwoPage,
    StatisticKindofquestionThreePage

  ],
  imports: [
    BrowserModule, HttpModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    ChartsModule
    

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WelcomePage,
    LoginPage,
    SignupPage,
    ListPage,
    MytasksPage,
    DetailviewPage,
    TaskdetailsPage,
    FeedbackPage,
    FeedbackquestionsPage,
    ManageQuestionsPage,
    QuestionDetailsPage,
    ManageFeedbacksPage,
    FeedbackDetailsPage,
    FeedbackstatisticsPage,
    StatisticKindofquestionOnePage,
    StatisticKindofquestionTwoPage,
    StatisticKindofquestionThreePage

  ],
  providers: [
    StatusBar,
    SplashScreen, 
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpClientModule
  ]
})
export class AppModule {}
