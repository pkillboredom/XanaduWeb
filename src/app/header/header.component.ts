
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  headerTitle = '...';

  constructor(public afAuth: AngularFireAuth) {
  }
  login() {
    if (this.afAuth.auth.currentUser == null) {
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(value => {
          this.headerTitle = this.afAuth.auth.currentUser.email;
        })
        .catch(err => {
          this.headerTitle = 'Something went wrong signing in the user!';
        });
    } else {
      this.headerTitle = 'User already signed in!';
    }
  }

  logout() {
    if (this.afAuth.auth.currentUser == null) {
      this.headerTitle = 'No user to sign out!';
    } else {
      this.afAuth.auth.signOut()
        .then(value => {
          this.headerTitle = 'User has signed out!';
        })
        .catch(err => {
          this.headerTitle = 'Something went wrong signing out the user!';
        });
    }
  }

  ngOnInit() {
    if (this.afAuth.auth.currentUser == null) {
      this.headerTitle = 'Please sign in!';
    } else {
      this.headerTitle = this.afAuth.auth.currentUser.email;
    }
  }

}