import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
interface ICustomer {
  Password: string;
  CustomerID: string;
  Diagnose: string;
  SocialSecurityNumber: string;
  Insurance: string;
  PersonID: string;
  DoctorID: string;
  TherapistID: string;


}
interface IPerson {

	PersonID: string;
	prename: string;
	surname: string;
	birthdate: string;
	street: string; 
	postcode: string;
	Town: string; 
	Phonenumber: string;
	Email: string;
	sex: string;


}

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  template: `
  <ion-header>

  <ion-toolbar>
    <ion-title>Login</ion-title>
  </ion-toolbar>

</ion-header>
  <ion-content padding>

<ion-list>
  <form #form="ngForm" (ngSubmit)="logForm(form) ">
     <ion-item>
      <ion-label fixed>Username</ion-label>
      <ion-input type="text" required [(ngModel)]="logData.username" ngControl="username" name="username" value=""></ion-input>
    </ion-item>

  <ion-item>
    <ion-label fixed>Password</ion-label>
    <ion-input type="password" [(ngModel)]="logData.password" ngControl="password" name="password" value=""></ion-input>
  </ion-item>
   
    <button ion-button type="submit" block color="dark"(click)="login()">Login</button>
  </form>
  </ion-list>

</ion-content>

`,
})
export class LoginPage {

  logData = {username: '', password: '' };

  public loginPass: any;
  public loginUser: any;
  public foundCustomer = false;
  public foundPerson = false;
  

  public customers: ICustomer[];
  public loggedCustomer: ICustomer;
  public loggedPerson: IPerson;
  public persons: IPerson[];
  public combined: any;

  

  constructor(public navCtrl: NavController, public navParams: NavParams,  public http: HttpClient) {
  }

  logForm(form) {
    this.loginPass = form.value.password;
    this.loginUser = form.value.username;

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  public async ngOnInit() {
   
    const result : any = await this.http.get("http://localhost:8101/http://localhost:8081/api/src/customer").toPromise();
    const resultPerson : any = await this.http.get("http://localhost:8101/http://localhost:8081/api/src/person").toPromise();

    this.customers = result.data;
    this.persons = resultPerson.data;
  
    console.log(this.customers[0]);
  //this.tasks = result.data.find(t => t.Trainingplan_ID === this.parameter1);

 // this.tasks = this.tasks.filter(t => t.Trainingplan_ID === this.parameter1);



    //this.singleTask$ = this.tasks.pipe(map(this.tasks => this.tasks.find(this.tasks => this.tasks.id === this.parameter1) ));
    //this.customers = this.http.get()
    //const selectedTasks = this.tasks.find(tasks => tasks.id === id)
    
		
  }
  

  login(){

    this.foundCustomer = false;
    this.foundPerson=false;
    for(var i = 0; i < this.persons.length;i++){
      if(this.persons[i].Email === this.loginUser){
        this.foundPerson = true;
        this.loggedPerson=this.persons[i];
      }
    }

    for(var i = 0; i < this.customers.length;i++){

      if (this.customers[i].Password === this.loginPass){
        this.foundCustomer = true;
        this.loggedCustomer=this.customers[i];
        
      }
    }
    if(this.foundCustomer===true&&this.foundPerson===true){
      if(this.loggedPerson.PersonID===this.loggedCustomer.PersonID){
        this.navCtrl.push(HomePage);
        console.log(this.loginPass, this.loggedCustomer,this.loggedPerson, "hier bin ich 1");
        
        localStorage.setItem('loggedCustomer', JSON.stringify(this.loggedCustomer));
        localStorage.setItem('loggedPerson', JSON.stringify(this.loggedPerson));
      }

    }
     else{
      console.log(this.loginPass, this.customers,this.loggedPerson);
      console.log("message ");
      console.log("hier bin ich 2")
    }
  /* if((this.fakePass == this.loginPass)&&(this.fakeUser == this.loginUser)){

    this.navCtrl.push(HomePage);

    }
    else {
      console.log(this.loginPass);
      console.log(this.loginUser);
      console.log("wrong user/password")
  
    }


*/
  }
  signup(){
  	this.navCtrl.push(SignupPage);
  }

}
