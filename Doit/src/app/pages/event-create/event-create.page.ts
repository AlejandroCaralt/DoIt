import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../services/event/event.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.page.html',
  styleUrls: ['./event-create.page.scss'],
})
export class EventCreatePage implements OnInit {
  public eventTitle: any;
  public eventText: any;
  constructor(private router: Router,
     private eventService: EventService) { }

  ngOnInit() { }

  createEvent(
    eventTitle: string,
    eventText: string): void {
    this.eventService
      .createEvent(eventTitle, eventText)
      .then(() => {
        this.router.navigateByUrl('home');
      });
  }
}
