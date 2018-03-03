import { NavController } from 'ionic-angular';
import { App } from 'ionic-angular';
import { MytasksPage } from "../mytasks/mytasks";
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
//import { WelcomePage } from "../welcome/welcome";
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LoginPage } from '../login/login';
import { WelcomePage } from '../welcome/welcome';
import { setTestabilityGetter } from '@angular/core/src/testability/testability';

interface IPerson {

	PersonID: any;
	prename: any;
	surname: any;
	birthdate: any;
	street: any; 
	postcode: any;
	Town: any; 
	Phonenumber: any;
	Email: any;
	sex: any;


}
interface ICustomer {
	Password: string;
	CustomerID: string;
	Diagnose: string;
	SocialSecurityNumber: string;
	Insurance: string;
	PersonID: string;
	DoctorID: string;
	TherapistID: number;
  
  
  }
  interface ITherapist{
	TherapistID: number; 
	PersonID: number; 
	Username: string;
	Password: string; 
  }

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
	


 //public persons: Observable<IPerson[]>;
 public personDetails: any;
 public personCustomer: IPerson[];
 public surnameCustomer: string;
 public firstnameCustomer: string;

 public customer: ICustomer[];
 public customerDetails: any; 
 public therapistID: number;
 public therapist: ITherapist[];
 public therapistPerson: IPerson[];
 public tsurname: string;
 public tprename: string;
 public temail: string;
 public ttele: string;

 


 


	constructor(public navCtrl: NavController, public app: App, public http: HttpClient ) { 
		const data = JSON.parse(localStorage.getItem('loggedCustomer'));
		const dataPerson = JSON.parse(localStorage.getItem('loggedPerson'));
		this.personDetails = dataPerson;
		this.customerDetails = data;
		console.log(JSON.parse(localStorage.getItem('loggedCustomer')).CustomerID+"customerid");


	 }
	
	 public async ngOnInit() {

    const resultPersonCustomer : any = await this.http.get("http://localhost:8101/http://localhost:8081/api/src/person/"+this.personDetails.PersonID).toPromise();


		this.personCustomer = resultPersonCustomer.data;
		this.firstnameCustomer = this.personCustomer[0].prename;
		this.surnameCustomer = this.personCustomer[0].surname;

	const resultCustomer : any = await this.http.get("http://localhost:8101/http://localhost:8081/api/src/customer/"+this.customerDetails.CustomerID).toPromise();

		this.customer = resultCustomer.data;

	const resultTherapist : any = await this.http.get("http://localhost:8101/http://localhost:8081/api/src/therapist/"+this.customer[0].TherapistID).toPromise();
		
	this.therapist = resultTherapist.data;

	
	const resultPersonTherapist : any = await this.http.get("http://localhost:8101/http://localhost:8081/api/src/person/"+this.therapist[0].PersonID).toPromise();	

	this.therapistPerson = resultPersonTherapist.data;


	 this.tsurname = this.therapistPerson[0].surname;
	 this.tprename = this.therapistPerson[0].prename;
	 this.temail = this.therapistPerson[0].Email;
	 this.ttele = this.therapistPerson[0].Phonenumber;
	}
	
/*
   getNames() {
	  this.authservice.getNames()
	  .then(data => {
	    this.customers = data;
	  });
}
*/
  onLoadNewPlace() {
		this.navCtrl.push(MytasksPage);
	//	console.log((this.person.surname),"1337");
}
	backToWelcome(){
		//const root = this.app.getRootNav();
		const root = this.app.getRootNav();
		  root.popToRoot();


	}
  logout(){
		//Api Token für logout 
		localStorage.clear();
		setTimeout(() => this.backToWelcome(), 1000);
  	//this.navCtrl.push(WelcomePage);
  }
  
}
