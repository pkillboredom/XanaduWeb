import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import * as nlp from 'compromise';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent implements OnInit {

  message: string;

  textToDisplay = '';

  // doc = nlp('dinosaur');

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message)
    // this.doc.nouns().toPlural();
    // alert(this.doc.out('text'));
  }

  displayPlainText(input: string) {
    this.textToDisplay = input;
  }

}
