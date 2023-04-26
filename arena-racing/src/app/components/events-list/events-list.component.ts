import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { default as _rollupMoment, Moment } from 'moment';
import { EventsServicesService } from '../../services/events-services.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css'],
  providers: [],
  encapsulation: ViewEncapsulation.None,
})
export class EventsListComponent implements OnInit {
  showList: boolean = false;
  emptyMessage: boolean = false;
  eventsData: any;
  selectedMonth: any = new Date().getMonth()+1;
  monthsArray = [
    { id: 1, value: "January" },
    { id: 2, value: "Febuary" },
    { id: 3, value: "March" },
    { id: 4, value: "April" },
    { id: 5, value: "May" },
    { id: 6, value: "June" },
    { id: 7, value: "July" },
    { id: 8, value: "August" },
    { id: 9, value: "September" },
    { id: 10, value: "October" },
    { id: 11, value: "November" },
    { id: 12, value: "December" },
  ];
  constructor(public eventsServicesService: EventsServicesService) { }
  ngOnInit() {
    this.getToken();
  }
  onMonthChange(id: any) {
    this.selectedMonth = id;
    this.getEventsByMonth();
  }
  getToken() {
    this.eventsServicesService.getJWT().subscribe((token) => {
      localStorage.setItem('tokenKey', token);
      this.getEventsByMonth();
    });
  }
  getEventsByMonth() {
    this.eventsServicesService.getEventsList(this.selectedMonth).subscribe(data => {
      this.eventsData = data;
      if (this.eventsData.length > 0) {
        this.showList = true;
        this.emptyMessage = false;
      }
      else {
        this.emptyMessage = true;
        this.showList = false;
      }
    });
  }
}
