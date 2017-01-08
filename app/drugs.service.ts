import {
    Injectable
} from '@angular/core';
import {
    Http,
    Response,
    Headers
} from '@angular/http';
import {
    Observable
} from 'rxjs/Rx';
import {
    Drug
} from './drug';

@Injectable()
export class DrugsService {

//https://api.fda.gov/drug/event.json?search=patient.reaction.reactionmeddrapt:%22headache%22+AND+patient.reaction.reactionmeddrapt:%22Vomiting%22&limit=100;

    private URL_allEventListByReaction: string = 'https://api.fda.gov/drug/event.json?search='; 


    constructor(private http: Http) {}




    //*************** getAll() **************************
    getAllDrugs(reactionSelected: string, reactionSelected2: string, reactionSelected3: string, reactionSelected4: string): Observable < Drug[] > {

	let queryString = `${this.URL_allEventListByReaction}patient.reaction.reactionmeddrapt:%22${reactionSelected}%22+AND+patient.reaction.reactionmeddrapt:%22${reactionSelected2}%22+AND+patient.reaction.reactionmeddrapt:%22${reactionSelected3}%22+AND+patient.reaction.reactionmeddrapt:%22${reactionSelected4}%22&limit=100`;
        console.log('Maker 1');

        let drugs$ = this.http
            .get(queryString, {headers: this.getHeaders()})
            .map(mapDrugs)
            .catch(handleError);
	    
	    
        console.log('Maker 2');
		    
        return drugs$;
    }




    private getHeaders() {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        return headers;
    }
}




//============================================
function mapDrugs(response: Response): Drug[] {

    let drugArray: Array < Drug > = response.json().results.map(toDrug);




    var drugArrayMap = new Map();
    var dropcount = 0;
    for (var i = 0; i < drugArray.length; i++) {

        try {

            let value: Drug = drugArray[i];
            let key: string = value.foundGenericName[0];

            //let existDrug:Drug = drugArrayMap.get(key);
            let existDrug = drugArrayMap.get(key);
	    let myDrug: Drug= <Drug> existDrug;

            if (typeof existDrug !== "undefined") {
                //DUPLICATED
		myDrug.relevantCount++;
                console.log('Duplicate=' + key);
            } else {

                if (value.foundGenericName == "n/a") continue;

                //NEW, not duplicate
                value.relevantCount = 1;
                drugArrayMap.set(key, value);
                console.log('Adding=' + key);
            }
        } catch (err) {
            continue;
        }


    }; //for




    var noDuplicatedDrugArray = new Array();

    var mapIter = drugArrayMap.values();
    for (var i = 0; i < drugArrayMap.size; i++) {

        try {

            //let value:Drug = mapIter.next().value;
            let value = mapIter.next().value;

            noDuplicatedDrugArray.push(value);

        } catch (err) {
            continue;
        }


    }; //for


noDuplicatedDrugArray.sort(function(a, b){
    var nameA=a.relevantCount, nameB=b.relevantCount;
    if (nameA < nameB) //sort string ascending
        return 1 
    if (nameA > nameB)
        return -1
    return 0 //default return value (no sorting)
})

    console.log(noDuplicatedDrugArray.length);

    return noDuplicatedDrugArray;



}



//*****************************************
function toDrug(r: any): Drug {
    let tempGenericName = 'n/a';
    try {
        tempGenericName = r.patient.drug[0].openfda.generic_name;
        tempGenericName = tempGenericName.substring(0, 40);
    } catch (e) {}

    let tempBrandName = 'n/a';
    try {
        tempBrandName = r.patient.drug[0].openfda.brand_name;
        tempBrandName = tempBrandName.substring(0, 40);
    } catch (e) {}

    let tempReaction0 = 'n/a';
    try {
        tempReaction0 = r.patient.reaction[0].reactionmeddrapt;
    } catch (e) {}

    let tempReaction1 = 'n/a';
    try {
        tempReaction1 = r.patient.reaction[1].reactionmeddrapt;
    } catch (e) {}

    let tempReaction2 = 'n/a';
    try {
        tempReaction2 = r.patient.reaction[2].reactionmeddrapt;
    } catch (e) {}

    let tempReaction3 = 'n/a';
    try {
        tempReaction3 = r.patient.reaction[3].reactionmeddrapt;
    } catch (e) {}

    let drug = < Drug > ({
        foundGenericName: tempGenericName,
        foundBrand_name: tempBrandName,
        foundReaction0: tempReaction0,
        foundReaction1: tempReaction1,
        foundReaction2: tempReaction2,
        foundReaction3: tempReaction3
    });
    //console.log('Parsed drug:', drug);
    return drug;
}




//*****************************************
function mapReaction(response: Response): Drug {
    // toReaction looks just like in the previous example
    return toDrug(response.json());
}


//*****************************************
// this could also be a private method of the component class
function handleError(error: any) {
    // log error
    // could be something more sofisticated
    let errorMsg = error.message || `Yikes! There was was a problem with our hyperdrive device and we couldn't retrieve your data!`
    console.error(errorMsg);

    // throw an application level error
    return Observable.throw(errorMsg);
}