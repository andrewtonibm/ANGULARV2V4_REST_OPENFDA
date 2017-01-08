import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Reaction } from './reaction';

@Injectable()
export class ReactionsService{
  private baseUrl: string = 'https://api.fda.gov/drug/event.json?count=patient.reaction.reactionmeddrapt.exact';

//*****************************************
  constructor(private http : Http){
  }

//*****************************************
  getAllReactions(): Observable<Reaction[]>{
    let reactions = this.http
      .get(`${this.baseUrl}`, {headers: this.getHeaders()})
      .map(mapReactions)
      .catch(handleError);
      
      return reactions;
  }




//*****************************************
  private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
}

//*****************************************
function toReaction(r:any): Reaction{
  let reaction = <Reaction>({

    foundReactionmeddrapt: r.term


  });
  //console.log('Parsed reaction:', reaction);
  return reaction;
}
//*****************************************
function mapReactions(response:Response): Reaction[]{

    let reactionArray: Array < Reaction > = response.json().results.map(toReaction);


reactionArray.sort(function(a, b){
    var nameA=a.foundReactionmeddrapt, nameB=b.foundReactionmeddrapt;
    if (nameA < nameB) //sort string ascending
        return -1 
    if (nameA > nameB)
        return 1
    return 0 //default return value (no sorting)
})
   //return response.json().results.map(toReaction);
   return reactionArray;
}


//*****************************************
// to avoid breaking the rest of our app
// I extract the id from the reaction url
function extractId(reactionData:any){
  let extractedId = reactionData.url.replace('http://swapi.co/api/reactions/','').replace('/','');
  return parseInt(extractedId);
}

function mapReaction(response:Response): Reaction{
  // toReaction looks just like in the previous example
  return toReaction(response.json());
}


//*****************************************
// this could also be a private method of the component class
function handleError (error: any) {
  // log error
  // could be something more sofisticated
  let errorMsg = error.message || `Yikes! There was was a problem with our hyperdrive device and we couldn't retrieve your data!`
  console.error(errorMsg);

  // throw an application level error
  return Observable.throw(errorMsg);
}
