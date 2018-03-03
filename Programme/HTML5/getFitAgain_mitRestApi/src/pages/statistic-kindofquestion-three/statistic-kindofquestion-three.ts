import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-statistic-kindofquestion-three',
  templateUrl: 'statistic-kindofquestion-three.html',
})
export class StatisticKindofquestionThreePage {
  question: any;
  answers: any;
  amount: number[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.question = this.navParams.get('item');
    this.getAllNecessaryAnswers();
  }

  getAllNecessaryAnswers(){
    this.answers = [];

    var getAnswers = new XMLHttpRequest(); // a new request
    getAnswers.open("GET","http://localhost:8101/http://localhost:8081/api/src/answer", false);
    getAnswers.send(null);

    var newdata = JSON.parse(getAnswers.responseText);
    //console.log(newdata);
    if(newdata.data != null){
      for(var i = 0; i < newdata.data.length; i++){
        if(newdata.data[i].QuestionID == this.question.QuestionID){
          this.answers.push(newdata.data[i]);
        }
      }
    }
  }
}
