## **1. Pipes**

Formatieren Daten im Template.

**Beispiel:**

```html
<p>{{ price | currency:'EUR' }}</p>
<p>{{ today | date:'dd.MM.yyyy' }}</p>
<p>{{product.price | geld}}</p>
```

**Eigene Pipe:**

```tsx
@Pipe({ name: 'geld' })
export class GeldPipe implements PipeTransform {
  transform(value: number, currency: string = 'EUR'): string {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency
    }).format(value);
  }
}
```

**Anwendung:** Datenformatierung, Übersetzungen, Berechnungen.

ng g p pipes/my-pipe

---

## **2. RxJS & Observables**

Asynchrones Arbeiten mit Datenströmen.

**Beispiel:**

```tsx
this.http.get<User[]>('/api/users')
  .pipe(map(users => users.filter(u => u.active)))
  .subscribe(activeUsers => this.users = activeUsers);
```

**Anwendung:** HTTP-Requests, Echtzeit-Updates (WebSocket), Event-Streams.

---

## **3. Forms**

Zwei Varianten: **Template-driven** & **Reactive Forms**.

**Reactive Example:**

```html
<form [formGroup]="form" (ngSubmit)="submit()">
  <input formControlName="email"><br>
  <input formControlName="password"><br>
  <input formControlName="nickname"><br>
  <button type="submit">Senden</button>
</form>
```

```tsx
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('Email', Validators.required),
    password: new FormControl('', Validators.required),
    nickname: new FormControl('Nickname')
  })

  submit() {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
      // Here you would typically send the form data to your backend
    } else {
      console.log('Form is invalid');
    }
  }
}
```

Complexeres beispiel:

```tsx
form = new FormGroup({
  emails: new FormArray([
    new FormControl('', [Validators.required, Validators.email])
  ])
});

addEmail() {
  (this.form.get('emails') as FormArray).push(
    new FormControl('', [Validators.required, Validators.email])
  );
}
```

```html
<form [formGroup]="form" (ngSubmit)="submit()">
  <div formArrayName="emails">
    <div *ngFor="let email of form.get('emails').controls; let i = index">
      <input [formControlName]="i">
    </div>
  </div>
  <button (click)="addEmail()">Weitere E-Mail</button>
  <button type="submit">Senden</button>
</form>
```

Weiteres komplexes beispiel

```tsx
form = new FormGroup({
  password: new FormControl('', Validators.required),
  confirm: new FormControl('', Validators.required),
}, { validators: this.passwordsMatch });

passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const pw = group.get('password')?.value;
  const confirm = group.get('confirm')?.value;
  return pw === confirm ? null : { notMatching: true };
}
```

```tsx
<form [formGroup]="form" (ngSubmit)="submit()">
  <input formControlName="password" type="password">
  <input formControlName="confirm" type="password">
  <div *ngIf="form.errors?.notMatching">Passwörter stimmen nicht überein</div>
  <button type="submit">Senden</button>
</form>

```

---

## **4. Interceptors**

HTTP-Anfragen zentral abfangen & modifizieren.

ng g interceptor auth

**Beispiel:**

main.ts:

```tsx
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([loggingInterceptor]),
    )
  ]
});
```

```tsx
export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Request made with ', req);
  return next(req).pipe(
    tap((event: { type: any; }) => {
      if (event.type === HttpEventType.Response) {
        console.log('Response received with ', event);
      }
    })
  );
};

```

und bei einem token:

```tsx
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token'); // oder aus Service
  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;
  return next(authReq);
};
```

**Anwendung:** Authentifizierung, Logging, Error Handling.

---

## **5. Signals** (neu in Angular 16)

Reaktive Zustände ohne RxJS.

**Beispiel:**

```tsx
const count = signal(0);

// Reaktive Wirkung
effect(() => {
  console.log('Count hat sich geändert:', count());
});

count.set(1); // -> löst effect aus
count.update(c => c + 1); // -> löst effect erneut aus
```

**Anwendung:** State Management, UI-Updates ohne Observable-Boilerplate.

---

## **6. Dynamic Component Loading**

Komponenten zur Laufzeit laden.

**Beispiel:**

```tsx
@ViewChild('container', { read: ViewContainerRef }) vcr!: ViewContainerRef;

loadComponent() {
  const compRef = this.vcr.createComponent(MyDynamicComponent);
  compRef.instance.data = 'Hallo';
}
```

**Anwendung:** Modale, dynamische Dashboards, Plug-in-Systeme.

---

## **7. Testing**

Unit-Tests & End-to-End-Tests.

**Unit-Test:**

```tsx
it('should add two numbers', () => {
  expect(service.add(2,3)).toBe(5);
});
```

**Anwendung:** Qualitätssicherung, Fehlervermeidung.

