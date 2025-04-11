---
sidebar_position: 1
---

# Basic

<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
<div>

### Linux
```bash
/** Node.js must be Installed */
npm install -g @angular/cli
npm install -g @angular/cli@15.2.10
```
</div>


<div>

### Windows
```bash
/** Node.js must be Installed */
npm install -g @angular/cli@17
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```
</div>
</div>

<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>

<div>

### Init
```bash
ng new appName  /** Init project */
ng generate component componentName
```
</div>

<div>

### Run
```bash
ng serve --open

// or
ng add @angular/pwa
ng build
ng serve --open
// oben ist das install icon
```
</div>
</div>


## Code
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>

```html
<button (click)="func()"> </button>
```
```html
<p *ngIf="count <= 1> Text </p>
```
```html
<input [value]="firstName">
```
```html
<button (click)="readRainbow($event)">
```
```html
<div title="Hello {{ponyName}}">
// Binds a property to an interpolated string,
// for example, "Hello Seabiscuit". Equivalent to:
<div [title]="'Hello ' + ponyName">
```
```html
<p> {{ varName }} </p>
```
```ts
// Component.ts:
// imports: [TestoloComponent, CommonModule], if you add a componnent

export class Testolo2Component implements OnInit {
    ngOnInit() {}
}
```
</div>

---

# Angular + SpringBoot
```java
// WebConfig.java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD")
                .allowCredentials(true);
    }
}
```

```ts
// service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(private http: HttpClient) {
    }

    public getUsers(): Observable<any> {
        return this.http.get("http://localhost:8080/api/users");
    }
}
```
