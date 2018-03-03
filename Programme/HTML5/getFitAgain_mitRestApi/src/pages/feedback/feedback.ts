import { Component } from '@angular/core';
import { List } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { Platform, ActionSheetController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { FeedbackquestionsPage } from '../feedbackquestions/feedbackquestions';

@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html'
})
export class FeedbackPage {
  //Variablen
  feedbacks: Array<{FeedbackID: number, name: string, done: string, donebool: boolean, CustomerID: number}>;

  //Konstruktor
  constructor(public navCtrl: NavController, public navParams: NavParams, public actionsheetCtrl: ActionSheetController){
    this.getFeedbacksFromDatabase();
  }

  //fügt Feedbacks mit allen wichtigen Informationen von der Datenbank in die Liste ein
  getFeedbacksFromDatabase(){
    //customerid --> mit local storage ersetzen
    var customerid = JSON.parse(localStorage.getItem('loggedCustomer')).CustomerID;

    //Get feedback
    var getFeedback = new XMLHttpRequest(); // a new request
    getFeedback.open("GET","http://localhost:8101/http://localhost:8081/api/src/feedback",false);
    getFeedback.send(null);
    
    var newdata = JSON.parse(getFeedback.responseText);

    //Get Feedbacks done by users
    var getFeedbackDone = new XMLHttpRequest(); // a new request
    getFeedbackDone.open("GET","http://localhost:8101/http://localhost:8081/api/src/feedbackdonebyuser",false);
    getFeedbackDone.send(null);
    
    if(newdata.data != null){
    
      var newdata2 = JSON.parse(getFeedbackDone.responseText);

      var myarray = newdata.data;
      var arrayLength = myarray.length;

      this.feedbacks = [];
      
      if(newdata2.data != null){
        var myarray2 = newdata2.data;
        var arrayLength2 = myarray2.length;
        
        for (var i = 0; i < arrayLength; i++) {
          var isitdone = "Unerledigt";
          var isitdonebool = null;
          //hat der user das feedback schon gemacht?
          for (var j = 0; j < arrayLength2; j++){
            //customerid --> lokales objekt später DB objekt
            if(customerid == myarray2[j].CustomerID){
              if(myarray2[j].FeedbackID == myarray[i].FeedbackID){
                isitdone = "Erledigt";
                isitdonebool = false;
              }
            }
          }
          
          this.feedbacks.push({
            FeedbackID: myarray[i].FeedbackID,
            name: myarray[i].name,
            done: isitdone,
            donebool: isitdonebool,
            CustomerID: customerid
          });
        }
      }
      //wenn feedbackquestions null ist dann ist keins der Feedbacks gemacht
      else{
        for (var i = 0; i < arrayLength; i++) {
          this.feedbacks.push({
            FeedbackID: myarray[i].FeedbackID,
            name: myarray[i].name,
            done: "Unerledigt",
            donebool: null,
            CustomerID: customerid
          });
        }
      }
    }
  }

  //wenn ein item in der Liste ausgewählt wurde
  openFeedbackQuestions($event, item){
    this.navCtrl.push(FeedbackquestionsPage, {
      item: item
    });
  }
  
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

  openMenu($event, item) {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Was wollen Sie machen?',
      buttons: [
        {
          text: 'Bearbeiten',
          role: 'edit',
          icon: 'create',
          handler: () => {
            //console.log('Edit clicked');
            this.navCtrl.push(FeedbackquestionsPage, {
              item: item
            });
          }
        },
        {
          text: 'Löschen',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            //console.log('Delete clicked');
            
            this.deleteAllFeedbackQuestions(item);
            this.deleteDoneFeedback(item);

            //Redirect zu anderen Feedbacks
            this.navCtrl.setRoot(FeedbackPage);
          }
        },
        {
          text: 'Abbrechen',
          role: 'cancel',
          icon: 'close',
          handler: () => {
            //console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}