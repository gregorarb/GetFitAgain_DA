import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FeedbackPage } from '../feedback/feedback';

@IonicPage()
@Component({
  selector: 'page-feedbackquestions',
  templateUrl: 'feedbackquestions.html',
})
export class FeedbackquestionsPage {
  //Variablen
  feedback: any;
  kindofquestionOneDynamic: Array<{QuestionID: number, questionIdentifyName: string, value: number, questiontext: string}>;
  kindofquestionTwoDynamic: Array<{QuestionID: number, questionIdentifyName: string, value: boolean, questiontext: string}>;
  kindofquestionThreeDynamic: Array<{QuestionID: number, questionIdentifyName: string, value: string, questiontext: string}>;
  CustomerID: number;

  questions: Array<{QuestionID: number, questiontext: string, kindofquestion: number}>;
  testValues: Array<{startvalue: any, QuestionID: number}>;
  disableFeedback: boolean;

  //Konstruktor
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //Übergabeparameter
    this.feedback = this.navParams.get('item');

    //Zuerst zur Sicherheit nochmal löschen
    this.deleteAllFeedbackQuestions(this.feedback);
    this.deleteDoneFeedback(this.feedback);
    
    this.CustomerID = this.feedback.CustomerID;

    this.kindofquestionOneDynamic = [];
    this.kindofquestionTwoDynamic = [];
    this.kindofquestionThreeDynamic = [];
    this.disableFeedback = null;

    this.getQuestionsOfFeedback();
    this.fillQuestionsOfFeedback();
    
