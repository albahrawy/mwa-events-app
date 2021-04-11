import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'users', loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'events', canLoad: [AuthGuard],
    loadChildren: () => import('./Events/events-module').then(m => m.EventsModule)
  },
  {
    path: '', redirectTo: 'users', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: 'events'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
