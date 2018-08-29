import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';  
import { FileSelectDirective } from 'ng2-file-upload';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './interceptors/request-interceptor';
import { MatCardModule,  MatToolbarModule, MatButtonModule, MatInputModule, MatIconModule, MatFormFieldModule, MatSidenavModule, MatTabsModule, MatTreeModule } from '@angular/material';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayersTreeComponent } from './players-tree/players-tree.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    PlayersTreeComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,  
    ReactiveFormsModule, 
    MatCardModule,     
    MatButtonModule, 
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatTabsModule,
    MatTreeModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
