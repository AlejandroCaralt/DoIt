import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import * as firebase from 'firebase/app';


const { SplashScreen, StatusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor() {
    this.initializeApp();
    const firebaseConfig = {
      apiKey: "AIzaSyBcg8RQVReK4WC3FlDfHXowdo-k-1OHqKA",
      authDomain: "doit-e907f.firebaseapp.com",
      databaseURL: "https://doit-e907f.firebaseio.com",
      projectId: "doit-e907f",
      storageBucket: "doit-e907f.appspot.com",
      messagingSenderId: "451975075475"
    };
    firebase.initializeApp(firebaseConfig);
  }
  initializeApp() {
    SplashScreen.hide().catch(error => {
      console.error(error);
    });
    StatusBar.hide().catch(error => {
      console.error(error);
    });
    
  }
}