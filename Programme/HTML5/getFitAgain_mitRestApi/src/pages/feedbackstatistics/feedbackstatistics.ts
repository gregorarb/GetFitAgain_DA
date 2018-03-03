import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatisticKindofquestionOnePage } from '../statistic-kindofquestion-one/statistic-kindofquestion-one';
import { StatisticKindofquestionTwoPage } from '../statistic-kindofquestion-two/statistic-kindofquestion-two';
import { StatisticKindofquestionThreePage } from '../statistic-kindofquestion-three/statistic-kindofquestion-three';

@IonicPage()
@Component({
  selector: 'page-feedbackstatistics',
  templateUrl: 'feedbackstatistics.html',
})
export class FeedbackstatisticsPage {
  questions: Array <{QuestionID: number, questiontext: string, kindofquestion: number, icon: string}>;  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.getFeedbackData();
  }

  getFeedbackData(){
    this.questions = [];
    
    var getFeedback = new XMLHttpRequest(); // a new request
    getFeedback.open("GET","http://localhost:8101/http://localhost:8081/api/src/question",false);
    getFeedback.send(null);
    
    var newdata = JSON.parse(getFeedback.responseText);
    var iconname = "";

    if(newdata.data != null){
      for(var i = 0; i < newdata.data.length; i++){
        if(newdata.data[i].kindofquestion == 1){
          iconname = "swap";
        }
        else if(newdata.data[i].kindofquestion == 2){
          iconname = "checkbox-outline";
        }
        else if(newdata.data[i].kindofquestion == 3){
          iconname = "ios-create";
        }
  
        this.questions.push({
          QuestionID: newdata.data[i].QuestionID,
          questiontext: newdata.data[i].questiontext,
          kindofquestion: newdata.data[i].kindofquestion,
          icon: iconname
        });
      }
    }
  }

  openDetailPage($event, item){
    if(item.kindofquestion == 1){
      this.navCtrl.push(StatisticKindofquestionOnePage, {
        item: item
      });
    }
    else if(item.kindofquestion == 2){
      this.navCtrl.push(StatisticKindofquestionTwoPage, {
        item: item
      });
    }
    else if(item.kindofquestion == 3){
      this.navCtrl.push(StatisticKindofquestionThreePage, {
        item: item
      });
    }
  }
}
