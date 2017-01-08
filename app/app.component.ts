import { Component } from '@angular/core';
import { ReactionsService } from './reactions.service';
import { DrugsService } from './drugs.service';

@Component({
  selector: 'my-app',
  template: `


<div style="color:white; background-color: #2e79f2;" >
  <h2>{{title}}</h2>


</div>
   <router-outlet>

  `,
  providers: [ReactionsService, DrugsService]
})
export class AppComponent {
  title:string = 'OpenFDA drug reaction lookup system';
}
