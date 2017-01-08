import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';


import { Drug } from './drug';
import { DrugsService } from './drugs.service';






/***************************************
*
*
***************************************/
@Component({
  selector: 'drugs-list',
  template: `

  
  <section *ngIf="errorMessage">
      <div class="alert alert-warning">
        {{errorMessage}}
      </div>
  </section>
      
    <section *ngIf="isLoading && !errorMessage">
          <div class="alert alert-warning">
  		  Loading our hyperdrives!!! Retrieving data...
          </div>
    </section>

<section>

  <section>
      <button class="btn btn-primary" (click)="gotoSelectReactionList()">Select another REACTION</button>
  </section> 


<div class="container">
  <h2>Drugs found with selected reaction</h2>
  <h3>Ordered by relevant count</h3>
         
  <table class="table table-striped  table-bordered table-hover table-responsive">
    <thead>
      <tr>
        <th>Relevant Count</th>
        <th>Generic Name</th>
	<th>Brand Name</th>
        <th>Reaction 1</th>
        <th>Reaction 2</th>
        <th>Reaction 3</th>
      </tr>
    </thead>
    <tbody>
	<tr *ngFor="let drug of drugs">
          <td>{{drug.relevantCount}}</td>
          <td>{{drug.foundGenericName}}</td>
          <td>{{drug.foundBrand_name}}</td>
	  <td>{{drug.foundReaction0}}</td> 
	  <td>{{drug.foundReaction1}}</td> 
	  <td>{{drug.foundReaction2}}</td>
        </tr>
    </tbody>
  </table>
</div>
</section>


  
  <section>
      <button class="btn btn-primary" (click)="gotoSelectReactionList()">Select another REACTION</button>
  </section>
  `
})



export class DrugsListComponent implements OnInit{
  drugs: Drug[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;
  sub: any;

  
  constructor(private drugsService: DrugsService,
                private route: ActivatedRoute,
                private router: Router){
    }


 
 
    ngOnInit(){
    
    



    }
    
    
      //##############################################################
  gotoSelectReactionList(){
        //let link = ['/drugs/'+reactionDrugCountInput+'/'+reactionInput];

        this.router.navigate(['/reactions/']);
  }
}