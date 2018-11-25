import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class EventService {

  public currentUserName: string;
  public eventListRef: firebase.firestore.CollectionReference;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.eventListRef = firebase
          .firestore()
          .collection(`/userProfile/${user.uid}/eventList`);
        this.currentUserName = user.email;
      }
      console.log(firebase.firestore().collection(`/userProfile/${user.uid}/firstName`));
    });
  }

  createEvent(
    eventTitle: string,
    eventText: string
  ): Promise<firebase.firestore.DocumentReference> {
    return this.eventListRef.add({
      title: eventTitle,
      text: eventText
    });
  }
  getUserName() {
    return this.currentUserName ;
  }

  getEventList(): firebase.firestore.CollectionReference {
    return this.eventListRef;
  }
  getEventDetail(eventId: string): firebase.firestore.DocumentReference {
    return this.eventListRef.doc(eventId);
  }
  deleteEvent(eventId: string): Promise<any> {
    return this.eventListRef.doc(eventId).delete();
  }
}