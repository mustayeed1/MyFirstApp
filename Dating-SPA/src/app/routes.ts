import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { MembersListComponent } from './members-list/members-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
export const appRoutes : Routes = [
    { path : '', component : HomeComponent },
    {
        path:'',
        runGuardsAndResolvers:'always',
        canActivate : [AuthGuard],
        children:[
            { path : 'members', component : MembersListComponent  },
            {path: 'messages' , component: MessagesComponent},
            {path: 'list' , component: ListsComponent }
        ]
    },
  
    {path: '**', redirectTo:'', pathMatch: 'full'}
];
