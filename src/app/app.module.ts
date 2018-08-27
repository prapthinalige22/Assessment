import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';  
import { MatButtonModule, MatInputModule, MatIconModule, MatFormFieldModule, MatSidenavModule, MatTabsModule, MatTreeModule } from '@angular/material';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayersTreeComponent } from './players-tree/players-tree.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    PlayersTreeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,  
    ReactiveFormsModule,      
    MatButtonModule, 
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatTabsModule,
    MatTreeModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
