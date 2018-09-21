import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AboutComponent } from './about/about.component';
import { DisplayMessageComponent } from './display-message/display-message.component';
import { CreateMessageComponent } from './create-message/create-message.component';
import { FooterComponent } from './footer/footer.component';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { ApiCallsService} from './api-calls.service'; 
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'message/:id/:hash',      component: DisplayMessageComponent },
  { path: '', component: CreateMessageComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AboutComponent,
    DisplayMessageComponent,
    CreateMessageComponent,
    FooterComponent,
    
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
    ),
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule,MatToolbarModule, MatCardModule, MatInputModule, FormsModule
  ],
  providers: [ ApiCallsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
