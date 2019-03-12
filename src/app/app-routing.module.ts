import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuperSecretComponent } from './super-secret/super-secret.component';
import { PhraseListComponent } from "./phrase-list/phrase-list.component";
import { PhraseCreateComponent } from "./phrase-create/phrase-create.component";
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'login', redirectTo: 'app-root' },
  { path: 'secret', component: SuperSecretComponent, canActivate: [AuthGuard]},
  { path: 'phrases', component: PhraseListComponent, canActivate: [AuthGuard]},
  { path: 'phrase-create', component: PhraseCreateComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
