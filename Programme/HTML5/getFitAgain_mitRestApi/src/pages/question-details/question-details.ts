import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ManageQuestionsPage } from '../manage-questions/manage-questions';

@IonicPage()
@Component({
  selector: 'page-question-details',
  templateUrl: 'question-details.html',
})
export class QuestionDetailsPage {
  //Variablen
  question: any;
  newquestion: boolean;
  
  //Konstruktor
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if(this.navParams.get('item') == null){
      this.question = [];

      /**
       * Standardwerte annehmen
       * QuestionID --> -1 weil es hier sowieso nicht mehr gebraucht wird
       * questiontext wird gefüllt
       * kindofquestion wird ausgewählt
       */
       this.question.push({
        QuestionID: -1,
        questiontext: "",
        kindofquestion: 0,
      });
      this.newquestion = true;
    }
    else{
      this.question = this.navParams.get('item');
      this.newquestion = false;
    }
  }

  logForm(){
    /**
     * Nur wenn eine neue Frage erstellt wird muss nichts gelöscht werden, sonst muss alles was mit der Antwort der Frage zu tun hat gelöscht werden
     */
    if(this.newquestion == false){
      //Löscht alte Antworten auf die Frage da sie nach der Änderung nicht mehr korrekt sein werden
      this.deleteAnswers();
      //Updatet anschließend die Frage
      this.updateQuestion();
    }
    else{
      this.createQuestion();
    }
    this.navCtrl.setRoot(ManageQuestionsPage);
  }
  //Löscht alte Antworten
  deleteAnswers(){
    var deleteAnswersOfQuestions = new XMLHttpRequest();
      
    deleteAnswersOfQuestions.open("DELETE", "http://localhost:8101/http://localhost:8081/api/src/answer/"+this.question.QuestionID, false);
    deleteAnswersOfQuestions.send(null);
  }
  //Updated eine Frage
  updateQuestion(){
    var updateQuestion = new XMLHttpRequest();
    
    var data = "kindofquestion="+this.question.kindofquestion+"&questiontext="+this.question.questiontext;
    
    updateQuestion.open("PUT", "http://localhost:8101/http://localhost:8081/api/src/question/"+this.question.QuestionID, false);
    updateQuestion.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    updateQuestion.send(data);
  }
  //erstellt eine Frage
  createQuestion(){
    var createQuestion = new XMLHttpRequest();
    
    var data = new FormData();
    
    data.append("questiontext", ""+this.question.questiontext);
    data.append("kindofquestion", ""+this.question.kindofquestion);

    createQuestion.open("POST", "http://localhost:8101/http://localhost:8081/api/src/question", false);
    createQuestion.send(data);
  }
}
