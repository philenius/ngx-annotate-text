import { Component, ViewChild } from '@angular/core';
import { Annotation, NgxAnnotateTextComponent } from 'ngx-annotate-text';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('annotate') ngxAnnotateText: NgxAnnotateTextComponent;

  text: string = 'On August 1, we went on vacation to Spain. Our flight took off at 11:00 am. Two hours later we arrived in Barcelona.';

  annotations: Annotation[] = [
    new Annotation(3, 11, 'Date', '#0069d9'),
    new Annotation(36, 41, 'Country', '#28a745'),
    new Annotation(66, 74, 'Time', '#5a6268'),
    new Annotation(106, 115, 'City', '#dc3545'),
  ];

  addAnnotation(label: string, color: string) {
    if (this.ngxAnnotateText) {
      const selection = this.ngxAnnotateText.getCurrentTextSelection();
      if (selection) {
        this.annotations = this.annotations.concat(
          new Annotation(
            selection.startIndex,
            selection.endIndex,
            label,
            color,
          ),
        );
      }
    }
  }
}
