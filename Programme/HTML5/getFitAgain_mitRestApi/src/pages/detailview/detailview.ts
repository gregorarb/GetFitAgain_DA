import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MytasksPage } from "../mytasks/mytasks";
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { map } from 'rxjs/operator/map';
import { TaskdetailsPage } from '../taskdetails/taskdetails';


/**
 * Generated class for the DetailviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

interface ITasks {
  Trainingplan_PlanID: number; 
  TaskID: number;
  Repeats: string;
  Sets: string;
  Duration: string;
 // email: string;
  
  

}
interface ITask{
  TaskID: number;
  Name: string;
  Description: string;
  DifficultyID: number;
}

class Difficulty{
  DifficultyID: number;
  Level: string;
}


@IonicPage()
@Component({
  selector: 'page-detailview',
  templateUrl: 'detailview.html',
})
export class DetailviewPage {

 
  parameter1: number = this.navParams.get('param1'); 
  public tasks: ITasks[] = [];
  public selectedTasks: ITasks[];
  public selectedTask: ITask[];
  help: any;
  public task: ITask[];
  public resultTasks: ITask[]=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.navParams.get('param1')
  }
  


  public async ngOnInit() {


    const result : any = await this.http.get("http://localhost:8101/http://localhost:8081/api/src/tasks").toPromise();
    
    

    this.tasks = result.data;
  
      

    this.selectedTasks = this.tasks.filter(t => t.Trainingplan_PlanID === this.parameter1);


    for(var i = 0; i<this.selectedTasks.length;i++){
      console.log(this.selectedTasks[i]);
      const tasker : any = await this.http.get("http://localhost:8101/http://localhost:8081/api/src/task/"+this.selectedTasks[i].TaskID).toPromise();
      console.log(tasker.data);
      this.task = tasker.data;
      this.resultTasks.push(this.task[0]);

    }
    console.log(this.resultTasks+" taskertasks "+this.resultTasks.length);
 
		
  }
 
 

  ionViewDidLoad() {
    console.log(this.parameter1);
  }
  openDetailedTask(value) {
    console.log("parameter2: " + this.parameter1);
  	this.navCtrl.push(TaskdetailsPage , {
      param1: value,
      param2: this.parameter1
  });
  console.log("parameter2: " + this.parameter1);
 
}

}

