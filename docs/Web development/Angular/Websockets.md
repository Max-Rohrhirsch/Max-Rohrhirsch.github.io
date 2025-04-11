# Websockets

<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
<div>

### Angular
```bash
ng g s websocket
ng g c chat
```
```typescript
// websocket.service.ts

import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    private socket$: WebSocketSubject;

    constructor() {
        this.socket$ = webSocket({
            url: 'ws://localhost:8080/chat',
            deserializer: (e) => e.data,
            serializer: (value) => value
        });
    }

    sendMessage(message: string) {
        this.socket$.next(message);
    }

    getMessages(): Observable {
        return this.socket$.asObservable();
    }

    close() {
        this.socket$.complete();
    }
}
```
```typescript
export class ChatComponent implements OnInit, OnDestroy {
    message: string = '';
    messages: string[] = [];
    private messageSubscription: Subscription = new Subscription();

    constructor(private websocketService: WebsocketService) {}

    ngOnInit() {
        this.messageSubscription = this.websocketService.getMessages().subscribe(
            (message) => {
                this.messages.push(message);
            },
            (err) => console.error(err)
        );
    }

    sendMessage() {
        if (this.message) {
            this.websocketService.sendMessage(this.message);
            this.message = '';
        }
    }

    ngOnDestroy(): void {
        this.messageSubscription.unsubscribe();
        this.websocketService.close();
    }
}
```
```html
<div>
<h2>WebSocket Chat</h2>

<div *ngFor="let message of messages">
    <p>{{ message }}</p>
</div>

<input
    type="text"
    [(ngModel)]="message"
    placeholder="Type your message here..."
/>
<button (click)"sendMessage()">Send</button>
</div>
```

</div>
<div>

## SpringBoot
```kt
implementation("org.springframework.boot:spring-boot-starter-websocket")
implementation("org.springframework.boot:spring-boot-starter-web")
implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
implementation("org.jetbrains.kotlin:kotlin-reflect")
implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
testImplementation("org.springframework.boot:spring-boot-starter-test")
```
```kt
@Configuration
@EnableWebSocket
class WebSocketConfig: WebSocketConfigurer {
    override fun registerWebSocketHandlers(registry: WebSocketHandlerRegistry) {
        registry.addHandler(ChatWebSocketHandler(), "/chat")
                .setAllowedOrigins("*")
    }
}
```
```kt
class ChatWebSocketHandler: TextWebSocketHandler() {
    private val sessions: MutableSet<WebSocketSession> = HashSet()

    override fun afterConnectionEstablished(session: WebSocketSession) {
        sessions.add(session)
        session.sendMessage(TextMessage("Welcome to the WebSocket chat!"))
    }

    override fun handleTextMessage(session: WebSocketSession, message: TextMessage) {
        sessions.filter { it.isOpen && it.id != session.id }
                .forEach { it.sendMessage(TextMessage("Broadcast: ${message.payload}")) }
    }

    override fun afterConnectionClosed(session: WebSocketSession, status: CloseStatus) {
        sessions.remove(session)
    }
}
```
</div>
</div>