    this.generateKindOfQuestionOneDynamic();
    this.generateKindOfQuestionTwoDynamic();
    this.generateKindOfQuestionThreeDynamic();
  }

  getQuestionsOfFeedback(){
    this.questions = [];

    var getFeedback = new XMLHttpRequest(); // a new request
    getFeedback.open("GET","http://localhost:8101/http://localhost:8081/api/src/feedbackquestions/" + this.feedback.FeedbackID ,false);
    getFeedback.send(null);

    var newdata = JSON.parse(getFeedback.responseText);

    var myarray = newdata.data;
    var arrayLength;
    try{
      arrayLength = myarray.length;
    }
    catch(err){
      alert("Das Feedback ist noch nicht bereit um bearbeitet zu werden!");
      this.disableFeedback = false;
    }

    for (var i = 0; i < arrayLength; i++) {
      this.questions.push({
        QuestionID: myarray[i].QuestionID,
        questiontext: myarray[i].questiontext,
        kindofquestion: myarray[i].kindofquestion
      });
    }
  }

  fillQuestionsOfFeedback(){
    for (var i = 0; i < this.questions.length; i++) {
      var getQuestion = new XMLHttpRequest(); // a new request
      getQuestion.open("GET","http://localhost:8101/http://localhost:8081/api/src/question/" + this.questions[i].QuestionID ,false);
      getQuestion.send(null);
    
      var newdata = JSON.parse(getQuestion.responseText);

      this.questions[i].questiontext = newdata.data[0].questiontext;
      this.questions[i].kindofquestion = newdata.data[0].kindofquestion;
    }
  }

  //Wenn die Page vollständig geladen ist
  ionViewDidLoad() {}

  logForm(){
    //Bewertungsfragen
    for(var i = 0; i < this.kindofquestionOneDynamic.length; i++){
      //Speicherung in die Datenbank
      var data = new FormData();
      data.append("FeedbackID", ""+this.feedback.FeedbackID);
      data.append("QuestionID", ""+this.kindofquestionOneDynamic[i].QuestionID);
      data.append("CustomerID", ""+this.CustomerID);
      data.append("answerint", ""+this.kindofquestionOneDynamic[i].value);
      data.append("answerbool", "0");
      data.append("answerstring", "IGNORESTRING");
      
      var sendFeedback = new XMLHttpRequest();
      
      sendFeedback.open("POST", "http://localhost:8101/http://localhost:8081/api/src/answer", false);
      sendFeedback.send(data);
      
      var newdatahelp = JSON.parse(sendFeedback.responseText);
      /**
       * Überprüfung für Insert einbauen?
       */
    }
    //Ja Nein Fragen
    for(var i = 0; i < this.kindofquestionTwoDynamic.length; i++){
      //Speicherung in die Datenbank
      var data = new FormData();
      data.append("FeedbackID", ""+this.feedback.FeedbackID);
      data.append("QuestionID", ""+this.kindofquestionTwoDynamic[i].QuestionID);
      data.append("CustomerID", ""+this.CustomerID);
      data.append("answerint", "0");
      if(this.kindofquestionTwoDynamic[i].value == true){
      data.append("answerbool", "1");
      }
      else{
      data.append("answerbool", "2");
      }
      data.append("answerstring", "IGNORESTRING");
      
      var sendFeedback = new XMLHttpRequest();
      
      sendFeedback.open("POST", "http://localhost:8101/http://localhost:8081/api/src/answer", false);
      sendFeedback.send(data);
      
      var newdatahelp = JSON.parse(sendFeedback.responseText);
      /**
      * Überprüfung für Insert einbauen?
      */
    }
    //Textfragen
    for(var i = 0; i < this.kindofquestionThreeDynamic.length; i++){
      //Speicherung in die Datenbank
      var data = new FormData();
      data.append("FeedbackID", ""+this.feedback.FeedbackID);
      data.append("QuestionID", ""+this.kindofquestionThreeDynamic[i].QuestionID);
      data.append("CustomerID", ""+this.CustomerID);
      data.append("answerint", "0");
      data.append("answerbool", "0");
      data.append("answerstring", ""+this.kindofquestionThreeDynamic[i].value);
      
      var sendFeedback = new XMLHttpRequest();
      
      sendFeedback.open("POST", "http://localhost:8101/http://localhost:8081/api/src/answer", false);
      sendFeedback.send(data);
      
      var newdatahelp = JSON.parse(sendFeedback.responseText);
      /**
       * Überprüfung für Insert einbauen?
       */
    }

    //Feedback als getan markieren
    var data = new FormData();
    data.append("FeedbackID", ""+this.feedback.FeedbackID);
    data.append("CustomerID", ""+this.CustomerID);
    
    var sendFeedback = new XMLHttpRequest();
    
    sendFeedback.open("POST", "http://localhost:8101/http://localhost:8081/api/src/feedbackdonebyuser", false);
    sendFeedback.send(data);
    
    var newdatahelp = JSON.parse(sendFeedback.responseText);
    /**
     * Überprüfung für Insert einbauen?
     */

    //Redirect zu anderen Feedbacks
    this.navCtrl.setRoot(FeedbackPage);
  }

  //Generiert Fragen mit range als Auswahl
  generateKindOfQuestionOneDynamic(){
    for (var i = 0; i < this.questions.length; i++) {
      if(this.questions[i].kindofquestion == 1){
        this.kindofquestionOneDynamic.push({
          QuestionID: this.questions[i].QuestionID,
          questionIdentifyName: "KindofquestionOne_"+this.questions[i].QuestionID,
          value: 1,
          questiontext: this.questions[i].questiontext
        });
      }
    }
  }

  //Generiert true or false Fragen
  generateKindOfQuestionTwoDynamic(){
    for (var i = 0; i < this.questions.length; i++) {
      if(this.questions[i].kindofquestion == 2){
        this.kindofquestionTwoDynamic.push({
          QuestionID: this.questions[i].QuestionID,
          questionIdentifyName: "KindofquestionTwo_"+this.questions[i].QuestionID,
          value: false,
          questiontext: this.questions[i].questiontext
        });
      }
    }
  }

  //Generiert Textfragen
  generateKindOfQuestionThreeDynamic(){
    for (var i = 0; i < this.questions.length; i++) {
      if(this.questions[i].kindofquestion == 3){
        this.kindofquestionThreeDynamic.push({
          QuestionID: this.questions[i].QuestionID,
          questionIdentifyName: "KindofquestionThree_"+this.questions[i].QuestionID,
          value: "",
          questiontext: this.questions[i].questiontext
        });
      }
    }
  }
  /**
   * Diese Methoden stellen vor dem bearbeiten nocheinmal sicher dass das Formular nur einmal ausgefüllt wurde 
   */
  deleteAllFeedbackQuestions(item){
    //Fragen die bei einem Feedback beantwortet worden sind löschen
    var deleteFeedbackQuestions = new XMLHttpRequest();
    
    deleteFeedbackQuestions.open("DELETE", "http://localhost:8101/http://localhost:8081/api/src/answer/"+item.FeedbackID+"/"+item.CustomerID, false);
    deleteFeedbackQuestions.send(null);
    
    var newdatahelp = JSON.parse(deleteFeedbackQuestions.responseText);
    /**
     * Überprüfung für Insert einbauen?
     */
  }

  deleteDoneFeedback(item){
    //Feedback das bereits gemacht wurde wieder als nicht gemacht markieren
    var deleteFeedbackDone = new XMLHttpRequest();
    
    deleteFeedbackDone.open("DELETE", "http://localhost:8101/http://localhost:8081/api/src/feedbackdonebyuser/"+item.FeedbackID+"/"+item.CustomerID, false);
    deleteFeedbackDone.send(null);
    
    var newdatahelp = JSON.parse(deleteFeedbackDone.responseText);
    /**
     * Überprüfung für Insert einbauen?
     */
  }
}
