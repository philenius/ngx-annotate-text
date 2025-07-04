# CHANGELOG

## 20.0.0

Pull request: https://github.com/philenius/ngx-annotate-text/pull/35

- Upgrade to Angular 20.0.0

## 19.0.0

Pull request: https://github.com/philenius/ngx-annotate-text/pull/34

- Upgrade to Angular 19.2.0

## 18.0.0

Pull request: https://github.com/philenius/ngx-annotate-text/pull/30

- Upgrade to Angular 18.2.0

## 17.3.0

Pull request: https://github.com/philenius/ngx-annotate-text/pull/29

- Adds the optional input `annotationRendererComponent` that defines which Angular component shall be used for rendering the annotations. By default, it uses the provided `NgxAnnotationRendererComponent`. You can implement your own annotation rendering component to customize the visualization of annotations. The custom component must implement the interface `NgxAnnotationRendererComponentInterface`. This implements feature request https://github.com/philenius/ngx-annotate-text/issues/9.
- Update dependencies

## 17.2.0

Pull request: https://github.com/philenius/ngx-annotate-text/pull/22

- Upgrade to Angular 17.2.0

## 16.0.1

Pull request: https://github.com/philenius/ngx-annotate-text/pull/21

- Npm audit fix

## 16.0.0

Pull request: https://github.com/philenius/ngx-annotate-text/pull/17

- Upgrade to Angular 16.0.0

## 15.2.5

Pull request: https://github.com/philenius/ngx-annotate-text/pull/16

- Bumps socket.io-parser and socket.io. These dependencies needed to be updated together:
  - Updates socket.io-parser from 4.0.5 to 4.2.3
  - Updates socket.io from 4.5.0 to 4.6.1.

## 15.2.4

Pull request: https://github.com/philenius/ngx-annotate-text/pull/15

- Hotfix: increase dependent Angular version from v14 to v15

## 15.2.3

Pull request: https://github.com/philenius/ngx-annotate-text/pull/14

- Upgrade to Angular 15.2.3

## 14.1.1

Pull request: https://github.com/philenius/ngx-annotate-text/pull/13

- Bumps `http-cache-semantics` from 4.1.0 to 4.1.1

## 14.1.0

Pull request: https://github.com/philenius/ngx-annotate-text/pull/12

- Adds the output `clickAnnotation` to the `ngx-annotate-text` component which emits the selected annotation when the user clicks on an annotation as requested in #10.
- Adds the output `removeAnnotation` to the `ngx-annotate-text` component which emits the selected annotation when the user removes an annotation by clicking the annotation's X button in the upper right corner.

## 14.0.0

Pull request: https://github.com/philenius/ngx-annotate-text/pull/11

- Upgrade to Angular 14.2.12, thank you @miccou for your contribution

## 13.0.0

Pull request: https://github.com/philenius/ngx-annotate-text/pull/7

- Upgrade to Angular 13.3.0

## 12.0.0

Pull request: https://github.com/philenius/ngx-annotate-text/pull/6

- Upgrade to Angular 12.2.0

## 11.0.0

Pull request: https://github.com/philenius/ngx-annotate-text/pull/5

- Upgrade to Angular 11.2.14
- Replace TSLint by ESLint
- Fix linting errors and errors due to strict null checks
- Add new method `isOverlappingWithExistingAnnotations()` to check whether the current text selection overlaps with the existing annotations.

## 10.0.0

Commit: https://github.com/philenius/ngx-annotate-text/commit/c2da60bef3b48a111ddfe486666b966e701beff1

- Change versioning of this NPM package to align it with Angular versions (Angular 10.1.6)

## 0.1.4

Pull request: https://github.com/philenius/ngx-annotate-text/pull/4

- Replace import of `BrowserModule` by `CommonModule` to fix issue https://github.com/philenius/ngx-annotate-text/issues/2:
  ```
  BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.
  ```
- Refactor code for tokenization and improve code coverage
