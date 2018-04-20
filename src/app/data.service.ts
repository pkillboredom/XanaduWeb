
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject<string>('Your output will show up here!');
  currentMessage = this.messageSource.asObservable();

  private showHistorySource = new BehaviorSubject<string>('true');
  showHistory = this.showHistorySource.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  changeHistory(message: string) {
    this.showHistorySource.next(message)
  }

}
