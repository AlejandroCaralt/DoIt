import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public userProfile: firebase.firestore.DocumentReference;
  public currentUser: firebase.User;
  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.userProfile = firebase.firestore().doc(`/userProfile/${user.uid}`);
      }
    });
  }
  getUserProfile(): firebase.firestore.DocumentReference {
    return this.userProfile;
  }
  updateName(firstName: string, lastName: string): Promise<any> {
    return this.userProfile.update({ firstName, lastName });
  }
  updateDOB(birthDate: Date): Promise<any> {
    return this.userProfile.update({ birthDate });
  }
  async updateEmail(newEmail: string, password: string): Promise<any> {
    const credential: firebase.auth.AuthCredential =
      firebase.auth.EmailAuthProvider.credential(
        this.currentUser.email,
        password
      );
    try {
      await this.currentUser
        .reauthenticateAndRetrieveDataWithCredential(credential);
      this.currentUser.updateEmail(newEmail).then(() => {
        this.userProfile.update({ email: newEmail });
      });
    }
    catch (error) {
      console.error(error);
    }
  }
  async updatePassword(newPassword: string, oldPassword: string): Promise<any> {
    const credential: firebase.auth.AuthCredential =
      firebase.auth.EmailAuthProvider.credential(
        this.currentUser.email,
        oldPassword
      );
    try {
      await this.currentUser
        .reauthenticateAndRetrieveDataWithCredential(credential);
      this.currentUser.updatePassword(newPassword).then(() => {
        console.log('Password Changed');
      });
    }
    catch (error) {
      console.error(error);
    }
  }

}
