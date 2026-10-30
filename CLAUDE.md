# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Angular CLI workspace (Angular 22, Node 24 per `.nvmrc`) containing two projects:

- `projects/ngx-annotate-text/` — the published npm library (`ngx-annotate-text`). Its version in `projects/ngx-annotate-text/package.json` tracks the Angular major version (e.g. 22.0.0 for Angular 22); add an entry to `CHANGELOG.md` on release.
- `src/` — demo app (`ngx-annotate-text-workspace`) that exercises the library, including a custom renderer (`src/app/my-annotation-renderer/`). It imports the library **from source via relative paths** (`../../projects/ngx-annotate-text/src/...`), so `ng serve` picks up library changes without building the library first.

## Commands

```bash
npm start                      # ng serve — demo app at http://localhost:4200
npm run build:lib:prod         # build library to dist/ngx-annotate-text
npm run build                  # build demo app
npm run lint                   # ESLint for both projects
npm run test-headless          # all Vitest unit tests, single run, with coverage
npm test                       # library tests in watch mode with Vitest UI

# Single spec file / single test (Angular unit-test builder with Vitest)
ng test ngx-annotate-text --watch=false --include='**/tokenizer.service.spec.ts'
ng test ngx-annotate-text --watch=false --filter='<test name pattern>'
```

CI (`.github/workflows/main.yml`) runs: `build:lib:prod` → `lint` → `test-headless` → `build`. Publishing to npm happens automatically via `publish.yml` when a GitHub release is created — do not publish manually.

Formatting: Prettier is configured via the `prettier` key in `package.json` (printWidth 100, singleQuote, Angular parser for HTML).

## Library architecture

Public API is exported from `projects/ngx-annotate-text/src/public-api.ts`; anything not exported there is internal (also marked `/** @internal */`).

Rendering pipeline:

1. `Annotation` (`lib/models/annotation.model.ts`) is a class with `startIndex` (inclusive) / `endIndex` (exclusive) character offsets into the text, plus `label` and `color`. `text` is filled in by the tokenizer.
2. `TokenizerService.splitTextIntoTokens(text, annotations)` splits the text into an array of plain `string` segments and `Annotation` objects (mutating each annotation's `text`). It assumes annotations don't overlap.
3. `NgxAnnotateTextComponent` re-tokenizes on `ngOnInit` and whenever the `text` or `annotations` inputs change. Its template renders strings as plain spans and renders each `Annotation` token with `*ngComponentOutlet` using the `annotationRendererComponent` input, passing inputs built by `toRecord()`.
4. Renderer components (default: `NgxAnnotationRendererComponent`) must implement `NgxAnnotationRendererComponentInterface`: inputs `annotation`, `removable`, and **callback function inputs** `clickAnnotation` / `removeAnnotation` (not outputs, since `ngComponentOutlet` only binds inputs). The parent component wires those callbacks to its own `clickAnnotation` / `removeAnnotation` outputs.

Removal: `onRemoveAnnotation` replaces the `annotations` array, emits `removeAnnotation` and `annotationsChange` (enabling `[(annotations)]` two-way binding), and re-tokenizes. Adding annotations is done by the consumer: call `getCurrentTextSelection()` (computes offsets from `window.getSelection()` relative to the host element), check `isOverlappingWithExistingAnnotations()`, then assign a new array (see `addAnnotation` in `src/app/app.ts`).

Styling is pure CSS (no SVG/canvas). Consumers customize via the `annotationClass` input combined with `::ng-deep` targeting `.annotation-parent` / `.annotation-content` — keep those class names stable since they are documented in the README.

When changing inputs, outputs, or public methods, update the API tables in `README.md` (mirrored in `projects/ngx-annotate-text/README.md`).
