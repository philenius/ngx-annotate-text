# ngx-annotate-text

<img alt="GitHub Workflow Status (branch)" src="https://img.shields.io/github/workflow/status/philenius/ngx-annotate-text/Build%20&%20test%20NPM%20package/master?style=for-the-badge"> <a href="https://github.com/philenius/ngx-annotate-text/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/philenius/ngx-annotate-text?style=for-the-badge"></a> <img alt="GitHub" src="https://img.shields.io/github/license/philenius/ngx-annotate-text?style=for-the-badge"> <img alt="npm" src="https://img.shields.io/npm/v/ngx-annotate-text?style=for-the-badge"> 

An Angular component library for interactively highlighting / annotating parts of text.

![Screenshot](https://raw.githubusercontent.com/philenius/ngx-annotate-text/master/screenshot.png)

## Features

* :raised_hand: Interactively mark entities such as cities, numbers, dates, etc.
* :x: Remove annotations / marked entities.
* :tada: Purely based on CSS. No magic, no canvas, and no SVGs.



## Demo

For the demo application, please see the Angular app in `./src/app/`. Screen recording:

![Screen recording GIF](https://raw.githubusercontent.com/philenius/ngx-annotate-text/master/screen-recording.gif)

## Usage

1. Install the NPM package:

    ```bash
    npm install ngx-annotate-text
    ```

2. Import the Angular module `NgxAnnotateTextModule`:

    ```typescript
    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    
    import { AppComponent } from './app.component';
    import { NgxAnnotateTextModule } from 'ngx-annotate-text';
    
    @NgModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        NgxAnnotateTextModule,
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule { }
    ```

3. Add the component `ngx-annotate-text`  to your template:

    ```html
    <ngx-annotate-text
    	[(annotations)]="annotations"
     	[removable]="true"
    	[text]="text"
    	annotationClass="my-annotation"
    	#annotateText>
    </ngx-annotate-text>
    ```

4. Create properties in your component class for the text to be annotated and an (empty) array of annotations:

    ```typescript
    import { Component, ViewChild } from '@angular/core';
    import { Annotation, NgxAnnotateTextComponent } from 'ngx-annotate-text';
    
    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.css']
    })
    export class AppComponent {
    
      text: string = 'On August 1, we went on vacation to Barcelona, Spain. Our flight took off at 11:00 am.';
    
      annotations: Annotation[] = [
        new Annotation(3, 11, 'Date', '#0069d9'),
        new Annotation(36, 45, 'City', '#dc3545'),
        new Annotation(47, 52, 'Country', '#28a745'),
        new Annotation(77, 85, 'Time', '#5a6268'),
      ];
    
    }
    ```

    



## API - NgxAnnotateText

### Inputs

| Input           | Description                                                  | Type         | Default value |
| :-------------- | ------------------------------------------------------------ | ------------ | :------------ |
| annotations     | Represents the parts of the given text which shall be annotated. | Annotation[] | []            |
| annotationClass | An optional CSS class applied to all elements which wrap the annotated parts of the given text. | string       |               |
| removable       | Determines whether annotations shall have a small button in the top right corner so that the user can remove an annotation. | boolean      | true          |
| text            | The text which shall be displayed and annotated.             | string       |               |

### Outputs

| Output            | Description                                                  | Type                       |
| ----------------- | ------------------------------------------------------------ | -------------------------- |
| annotationsChange | Emits the list of existing annotations after an element has been removed by the user. | EventEmitter<Annotation[]> |

### Methods

| Method                  | Description                                                  | Return type |
| ----------------------- | ------------------------------------------------------------ | ----------- |
| getCurrentTextSelection | Returns the start index and end index of the currently selected text range. Returns `undefined` if no text is currently selected. | ISelection  |



## Development

### Build

Run `ng build ngx-annotate-text` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running linting tools

Run `ng lint ngx-annotate-text ` to execute TSLint.

### Running unit tests

Run `ng test ngx-annotate-text --code-coverage` to execute the unit tests via [Karma](https://karma-runner.github.io). Don't forget to set the environment variable for where to find Chrome / Chromium like so: `export CHROME_BIN=/snap/bin/chromium`.

### Publish library as an npm package

```bash
ng build ngx-annotate-text --prod
cd dist/ngx-annotate-text
npm publish
```

### Development server

Build the library in watch mode:

 ```bash
ng build ngx-annotate-text --watch
 ```

Run the Angular dev server:

```bash
ng serve --open
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.