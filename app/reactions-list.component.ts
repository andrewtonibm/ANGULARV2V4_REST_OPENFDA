// This is a modification 1b


import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';


import { Reaction } from './reaction';
import { ReactionsService } from './reactions.service';
import { Drug } from './drug';
import { DrugsService } from './drugs.service';


//AndrewCOmmand change 2 (TWO!!!), AndrewTToise change 1, AndrewCommand change 1


//##############################################################
@Component({
	selector: 'reactions-list',

	styles: [`

      .home-component{
        background-color: #bfdef2;

    }

  `],

	template: `


  <section *ngIf="errorMessage">
      <div class="alert alert-warning">
        {{errorMessage}}
      </div>
  </section>
  
<div class="home-component">




   
   
   
 
	<div class="container container-fluid">
 <div class="row" >
	      <p>
	 	 <img class="img-responsive img-circle" src="./drug.jpg" width="460" height="345">       
	      </p>
</div>
<div class="row" >

  <div class="col-sm-3">	 

  	<h3>Please choose a 1st reaction</h3>
		<select  (change)="onChangeEvent1($event.target.value)" >
  			<option *ngFor="let temp of reactions" value= {{temp.foundReactionmeddrapt}}>
				{{temp.foundReactionmeddrapt}}
  			</option>
		</select>
  </div>
    <div class="col-sm-3">	 

  	<h3>Please choose a 2nd reaction</h3>
		<select  (change)="onChangeEvent2($event.target.value)" >
  			<option *ngFor="let temp of reactions" value= {{temp.foundReactionmeddrapt}}>
				{{temp.foundReactionmeddrapt}}
  			</option>
		</select>
  </div>
    <div class="col-sm-3">	 

  	<h3>Please choose a 3rd reaction</h3>
		<select  (change)="onChangeEvent3($event.target.value)" >
  			<option *ngFor="let temp of reactions" value= {{temp.foundReactionmeddrapt}}>
				{{temp.foundReactionmeddrapt}}
  			</option>
		</select>
  </div>
    <div class="col-sm-3">	 

  	<h3>Please choose a 4th reaction</h3>
		<select  (change)="onChangeEvent4($event.target.value)" >
  			<option *ngFor="let temp of reactions" value= {{temp.foundReactionmeddrapt}}>
				{{temp.foundReactionmeddrapt}}
  			</option>
		</select>
  </div>
</div>  
	<h3>Drug count found with above four reactions:{{drugs.length}}    </h3>
  
	  <table class="table-responsive table table-striped  table-bordered">
	    <thead>
	      <tr>
	        <th>Relevant Count</th>
	        <th>Generic Name</th>
		<!--<th>Brand Name</th>-->
	        <th>Reaction 1</th>
	        <th>Reaction 2</th>
	        <th>Reaction 3</th>
	        <th>Reaction 4</th>
	      </tr>
	    </thead>
	    <tbody>
		<tr *ngFor="let drug of drugs">
	          <td>{{drug.relevantCount}}</td>
	          <td>{{drug.foundGenericName}}</td>
	         <!-- <td>{{drug.foundBrand_name}}</td>-->
		  <td>{{drug.foundReaction0}}</td> 
		  <td>{{drug.foundReaction1}}</td> 
		  <td>{{drug.foundReaction2}}</td>
		  <td>{{drug.foundReaction3}}</td>
	        </tr>
	    </tbody>
	  </table>
	</div>




      <section *ngIf="errorMessage">
        {{errorMessage}}
      </section>
</div>


  `
})

//##############################################################
export class ReactionsListComponent implements OnInit {


	selectedInput1 = "ABDOMINAL DISCOMFORT";
	selectedInput2 = "ABDOMINAL DISCOMFORT";
	selectedInput3 = "ABDOMINAL DISCOMFORT";
	selectedInput4 = "ABDOMINAL DISCOMFORT";

	//selectedReaction: Reaction=new Reaction('HEADACHE');

	reactions: Reaction[] = [];


	errorMessage: string = '';
	isLoading: boolean = true;
	sub: any;
	private show = false;


	drugs: Drug[] = [];
	mydrugs: Drug;

	//##############################################################
	constructor(private reactionsService: ReactionsService,
		private drugsService: DrugsService,
		private route: ActivatedRoute,
		private router: Router) {
	}

	ngOnInit() {


		this.reactionsService
			.getAllReactions()
			.subscribe(
         /* happy path */ p => this.reactions = p,
         /* error path */ e => this.errorMessage = e,
         /* onComplete */() => this.isLoading = false);


		this.drugsService
			.getAllDrugs(this.selectedInput1, this.selectedInput2, this.selectedInput3, this.selectedInput4)
			.subscribe(p => this.drugs = p,
			e => this.errorMessage = e,
			() => this.isLoading = false);


	}



	onChangeEvent1(reactionInput1: string) {

		this.selectedInput1 = reactionInput1;

		console.log(reactionInput1);

		this.drugsService
			.getAllDrugs(this.selectedInput1, this.selectedInput2, this.selectedInput3, this.selectedInput4)
			.subscribe(p => this.drugs = p,
			e => this.errorMessage = e,
			() => this.isLoading = false);
  }


	onChangeEvent2(reactionInput2: string) {

		this.selectedInput2 = reactionInput2;

		console.log(reactionInput2);

		this.drugsService
			.getAllDrugs(this.selectedInput1, this.selectedInput2, this.selectedInput3, this.selectedInput4)
			.subscribe(p => this.drugs = p,
			e => this.errorMessage = e,
			() => this.isLoading = false);
	}

	onChangeEvent3(reactionInput3: string) {

		this.selectedInput3 = reactionInput3;

		console.log(reactionInput3);

		this.drugsService
			.getAllDrugs(this.selectedInput1, this.selectedInput2, this.selectedInput3, this.selectedInput4)
			.subscribe(p => this.drugs = p,
			e => this.errorMessage = e,
			() => this.isLoading = false);
	}

	onChangeEvent4(reactionInput4: string) {

		this.selectedInput4 = reactionInput4;

		console.log(reactionInput4);


		this.drugsService
			.getAllDrugs(this.selectedInput1, this.selectedInput2, this.selectedInput3, this.selectedInput4)
			.subscribe(p => this.drugs = p,
			e => this.errorMessage = e,
			() => this.isLoading = false);
	}



}
