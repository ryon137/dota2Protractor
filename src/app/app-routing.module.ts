import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SavedPlayerComponent } from './components/saved-player/saved-player.component';
import { SplayerComponent } from './components/splayer/splayer.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [{path:'', component: HomepageComponent},{path:'player', component: SplayerComponent},{path:'profile', component: UserProfileComponent},{path:'saved-player',component: SavedPlayerComponent}];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
