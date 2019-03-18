import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { environment } from '../environments/environment';
import { MatTableModule, MatExpansionModule, MatFormFieldModule,
  MatInputModule, MatButtonModule, MatCheckboxModule, MatOptionModule, MatSelectModule, 
  MatListModule, MatIconModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SuperSecretComponent } from './super-secret/super-secret.component';
import { LoginComponent } from './login/login.component';
import { PhraseCreateComponent } from './phrase-create/phrase-create.component';
import { PhraseEditComponent } from './phrase-edit/phrase-edit.component';
import { PhraseListComponent } from './phrase-list/phrase-list.component';
import { DataService } from './services/data.service';
import { UploadFileService } from './services/upload-file.service';

@NgModule({
  declarations: [
    AppComponent,
    SuperSecretComponent,
    LoginComponent, PhraseCreateComponent, PhraseEditComponent, PhraseListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatListModule, MatIconModule,
    MatTableModule, MatExpansionModule, MatFormFieldModule, MatSelectModule,
    MatInputModule, HttpClientModule, MatButtonModule, MatCheckboxModule, MatOptionModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireDatabaseModule, AngularFireStorageModule
  ],
  providers: [DataService, UploadFileService, { provide: FirestoreSettingsToken, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
