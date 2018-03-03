import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-statistic-kindofquestion-one',
  templateUrl: 'statistic-kindofquestion-one.html',
})
export class StatisticKindofquestionOnePage {
  ChartData:number[] = [];
  barChartLabels:string[] = ['1', '2', '3', '4', '5'];
  barChartType:string = 'bar';
  barChartLegend:boolean = true;  
  
  public barChartData:any[] = [
    {data: [-100], label: ''}
  ];
  
  question: any;
  answers: any;
  amount: number[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.question = this.navParams.get('item');
    this.getAllNecessaryAnswers();
    this.getAnswerValues();

    //this.barChartData.data = [];
    this.barChartData[0].data = this.ChartData;
    this.barChartData[0].label = "Bewertung 1-5";
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
    this.amount[3] = 0;
    this.amount[4] = 0;
    this.amount[5] = 0;

    for(var i = 0; i < this.answers.length; i++){
      if(this.answers[i].answerint == 1){
        this.amount[1]++;
      }
      else if(this.answers[i].answerint == 2){
        this.amount[2]++;
      }
      else if(this.answers[i].answerint == 3){
        this.amount[3]++;
      }
      else if(this.answers[i].answerint == 4){
        this.amount[4]++;
      }
      else if(this.answers[i].answerint == 5){
        this.amount[5]++;
      }
    }
    
    this.ChartData.push(this.amount[1]);
    this.ChartData.push(this.amount[2]);
    this.ChartData.push(this.amount[3]);
    this.ChartData.push(this.amount[4]);
    this.ChartData.push(this.amount[5]);
  }

}