.spec. files sind beriets unit tests. 

bei http problemen:

```tsx
import { NgModule } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

@NgModule({
  imports: [HttpClientTestingModule],
  providers: [
    { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } }
  ],
  exports: [HttpClientTestingModule]
})
export class TestUtilsModule {}

```

und dass in jedem test importieren

ansonsten e2e tests:

npm install cypress --save-dev

npx cypress open

cypress run 

```tsx
describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://localhost:4200')
    cy.contains('Produkt Liste')

  })
})
```

---

## **8. Internationalisierung (i18n)**

Mehrsprachige Apps.

**Beispiel:**

npm install @ngx-translate/core @ngx-translate/http-loader --save

ng add @angular/localize

```tsx
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([loggingInterceptor]),
    ),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useClass: TranslateHttpLoader }
      })
    ),
    {
      provide: TRANSLATE_HTTP_LOADER_CONFIG,
      useValue: { prefix: './assets/i18n/', suffix: '.json' }
    }
  ]
});
```

```tsx
export class HomeComponent {
  constructor(private translate: TranslateService) {}
  switchLanguage(lang: string) {
    this.translate.use(lang);
  }
}

<h1>{{ 'TITLE' | translate }}</h1>

<app-product-list></app-product-list>
<button (click)="switchLanguage('de')">Deutsch</button>
<button (click)="switchLanguage('en')">Englisch</button>
```

```tsx
{
  "TITLE": "Mein Angular Shop",
  "BUY": "Kaufen"
}
// src/assets/i18n/de.json
```

```tsx
// alle anderen module:
imports: [
    TranslateModule
],

<h1>{{'BUY' | translate}}</h1>
```

Dann mit Angular CLI extrahieren & übersetzen.

**Anwendung:** Globale Apps, Mehrsprachigkeit.

---

---

---

## **11. PWA-Unterstützung**

Offlinefähige Web-App.

**Beispiel:**

```bash
ng add @angular/pwa
ng build --configuration production
npm install -g http-server

npx http-server -p 8080 ./dist/shop-frontend/browser

ngsw-config.json bearbeiten für caching
```

**Anwendung:** Offline-Nutzung, Push-Benachrichtigungen.

---

## **12. Preloading Strategies**

Module im Hintergrund vorladen.

**Beispiel:**

```tsx
RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
```

**Anwendung:** Kombination aus Lazy Loading & schneller Navigation.

---

### `app-shell`

**Was:**

Statische HTML-Version deiner App für schnelleren First Paint (SEO, Ladezeit).

**Anwendungsfall:**

Besseres UX bei schlechter Verbindung.

**Beispiel:**

```bash
ng generate app-shell

```

### `directive`

**Was:**

Erweiterung von HTML-Elementen (z. B. Hover-Farbe ändern).

**Anwendungsfall:**

Wiederverwendbares Verhalten.

**Beispiel:**

```tsx
@Directive({ selector: '[appHighlight]' })
export class HighlightDirective {
  @HostListener('mouseenter') onMouseEnter() { /* Style ändern */ }
}

```

### **2. Web Worker – genaueres Beispiel**

**Ziel:** große Fibonacci-Zahl berechnen, ohne UI zu blockieren.

### Schritt 1: Worker generieren

```bash
ng generate web-worker fibo

```

### `fibo.worker.ts`

```tsx
addEventListener('message', ({ data }) => {
  const result = fibonacci(data);
  postMessage(result);
});

function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

```

### `component.ts`

```tsx
if (typeof Worker !== 'undefined') {
  const worker = new Worker(new URL('./fibo.worker', import.meta.url), { type: 'module' });

  worker.onmessage = ({ data }) => {
    console.log(`Ergebnis: ${data}`);
  };

  worker.postMessage(40); // Lange Berechnung
}

```

```tsx
  constructor(private translate: TranslateService) {
    const lang = localStorage.getItem('lang') ?? 'en';
    this.switchLanguage(lang)
  }
  switchLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }
```

---

### Installation (empfohlen):

```bash
npm install ngx-indexed-db

```

### Setup (`app.module.ts`):

```tsx
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';

const dbConfig: DBConfig = {
  name: 'MyDB',
  version: 1,
  objectStoresMeta: [
    {
      store: 'notes',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'title', keypath: 'title', options: { unique: false } },
        { name: 'content', keypath: 'content', options: { unique: false } }
      ]
    }
  ]
};

@NgModule({
  imports: [NgxIndexedDBModule.forRoot(dbConfig)],
})
export class AppModule {}

```

### Nutzung im Service:

```tsx
constructor(private dbService: NgxIndexedDBService) {}

addNote(note: { title: string; content: string }) {
  return this.dbService.add('notes', note);
}

getNotes() {
  return this.dbService.getAll('notes');
}

```

local storage data