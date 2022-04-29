import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'my-app',
  template: `<h2>
      <hr /> 
      Hora Actual: {{time | date: 'mediumTime'}}
    </h2>`,
})
export class AppComponent {
  time: Date;
  timeSubject = new BehaviorSubject<Date>(new Date());
  time$ = this.timeSubject.asObservable();

  constructor() {
    this.setHour();
    this.getHour();
  }

  getHour(): void {
    this.time$.subscribe((date) => {
      this.time = date;
    });
  }

  setHour(): void {
    Observable.interval(1000)
      .map(() => new Date())
      .subscribe((date) => {
        this.timeSubject.next(date);
      });
  }
}
