
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  display1='none';
  display2='none';
  headerTitle = '...';

  constructor(public afAuth: AngularFireAuth) {}

  login() {
    if (this.afAuth.auth.currentUser == null) {
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(value => {
          // window.location.reload();
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
          // window.location.reload();
        })
        .catch(err => {
          this.headerTitle = 'Something went wrong signing out the user!';
        });
    }
  }

  ngOnInit() {
    if (this.afAuth.auth.currentUser == null) {
      this.headerTitle = 'please sign in!';
    } else {
      this.headerTitle = this.afAuth.auth.currentUser.email;
    }
  }

  openModal1(){


    this.display1='block';
    console.log("modal 1 open");


  }

  openModal2() {
    this.display2='block';
    console.log('modal 2 open');
  }


  onCloseHandled1(){


    this.display1='none';
    console.log("modal 1 close");


  }

  onCloseHandled2(){


    this.display2='none';
    console.log('modal 2 close');


  }

}
