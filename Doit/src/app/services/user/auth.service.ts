import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  loginUser(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  async signupUser(email: string, password: string): Promise<any> {
    try {
      const newUserCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      firebase
        .firestore()
        .doc(`/userProfile/${newUserCredential.user.uid}`)
        .set({ email });
    }
    catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }

}
