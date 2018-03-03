import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MytasksPage } from "../mytasks/mytasks";
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { map } from 'rxjs/operator/map';
import { DetailviewPage } from '../detailview/detailview';
import { AlertController } from 'ionic-angular';
import { TimerObservable } from 'rxjs/observable/TimerObservable';


class Task{

  TaskID: number;
  Name: string;
  Description: string;
  DifficultyID: number;

}
interface ITasks {
  Trainingplan_PlanID: number; 
  TaskID: number;
  Repeats: string;
  Sets: string;
  Duration: string;
 // email: string;
  
  

}
class Difficulty{
  DifficultyID: number;
  Level: string;
}

interface ITrainingplan {
  Name: string;
  PlanID: string;
  CustomerID: string;


}

@IonicPage()
@Component({
  selector: 'page-taskdetails',
  templateUrl: 'taskdetails.html',
})
export class TaskdetailsPage {

  parameter1: number = this.navParams.get('param1'); 
  tplan: number =+ this.navParams.get('param2');
  tasks: ITasks[];
  help: ITasks[];
  task: Task;
  taskname: string;
  taskdescription: string;
  taskrepeats: string;
  tasksets: string;
  taskduration: string;
  tick: number;
  isenabled=true;
  wiederholungenleft: number;
  setsleft: number;
  difficulty: Difficulty;
  level: string;
  timerzero = false;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public alertCtrl: AlertController) {
 ///   let tplan = navParams.get()
  }
  public async ngOnInit() {
    //this.tasks = this.http.get<ITasks[]>("http://localhost:8101/http://localhost:8081/api/src/task")
    const tasksResult : any = await this.http.get("http://localhost:8101/http://localhost:8081/api/src/tasks/"+this.parameter1).toPromise();
    
    //const tplanres: any = await this.http.get("http://localhost:8101/http://localhost:8081/api/src/trainingplan/"+this.tplan).toPromise();

    this.help = tasksResult.data;
    console.log(this.help); 

    this.tasks = this.help.filter(h=> ""+h.Trainingplan_PlanID === ""+this.tplan);

    


    console.log("length of data" + this.tasks[0]);
    console.log("tplanid = "+ this.tplan);
    
     // this.tasks = tasksResult.data[0];    
    
     const taskResult : any = await this.http.get("http://localhost:8101/http://localhost:8081/api/src/task/"+this.parameter1).toPromise();
    this.task = taskResult.data[0];

  

    this.taskname = this.task.Name;
    this.taskdescription = this.task.Description;
    this.taskduration = this.tasks[0].Duration;
    this.taskrepeats = this.tasks[0].Repeats;
    this.tasksets = this.tasks[0].Sets;
    this.wiederholungenleft =+ this.taskrepeats;
    this.setsleft =+this.tasksets;

    const diffResult : any = await this.http.get("http://localhost:8101/http://localhost:8081/api/src/difficulty/"+this.task.DifficultyID).toPromise();
    this.difficulty = diffResult.data[0];
    this.level = this.difficulty.Level;
    
  
  }

   ionViewDidLoad() {
    console.log(this.parameter1);
    
  }
  chooseTimer(){

    var workaround =+ this.taskduration;
    //  this.tick = 1;
    if(workaround>0 || this.taskduration.length<=0){
      console.log(workaround+this.taskduration);
      this.timerzero = false;
      this.startTimer();
    }
    else{
      this.startwithouttimer();
    }
  }
  startTimer() {
    this.isenabled = false;

    this.timerzero = false;
 
  this.tick =+ this.taskduration;
    let alert = this.alertCtrl.create({
      title: 'Zeit ist um!',
      subTitle: "Sie haben diese Aufgabe abgeschlossen.",
      buttons: ['OK']
    });
    let alert2 = this.alertCtrl.create({
      title: 'Satz fertig',
      subTitle: "Sie haben diesen Satz abgeschlossen.",
      buttons: ['OK']
    });
    let alert3 = this.alertCtrl.create({
      title: 'Übung fertig',
      subTitle: "Sie haben diese Übung vollständig abgeschlossen",
      buttons: ['OK']
    });


    let timer2 = TimerObservable.create(0,1000).subscribe(t => {this.tick -= 1; 
      if(this.tick<=0){
        timer2.unsubscribe();
        alert.present();
        this.wiederholungenleft -=1;
        this.isenabled=true;
        if(this.wiederholungenleft<=0){
          alert.dismiss();
          alert2.present();
          this.setsleft -= 1;
          this.wiederholungenleft =+ this.taskrepeats;
        }
        if(this.setsleft <= 0 ){
          alert.dismiss();
          alert2.dismiss();
          alert3.present();
          this.setsleft =+  this.tasksets;

        }
        

  }});

  }
  startwithouttimer(){
    this.timerzero = true;
    let alert2 = this.alertCtrl.create({
      title: 'Satz fertig',
      subTitle: "Sie haben diesen Satz abgeschlossen.",
      buttons: ['OK']
    });
    let alert3 = this.alertCtrl.create({
      title: 'Übung fertig',
      subTitle: "Sie haben diese Übung vollständig abgeschlossen",
      buttons: ['OK']
    });

    this.wiederholungenleft -=1;
        this.isenabled=true;
        if(this.wiederholungenleft<=0){
          alert2.present();
          this.setsleft -= 1;
          this.wiederholungenleft =+ this.taskrepeats;
        }
        if(this.setsleft <= 0 ){

          alert2.dismiss();
          alert3.present();
          this.setsleft =+  this.tasksets;

        }


  }


}
