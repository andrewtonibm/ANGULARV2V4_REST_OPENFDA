import { Routes, RouterModule } from '@angular/router';

import { ReactionsListComponent } from './reactions-list.component';
import { DrugsListComponent  } from './drugs-list.component';

// Route config let's you map routes to components
const routes: Routes = [


  //############################# map '/reactions' to the reactions list component
  //andrewton DONE CODE
  {
    path: 'reactions',
    component: ReactionsListComponent,
  },



  
  //andrewton DONE CODE
  {
    path: 'drugs/:reactionMaxCount/:reactionSelected',
    component: DrugsListComponent
  },



  //############################# map '/' to '/reactions' as our default route
  //andrewton DONE CODE
  {
    path: '',
    redirectTo: '/reactions',
    pathMatch: 'full'
  },
];

export const routing = RouterModule.forRoot(routes);
