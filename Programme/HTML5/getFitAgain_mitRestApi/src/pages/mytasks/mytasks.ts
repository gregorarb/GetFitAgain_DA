import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { HttpClient } from '@angular/common/http';
import { DetailviewPage } from '../detailview/detailview';


/**
 * Generated class for the MytasksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

interface ITasks {
	Name: string;
  Description: string;
  id: string; 

}
interface ITrainingplan {
  Name: string;
  PlanID: string;
  CustomerID: string;


}
@IonicPage()
@Component({
  selector: 'page-mytasks',
  templateUrl: 'mytasks.html',
})
export class MytasksPage implements OnInit{


  public trainingplan: ITrainingplan[];
  public userDetails: any;
  public currentTrainingplan: ITrainingplan[];
  
 


  constructor(private navCtrl: NavController, public http: HttpClient) {
    const data = JSON.parse(localStorage.getItem('loggedCustomer'));
		const dataPerson = JSON.parse(localStorage.getItem('loggedPerson'));
		this.userDetails = data;
		

  }


  public async ngOnInit() {

    const trainingplanResult: any = await this.http.get("http://localhost:8101/http://localhost:8081/api/src/trainingplan").toPromise();

    this.trainingplan = trainingplanResult.data;
    
    this.currentTrainingplan = this.trainingplan.filter(t=>t.CustomerID === this.userDetails.CustomerID);

  }

  openTrainingsplan(value) {
  	this.navCtrl.push(DetailviewPage , {
      param1: value
  });

}
  

}
