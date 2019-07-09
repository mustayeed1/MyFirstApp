import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { MembersListComponent } from './members/members-list/members-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolver/member-detail.resolver';
import { MemberListResolver } from './_resolver/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolver/member-edit.resolver';
import { PreventUnSavedChanges } from './_guards/prevent-unsave-changes.guard';
export const appRoutes : Routes = [
    { path : '', component : HomeComponent },
    {
        path:'',
        runGuardsAndResolvers:'always',
        canActivate : [AuthGuard],
        children:[
            { path : 'members', component : MembersListComponent, resolve:{users:MemberListResolver}  },
            {path: 'messages' , component: MessagesComponent},
            {path:'members/edit', component:MemberEditComponent
                    , resolve:{user:MemberEditResolver}, canDeactivate:[PreventUnSavedChanges]},
            {path: 'members/:id' , component: MemberDetailComponent, resolve: {user: MemberDetailResolver}},
            {path: 'list' , component: ListsComponent }
        ]
    },
  
    {path: '**', redirectTo:'', pathMatch: 'full'}
];
