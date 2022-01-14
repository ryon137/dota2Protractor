import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SplayerComponent } from './components/splayer/splayer.component';
import { AuthModule } from '@auth0/auth0-angular';
import { AuthButtonComponent } from './components/auth-button/auth-button.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { FormsModule } from '@angular/forms';
import { SavedPlayerComponent } from './components/saved-player/saved-player.component';
import { NgbToastModule } from 'ngb-toast';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    SplayerComponent,
    AuthButtonComponent,
    UserProfileComponent,
    SavedPlayerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    NgbToastModule,
    AuthModule.forRoot({
      domain: 'dev-ulpdvjy2.us.auth0.com',
      clientId: 'k6E8BCBB1pmYMyAFxpuCw6j025SS3Mdq'
    }),
  ],
  providers: [ HttpClientModule ],
  bootstrap: [AppComponent]
})
export class AppModule { }
