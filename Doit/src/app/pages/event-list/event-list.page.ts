import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event/event.service';
import { AuthService } from '../../services/user/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ProfileService } from '../../services/user/profile.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.page.html',
  styleUrls: ['./event-list.page.scss'],
})
export class EventListPage implements OnInit {

  public eventList: Array<any>;
  public userProfile: User;
  public msg = false;

  constructor(private eventService: EventService,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private profileService: ProfileService) { }

  ngOnInit() {
    if (this.eventService.getEventList() != null) {
      this.eventService
      .getEventList()
      .get()
      .then(eventListSnapshot => {
        this.eventList = [];
        eventListSnapshot.forEach(snap => {
          this.eventList.push({
            id: snap.id,
            title: snap.data().title,
          });
          return false;
        });
        if (this.eventList.length == 0) {
          this.msg = true;
        } else {
          this.msg = false;
        }
      });
      this.profileService
      .getUserProfile()
      .get()
      .then(userProfileSnapshot => {
          this.userProfile = {
            email: userProfileSnapshot.data().email,
            firstName: userProfileSnapshot.data().firstName,
            lastName: userProfileSnapshot.data().lastName,
          }
      });
    } else {
      this.logOut();
    }
  }

  logOut(): void {
    this.authService.logoutUser().then(() => {
      this.router.navigateByUrl('login');
    });
  }

  async deleteEvent(eventId: any) {

    const alert = await this.alertController.create({
      header: 'Delete note',
      message: '',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Delete',
          handler: () => {
            this.eventService.deleteEvent(eventId).then(
              () => this.eventService.getEventList(),
                data => this.eventList = data,
            );
            this.router.navigateByUrl('event-create');
          }
        }
      ]
    });

    await alert.present();
}
}
