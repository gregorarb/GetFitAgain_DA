import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ManageFeedbacksPage } from '../manage-feedbacks/manage-feedbacks';

@IonicPage()
@Component({
  selector: 'page-feedback-details',
  templateUrl: 'feedback-details.html',
})
export class FeedbackDetailsPage {
  //Variablen
  feedback: any;
  allquestions: Array<{QuestionID: number, questiontext: string, value: boolean}>;
  truequestions: Array<{QuestionID: number, questiontext: string, value: boolean}>;
  falsequestions: Array<{QuestionID: number, questiontext: string, value: boolean}>;
  newfeedback: boolean;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.allquestions = [];
    this.truequestions = [];

    if(this.navParams.get('item') == null){
      this.feedback = [];
      /**
       * Standardwerte annehmen
       * name wird gefüllt
       */
      this.feedback.push({
        FeedbackID: -100,
        name: ""
      });
      this.newfeedback = true;
      this.getQuestions();
      this.falsequestions = this.allquestions;
    }
    else{
      this.feedback = this.navParams.get('item');
      this.newfeedback = false;
      this.getQuestions();
      this.splitQuestions();
    }
  }
  //holt alle Fragen aus der Datenbank
  getQuestions(){
    var getFeedback = new XMLHttpRequest(); // a new request
    getFeedback.open("GET","http://localhost:8101/http://localhost:8081/api/src/question" ,false);
    getFeedback.send(null);

    var newdata = JSON.parse(getFeedback.responseText);

    for(var i = 0; i < newdata.data.length; i++){
      this.allquestions.push({
        QuestionID: newdata.data[i].QuestionID,
        questiontext: newdata.data[i].questiontext,
        value: false
      });
    }
  }
  //Alle die im Feedback sind markieren
  splitQuestions(){
    var feedbackQuestions = new XMLHttpRequest(); // a new request
    feedbackQuestions.open("GET","http://localhost:8101/http://localhost:8081/api/src/feedbackquestions" ,false);
    feedbackQuestions.send(null);

    var newdata = JSON.parse(feedbackQuestions.responseText);
    //fügt die gemachten Fragen truequestions hinzu
    if(newdata.data != null){
      for(var i = 0; i < newdata.data.length; i++){
        if(newdata.data[i].FeedbackID == this.feedback.FeedbackID){
          for(var j = 0; j < this.allquestions.length; j++){
            if(newdata.data[i].QuestionID == this.allquestions[j].QuestionID){
              this.truequestions.push({
                QuestionID: this.allquestions[j].QuestionID,
                questiontext: this.allquestions[j].questiontext,
                value: true
              });
            }
          }
        }
      }
    }

    //fügt die nicht gemachten Fragen falsequestions hinzu
    this.falsequestions = this.allquestions;
    for(var i = 0; i < this.allquestions.length; i++){
      for(var j = 0; j < this.truequestions.length; j++){
        if(this.allquestions[i].QuestionID == this.truequestions[j].QuestionID){
          //hier einfach die elemente von falsequestions entfernen die in truequestions sind
          this.falsequestions.splice(i,1);
        }
      }
    }
  }

  logForm(){
    //false --> Feedback wurde nicht neu erstellt
    if(this.newfeedback == false){
      this.questionsAdded();
      this.questionDeleted();

      //Feedbacknamen updaten
      this.updateFeedback();
    }
    else{
      this.createFeedback();
      this.questionsAdded();
    }

    //Redirect zu anderen Feedbacks
    this.navCtrl.setRoot(ManageFeedbacksPage);
  }

  //Frage von Feedback löschen dass nicht mehr gebraucht wird
  deleteQuestionFromFeedback(QuestionID){
    var deleteFeedbackQuestions = new XMLHttpRequest();
    deleteFeedbackQuestions.open("DELETE", "http://localhost:8101/http://localhost:8081/api/src/feedbackquestions/"+this.feedback.FeedbackID+"/"+QuestionID, false);
    deleteFeedbackQuestions.send(null);
  }

  //Updated den Namen vom Feedback
  updateFeedback(){
    var updateFeedback = new XMLHttpRequest();
    
    var data = "name="+this.feedback.name;
    updateFeedback.open("PUT", "http://localhost:8101/http://localhost:8081/api/src/feedback/"+this.feedback.FeedbackID, false);
    updateFeedback.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    updateFeedback.send(data);

    var newdatahelp = JSON.parse(updateFeedback.responseText);
  }

  //Eine Frage zum Feedback hinzufügen
  addQuestionToFeedback(newitem){
    var data = new FormData();
    data.append("FeedbackID", ""+this.feedback.FeedbackID);
    data.append("QuestionID", ""+newitem.QuestionID);
    
    var addQuestion = new XMLHttpRequest();
    
    addQuestion.open("POST", "http://localhost:8101/http://localhost:8081/api/src/feedbackquestions", false);
    addQuestion.send(data);

    var newdatahelp = JSON.parse(addQuestion.responseText);
  }

  //Sind Fragen entfernt worden?
  questionDeleted(){
    for(var i = 0; i < this.truequestions.length; i++){
      if(this.truequestions[i].value == false){
        this.deleteQuestionFromFeedback(this.truequestions[i].QuestionID);
      }
    }
  }

  //Sind neue Fragen hinzugefügt worden?
  questionsAdded(){
    for(var i = 0; i < this.falsequestions.length; i++){
      if(this.falsequestions[i].value == true){
        this.addQuestionToFeedback(this.falsequestions[i]);
      }
    }
  }

  //Feedback erstellen
  createFeedback(){
    var whattodo = false;
    var getAllFeedbacks = new XMLHttpRequest();
    
    getAllFeedbacks.open("GET", "http://localhost:8101/http://localhost:8081/api/src/feedback", false);
    getAllFeedbacks.send(null);

    var newdata = JSON.parse(getAllFeedbacks.responseText);

    //Sicherstellen dass das Feedback nur 1 mal vorkommt
    if(newdata.data != null){
      for(var i = 0; i < newdata.data.length; i ++){
        if(newdata.data[i].name == this.feedback.name){
          alert("Ein Feedbackname darf nicht doppelt vorkommen!");
          whattodo = true;
        }
      }
    }
    
    if(whattodo == false){
      //Feedback hinzufügen
      var data = new FormData();
      data.append("name", ""+this.feedback.name);
      
      var sendFeedback = new XMLHttpRequest();
      
      sendFeedback.open("POST", "http://localhost:8101/http://localhost:8081/api/src/feedback", false);
      sendFeedback.send(data);

      //ID vom neuem Feedback holen --> Ich brauche die ID um dem Feedback Fragen zuzuweisen
      var getFeedbacks = new XMLHttpRequest();
      
      getFeedbacks.open("GET", "http://localhost:8101/http://localhost:8081/api/src/feedback", false);
      getFeedbacks.send(null);

      var feedbackdata = JSON.parse(getFeedbacks.responseText);

      //Sicherstellen dass das Feedback nur 1 mal vorkommt
      for(var i = 0; i < feedbackdata.data.length; i ++){
        if(feedbackdata.data[i].name == this.feedback.name){
          //durch alert wird sofort zurückgegangen zu manage-feedbacks page
          this.feedback.FeedbackID = feedbackdata.data[i].FeedbackID;
        }
      }
    }
    
  }
}
