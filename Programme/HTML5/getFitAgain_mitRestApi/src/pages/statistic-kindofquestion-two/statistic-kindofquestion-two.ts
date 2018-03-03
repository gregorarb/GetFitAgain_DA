import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-statistic-kindofquestion-two',
  templateUrl: 'statistic-kindofquestion-two.html',
})
export class StatisticKindofquestionTwoPage {

  ChartLabels:string[] = ['Ja', 'Nein'];
  ChartData:number[] = [];
  ChartType:string = 'pie';

  question: any;
  answers: any;
  amount: number[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.question = this.navParams.get('item');
    this.getAllNecessaryAnswers();
    this.getAnswerValues();
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

  getAnswerValues(){
    this.amount = [];

    this.amount[1] = 0;
    this.amount[2] = 0;

    for(var i = 0; i < this.answers.length; i++){
      if(this.answers[i].answerbool == 1){
        this.amount[1]++;
      }
      else if(this.answers[i].answerbool == 2){
        this.amount[2]++;
      }
    }
    
    this.ChartData.push(this.amount[1]);
    this.ChartData.push(this.amount[2]);
  }
}
