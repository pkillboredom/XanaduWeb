import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
// import { Task } from 'app/Task';

@Injectable()
export class FirebaseService {
  returnedObject: Response;

  constructor(private http: Http) {}

  // storeItem(input: Task, uid: string, title: string) {
  //   return this.http.patch('https://xanadu-15b3c.firebaseio.com/' + uid + '/' + title + '.json', input);
  // }

  // storeItem(input: Task, uid: string) {
  //   return this.http.patch('https://xanadu-15b3c.firebaseio.com/users/' + uid + '.json', input);
  // }

  storeItem(uid: string) {
    return this.http.patch('https://xanadu-15b3c.firebaseio.com/users/' + uid + '.json', 'TESTING');
  }

  getItem() {
    return this.http.get('https://xanadu-15b3c.firebaseio.com/users.json')
  }
}
