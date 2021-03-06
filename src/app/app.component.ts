import { Component, ViewChild } from '@angular/core';
import { Annotation, NgxAnnotateTextComponent } from 'ngx-annotate-text';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('annotateText') ngxAnnotateText: NgxAnnotateTextComponent;

  text: string = 'On August 1, we went on vacation to Barcelona, Spain. Our flight took off at 11:00 am.';

  annotations: Annotation[] = [
    new Annotation(3, 11, 'Date', '#0069d9'),
    new Annotation(36, 45, 'City', '#dc3545'),
    new Annotation(47, 52, 'Country', '#28a745'),
    new Annotation(77, 85, 'Time', '#5a6268'),
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
