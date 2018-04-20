
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Response } from '@angular/http';
import { FirebaseService } from '../firebase.service';
import { DataService } from "../data.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  history: any[];
  fullTextHistory: any[] = new Array();
  headerTitle = '...';
  showNoHistoryMessage = false;
  currentUser = "NO USER";

  constructor(public db: AngularFireDatabase,
              public afAuth: AngularFireAuth,
              private data: DataService,
              private firebaseService: FirebaseService) {
    if (this.afAuth.auth.currentUser == null) {
      this.showNoHistoryMessage = true;
      this.currentUser = "NO CURRENT USER";
    } else {
      this.showNoHistoryMessage = false;
      this.currentUser = "THERE IS A CURRENT USER";
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          console.log("User signed in");
        } else {
          // No user is signed in.
          console.log("User signed out");
        }
      });
    }
    // db.list('/courses').valueChanges()
    //   .subscribe(historyItem => {
    //     this.history = historyItem;
    //     console.log(this.history)
    //     this.showNoHistoryMessage = false;
    //   })
    // console.log("Show history: " + this.showNoHistoryMessage);
  }

  retrieveText(input: string) {
    this.data.changeMessage(input);
  }

  getRightText(input: string): string {
    console.log(".......: " + input);
    console.log("TYPE: " + typeof this.history);
    for (let i = 0; i < this.history.length; i++) {
      console.log(this.history);
      console.log("HISTORY SIZE: " + this.history.length);
      console.log("FULL TEXT HISTORY SIZE: " + this.fullTextHistory.length);
      console.log("--- TEXT HISTORY ---");
      for (let j = 0; j < history.length; j++) {
        console.log(j + ": " + history[j]);

      }
      console.log("--- FULL TEXT HISTORY ---");
      for (let j = 0; j < this.fullTextHistory.length; j++) {
        console.log(j + ": " + this.fullTextHistory[j]);
      }
      let preview = this.fullTextHistory[i].substring(0, 10);
      if (this.fullTextHistory[i].length > 10) {
        preview = preview + '...';
      }
      console.log("Comparing: " + preview + " to " + input);
      if (preview === input) {
        return this.fullTextHistory[i];
      } else {
        //continue
      }
    }
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log("USER 1111111");
        this.showNoHistoryMessage = false;
        console.log("SHOW NO HISTORY MESSAGE: " + this.showNoHistoryMessage);

        this.history = [];
        this.fullTextHistory = [];
        var query = firebase.database().ref("users").orderByKey();
        query.once("value")
          .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
              // key will be "ada" the first time and "alan" the second time
              var key = childSnapshot.key;
              console.log("TRUST: " + key)
              if (this.afAuth.auth.currentUser.uid.toString() === key) {
                // childData will be the actual contents of the child
                var childData = childSnapshot.val();
                console.log("YOOOO: " + key)
                childSnapshot.forEach(function(itemSnapshot) {
                  var keyItem = itemSnapshot.key;
                  var itemValue = itemSnapshot.val();
                  console.log("ITEM VALUE: " + itemValue);
                  console.log("YAYYYY: " + itemValue);
                  let preview = itemValue.substring(0, 10);
                  if (itemValue.length > 10) {
                    preview = preview + '...';
                  }
                  this.history.push(preview);
                  this.fullTextHistory.push(itemValue);
                  // this.fullTextHistory.push(itemValue);
                }.bind(this))
              }
            }.bind(this));
          }.bind(this));

      } else {
        console.log("USER 2222222");
        this.showNoHistoryMessage = true;
        console.log("SHOW NO HISTORY MESSAGE: " + this.showNoHistoryMessage);
      }
    }.bind(this));

    if (this.afAuth.auth.currentUser == null) {
      this.headerTitle = 'Please sign in!';
    } else {
      this.headerTitle = this.afAuth.auth.currentUser.email;
    }
  }

}
