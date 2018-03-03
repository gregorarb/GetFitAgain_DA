import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { FeedbackDetailsPage } from '../feedback-details/feedback-details';

@IonicPage()
@Component({
  selector: 'page-manage-feedbacks',
  templateUrl: 'manage-feedbacks.html',
})
export class ManageFeedbacksPage {

  //Variablen
  feedbacks: Array <{FeedbackID: number, name: string}>;
  isnull: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionsheetCtrl: ActionSheetController) {
    //Alle Feedbacks holen
    this.isnull = false;
    this.getFeedbacks();
  }

  getFeedbacks(){
    this.feedbacks = [];
    var getFeedback = new XMLHttpRequest(); // a new request
    getFeedback.open("GET","http://localhost:8101/http://localhost:8081/api/src/feedback",false);
    getFeedback.send(null);
    
    var newdata = JSON.parse(getFeedback.responseText);
    

    if(newdata.data == null){
      this.isnull = true;
      this.feedbacks=null;
    }
    if(this.isnull == false){
      for(var i =0;i < newdata.data.length; i++){
        this.feedbacks.push({
          FeedbackID: newdata.data[i].FeedbackID,
          name: newdata.data[i].name
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
            this.navCtrl.push(FeedbackDetailsPage, {
              item: item
            });
            
          }
        },
        {
          text: 'Löschen',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            if(this.isnull == false){
              this.deleteAnswers(item);
              this.deleteFeedbackDoneByUser(item);
              this.deleteFeedbackQuestions(item);
              this.deleteFeedbackItself(item);
              this.navCtrl.setRoot(ManageFeedbacksPage);
            }
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
    this.navCtrl.push(FeedbackDetailsPage);
  }

  //Löscht alle Antworten vom Feedback
  deleteAnswers(item){
    var getAllAnswers = new XMLHttpRequest(); // a new request
    getAllAnswers.open("GET","http://localhost:8101/http://localhost:8081/api/src/answer" ,false);
    getAllAnswers.send(null);

    //Aus allen Antworten jene filtern die gelöscht werden müssen
    var newdata = JSON.parse(getAllAnswers.responseText);
    if(newdata.data != null){
      for(var i = 0; i < newdata.data.length; i++){
        if(item.FeedbackID == newdata.data[i].FeedbackID){
          var deleteAnswers = new XMLHttpRequest(); // a new request
          deleteAnswers.open("DELETE","http://localhost:8101/http://localhost:8081/api/src/answer/" + newdata.data[i].AnswerID + "/" + newdata.data[i].FeedbackID + "/" + newdata.data[i].QuestionID ,false);
          deleteAnswers.send(null); 
        }
      }
    }
  }

  //Löscht die Verknüpfungen aus der FeedbackDoneByUser Tabelle
  deleteFeedbackDoneByUser(item){
    var deleteFDBU = new XMLHttpRequest(); // a new request
    deleteFDBU.open("DELETE","http://localhost:8101/http://localhost:8081/api/src/feedbackdonebyuser/" + item.FeedbackID ,false);
    deleteFDBU.send(null);
  }

  //Löscht die Verknüpfungen aus der FeedbackQuestionstabelle
  deleteFeedbackQuestions(item){
    var getAllFeedbackQuestions = new XMLHttpRequest(); // a new request
    getAllFeedbackQuestions.open("GET","http://localhost:8101/http://localhost:8081/api/src/feedbackquestions" ,false);
    getAllFeedbackQuestions.send(null);

    //Aus allen Antworten jene filtern die gelöscht werden müssen
    var newdata = JSON.parse(getAllFeedbackQuestions.responseText);
    for(var i = 0; i < newdata.data.length; i++){
      if(item.FeedbackID == newdata.data[i].FeedbackID){
        var deleteQuestionFromFeedbac = new XMLHttpRequest(); // a new request
        deleteQuestionFromFeedbac.open("DELETE","http://localhost:8101/http://localhost:8081/api/src/feedbackquestions/" + item.FeedbackID +"/" + newdata.data[i].QuestionID ,false);
        deleteQuestionFromFeedbac.send(null); 
      }
    }
  }

  //Löscht ein Feedback
  deleteFeedbackItself(item){
    var deleteTheFeedback = new XMLHttpRequest(); // a new request
    deleteTheFeedback.open("DELETE","http://localhost:8101/http://localhost:8081/api/src/feedback/" + item.FeedbackID ,false);
    deleteTheFeedback.send(null);
  }
}
