import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

const config = {
  apiKey: 'AIzaSyBcg8RQVReK4WC3FlDfHXowdo-k-1OHqKA',
  authDomain: 'doit-e907f.firebaseapp.com',
  databaseURL: 'https://doit-e907f.firebaseio.com',
  projectId: 'doit-e907f',
  storageBucket: 'doit-e907f.appspot.com',
  messagingSenderId: '451975075475'
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
