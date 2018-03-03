import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform, ActionSheetController } from 'ionic-angular';
import { QuestionDetailsPage } from '../question-details/question-details';

/**
 * Generated class for the ManageQuestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manage-questions',
  templateUrl: 'manage-questions.html',
})
export class ManageQuestionsPage {
  //Variablen
  questions: Array <{QuestionID: number, questiontext: string, kindofquestion: number, icon: string}>;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public actionsheetCtrl: ActionSheetController){
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
  //Optionen wenn Item aus Liste ausgewählt wurde
  openMenu($event, item) {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Was wollen Sie machen?',
      buttons: [
        {
          text: 'Bearbeiten',
          role: 'edit',
          icon: 'create',
          handler: () => {
            this.navCtrl.push(QuestionDetailsPage, {
              item: item
            });
            
          }
        },
        {
          text: 'Löschen',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.deleteAnswers(item);
            this.deleteFeedbackquestions(item);
            this.deleteQuestion(item);
            this.navCtrl.setRoot(ManageQuestionsPage);
          }
        },
        {
          text: 'Abbrechen',
          role: 'cancel',
          icon: 'close',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

  //Öffnet ein neues Window und erstellt eine neue Frage
  addItem(){
    this.navCtrl.push(QuestionDetailsPage);
  }
  //Löscht alte Antworten
  deleteAnswers(item){
    var deleteAnswersOfQuestions = new XMLHttpRequest();
      
    deleteAnswersOfQuestions.open("DELETE", "http://localhost:8101/http://localhost:8081/api/src/answer/"+item.QuestionID, false);
    deleteAnswersOfQuestions.send(null);
  }
  //Löscht die Verknüpfung auf die Feedbackquestionstabelle
  deleteFeedbackquestions(item){
    var deleteFeedbackQuestions = new XMLHttpRequest();
    
    deleteFeedbackQuestions.open("DELETE", "http://localhost:8101/http://localhost:8081/api/src/feedbackquestions/"+item.QuestionID, false);
    deleteFeedbackQuestions.send(null);
  }
  //Löscht die Frage in der questions tabelle
  deleteQuestion(item){
    var deleteTheQuestion = new XMLHttpRequest();
    
    deleteTheQuestion.open("DELETE", "http://localhost:8101/http://localhost:8081/api/src/question/"+item.QuestionID, false);
    deleteTheQuestion.send(null);
  }
}
