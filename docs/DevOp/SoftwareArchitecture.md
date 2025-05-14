# Software-Architektur

## Grundlagen der Software-Architektur

Software-Architektur ist die grundlegende Organisation eines Systems, dargestellt durch seine Komponenten, deren Beziehungen zueinander und zur Umgebung sowie die Prinzipien, die den Entwurf und die Evolution bestimmen.

### Architekturprinzipien

#### 1. SOLID-Prinzipien
- **S**ingle Responsibility Principle: Eine Klasse sollte nur einen Grund zur Änderung haben
- **O**pen/Closed Principle: Offen für Erweiterung, geschlossen für Modifikation
- **L**iskov Substitution Principle: Objekte einer Basisklasse sollten durch Objekte ihrer Subklassen ersetzbar sein
- **I**nterface Segregation Principle: Viele spezifische Schnittstellen sind besser als eine allgemeine
- **D**ependency Inversion Principle: Abhängigkeiten sollten auf Abstraktionen basieren, nicht auf konkreten Implementierungen

#### 2. DRY (Don't Repeat Yourself)
Code-Duplikation vermeiden und gemeinsame Funktionalität abstrahieren.

```java
// Schlecht: Wiederholung
boolean isValidEmail(String email) {
    return email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");
}

boolean isValidCustomerEmail(String email) {
    return email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");
}

// Gut: DRY-Prinzip
boolean isValidEmail(String email) {
    return email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");
}
```

#### 3. KISS (Keep It Simple, Stupid)
Komplexität vermeiden und einfache Lösungen bevorzugen.

#### 4. Separation of Concerns
Trennung von Verantwortlichkeiten in unterschiedliche Module.

## Architekturmuster

### 1. Schichtenarchitektur (Layered Architecture)
Organisiert die Software in horizontale Schichten, wobei jede Schicht eine spezifische Rolle erfüllt.

**Typische Schichten:**
- Präsentationsschicht (UI)
- Anwendungsschicht (Geschäftslogik)
- Datenzugriffsschicht
- Datenschicht

```csharp
// Präsentationsschicht
public class CustomerController {
    private readonly ICustomerService _service;
    
    public CustomerController(ICustomerService service) {
        _service = service;
    }
    
    public ActionResult GetCustomer(int id) {
        var customer = _service.GetCustomer(id);
        return View(customer);
    }
}

// Anwendungsschicht
public class CustomerService : ICustomerService {
    private readonly ICustomerRepository _repository;
    
    public CustomerService(ICustomerRepository repository) {
        _repository = repository;
    }
    
    public Customer GetCustomer(int id) {
        return _repository.GetById(id);
    }
}

// Datenzugriffsschicht
public class CustomerRepository : ICustomerRepository {
    private readonly DbContext _context;
    
    public CustomerRepository(DbContext context) {
        _context = context;
    }
    
    public Customer GetById(int id) {
        return _context.Customers.Find(id);
    }
}
```

### 2. Microservices-Architektur
Strukturiert eine Anwendung als Sammlung loser gekoppelter, unabhängig bereitstellbarer Dienste.

![Microservices-Architektur](https://via.placeholder.com/800x400?text=Microservices+Architecture)

**Vorteile:**
- Unabhängige Entwicklung und Bereitstellung
- Bessere Skalierbarkeit
- Technologische Vielfalt
- Robustheit

**Beispiel einer Microservices-Struktur:**
```
e-commerce-system/
├── user-service/           # Benutzerverwaltung
├── product-service/        # Produktkatalog
├── order-service/          # Bestellverwaltung
├── payment-service/        # Zahlungsabwicklung
├── notification-service/   # Benachrichtigungen
└── api-gateway/            # API-Gateway
```

### 3. Event-Driven Architecture
Basiert auf der Produktion, Erkennung und Reaktion auf Ereignisse.

```javascript
// Publisher
class OrderService {
    placeOrder(order) {
        // Bestellung verarbeiten
        const orderPlaced = new OrderPlacedEvent(order.id, order.customer);
        eventBus.publish('ORDER_PLACED', orderPlaced);
    }
}

// Subscriber
class NotificationService {
    constructor() {
        eventBus.subscribe('ORDER_PLACED', this.handleOrderPlaced.bind(this));
    }
    
    handleOrderPlaced(event) {
        // E-Mail an Kunden senden
        emailService.send({
            to: event.customer.email,
            subject: 'Bestellung bestätigt',
            body: `Ihre Bestellung #${event.orderId} wurde erfolgreich aufgenommen.`
        });
    }
}
```

### 4. Hexagonale Architektur (Ports and Adapters)
Trennt die Kernlogik einer Anwendung von externen Abhängigkeiten wie Datenbank oder UI.

![Hexagonale Architektur](https://via.placeholder.com/800x400?text=Hexagonal+Architecture)

```java
// Kerndomäne (unabhängig von externen Abhängigkeiten)
public class OrderService {
    private OrderRepository repository;  // Interface (Port)
    private PaymentGateway paymentGateway;  // Interface (Port)
    
    public Order createOrder(OrderRequest request) {
        // Geschäftslogik
        Order order = new Order(request);
        
        // Verwendung von Ports für externe Operationen
        repository.save(order);
        paymentGateway.processPayment(order);
        
        return order;
    }
}

// Adapter für Datenbank
public class MySqlOrderRepository implements OrderRepository {
    private JdbcTemplate jdbc;
    
    @Override
    public void save(Order order) {
        // MySQL-spezifische Implementierung
    }
}

// Adapter für Zahlungsabwicklung
public class StripePaymentGateway implements PaymentGateway {
    private StripeClient client;
    
    @Override
    public void processPayment(Order order) {
        // Stripe-spezifische Implementierung
    }
}
```

### 5. Model-View-Controller (MVC)
Trennt die Daten (Model), die Benutzeroberfläche (View) und die Steuerungslogik (Controller).

```python
# Model
class User:
    def __init__(self, username, email):
        self.username = username
        self.email = email
    
    def save(self):
        # Logik zum Speichern des Benutzers in der Datenbank
        pass

# View
class UserView:
    def show_user(self, user):
        print(f"Username: {user.username}")
        print(f"Email: {user.email}")
    
    def get_user_input(self):
        username = input("Username: ")
        email = input("Email: ")
        return username, email

# Controller
class UserController:
    def __init__(self, view):
        self.view = view
    
    def create_user(self):
        username, email = self.view.get_user_input()
        user = User(username, email)
        user.save()
        self.view.show_user(user)
```

## Architekturentscheidungen und Tradeoffs

### 1. Monolith vs. Microservices

| Aspekt | Monolith | Microservices |
|--------|----------|---------------|
| Komplexität | Geringer am Anfang | Höher aufgrund verteilter Natur |
| Entwicklungsgeschwindigkeit | Schneller am Anfang | Parallele Entwicklung möglich |
| Deployment | Alles auf einmal | Unabhängig und kontinuierlich |
| Skalierbarkeit | Schwieriger | Bessere Feinabstimmung |
| Fehlertoleranz | Ein Fehler kann alles betreffen | Isolierte Fehler |
| Teamstruktur | Ein großes Team | Kleine, fokussierte Teams |

### 2. Synchron vs. Asynchron

**Synchrone Kommunikation:**
```java
// Direkter Aufruf
OrderResponse response = orderService.createOrder(orderRequest);
```

**Asynchrone Kommunikation:**
```java
// Nachrichtenbasiert
orderQueue.send(orderRequest);

// Callback-basiert
orderService.createOrderAsync(orderRequest)
    .thenAccept(response -> processResponse(response))
    .exceptionally(ex -> handleError(ex));
```

### 3. Datenbank-Entscheidungen

| Typ | Vorteile | Nachteile | Anwendungsfälle |
|-----|----------|-----------|-----------------|
| Relational (SQL) | ACID-Eigenschaften, strukturierte Daten | Skalierungsprobleme | Finanzsysteme, ERP |
| Dokument (NoSQL) | Flexibles Schema, horizontale Skalierung | Konsistenzprobleme | CMS, E-Commerce |
| Key-Value | Hohe Performance, einfaches Modell | Begrenzte Abfragefunktionen | Caching, Sessions |
| Graph | Beziehungen effizient abbilden | Komplexe Abfragesprache | Soziale Netzwerke |

## Architektur-Dokumentation

### 1. C4-Modell
Beschreibt Software auf vier Abstraktionsebenen:
- **Context**: System und seine Beziehungen zu Benutzern und anderen Systemen
- **Container**: Hochrangige technische Entscheidungen und Hauptcontainer
- **Component**: Hauptkomponenten innerhalb jedes Containers
- **Code**: Detaillierte Implementierung

### 2. Architektur-Entscheidungsaufzeichnungen (ADRs)

```markdown
# ADR 1: Verwendung von REST für die API-Kommunikation

## Status
Angenommen

## Kontext
Wir benötigen einen Kommunikationsmechanismus zwischen unseren Frontends und Backend-Diensten.

## Entscheidung
Wir werden REST als primäres API-Paradigma verwenden.

## Begründung
* REST ist weit verbreitet und gut verstanden
* Einfache Implementierung mit bestehenden Frameworks
* Gute Werkzeugunterstützung (Swagger, Postman)
* Leicht cachebar und skalierbar

## Konsequenzen
* Erhöhter Overhead bei großen Datenmengen
* Mögliche Over-/Underfetching-Probleme
* Schlechte Eignung für Echtzeit-Updates
```

## Architekturstile und deren Anwendungsfälle

### 1. REST-Architektur

```
GET /api/customers/123
```

**Vorteile:**
- Zustandslosigkeit
- Cachebar
- Einheitliche Schnittstelle

### 2. GraphQL-Architektur

```graphql
query {
  customer(id: "123") {
    name
    email
    orders {
      id
      amount
      products {
        name
        price
      }
    }
  }
}
```

**Vorteile:**
- Genau die benötigten Daten abrufen
- Vermeidung von Over-/Underfetching
- Ein Endpunkt für alle Abfragen

### 3. CQRS (Command Query Responsibility Segregation)

```csharp
// Command
public class CreateOrderCommand : ICommand
{
    public Guid CustomerId { get; set; }
    public List<OrderItem> Items { get; set; }
}

// Command Handler
public class CreateOrderCommandHandler : ICommandHandler<CreateOrderCommand>
{
    public void Handle(CreateOrderCommand command)
    {
        // Validierung und Speicherung
    }
}

// Query
public class GetOrdersQuery : IQuery<List<OrderDto>>
{
    public Guid CustomerId { get; set; }
}

// Query Handler
public class GetOrdersQueryHandler : IQueryHandler<GetOrdersQuery, List<OrderDto>>
{
    public List<OrderDto> Handle(GetOrdersQuery query)
    {
        // Optimierte Leseabfragen
        return _readRepository.GetOrdersByCustomerId(query.CustomerId);
    }
}
```

## Cloud-native Architektur

### 1. Zwölf-Faktor-App-Methodik
1. **Codebase**: Eine Codebase pro App, viele Deployments
2. **Abhängigkeiten**: Abhängigkeiten explizit deklarieren und isolieren
3. **Konfiguration**: Umgebungsvariablen zur Konfiguration nutzen
4. **Unterstützende Dienste**: Als angehängte Ressourcen behandeln
5. **Build, Release, Run**: Build- und Run-Phasen strikt trennen
6. **Prozesse**: Als zustandslose Prozesse ausführen
7. **Portbindung**: Dienste über Portbindung exportieren
8. **Nebenläufigkeit**: Durch Prozessmodell skalieren
9. **Einweggebrauch**: Schnelles Starten und problemloses Beenden
10. **Dev/Prod-Parität**: Entwicklung, Staging und Produktion so ähnlich wie möglich halten
11. **Logs**: Als Ereignisströme behandeln
12. **Admin-Prozesse**: Einmalige Admin-Aufgaben als Prozesse ausführen

### 2. Serverless-Architektur

```javascript
// AWS Lambda-Funktion
exports.handler = async (event) => {
    const data = JSON.parse(event.body);
    
    // Geschäftslogik
    const result = await processOrder(data);
    
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Order processed successfully",
            orderId: result.id
        })
    };
};
```

## Architektur-Qualitätsattribute

### Performance
- Latenz minimieren
- Durchsatz maximieren
- Ressourcennutzung optimieren

**Beispiel: Caching-Strategie**
```java
@Service
public class ProductService {
    private final ProductRepository repository;
    private final Cache<String, Product> cache;
    
    public Product getProduct(String id) {
        // Zuerst im Cache nachsehen
        Product product = cache.get(id);
        if (product == null) {
            // Bei Cache-Miss aus Datenbank laden
            product = repository.findById(id).orElseThrow();
            // Im Cache speichern
            cache.put(id, product);
        }
        return product;
    }
}
```

### Skalierbarkeit
- Horizontale Skalierung (mehr Instanzen)
- Vertikale Skalierung (stärkere Hardware)
- Lastenausgleich

**Beispiel: Kubernetes Horizontal Pod Autoscaler**
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: web-app
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web-app
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

### Verfügbarkeit
- Redundanz
- Fehlertoleranz
- Gesundheitschecks

**Beispiel: Circuit Breaker Pattern**
```java
@Service
public class PaymentService {
    @CircuitBreaker(name = "paymentService", fallbackMethod = "fallbackPayment")
    public PaymentResult processPayment(PaymentRequest request) {
        return externalPaymentGateway.process(request);
    }
    
    public PaymentResult fallbackPayment(PaymentRequest request, Exception e) {
        // Alternative Zahlungsmethode oder Fehlermeldung
        return new PaymentResult(PaymentStatus.PENDING, "Payment queued for processing");
    }
}
```

### Sicherheit
- Authentifizierung und Autorisierung
- Datenverschlüsselung
- Input-Validierung

**Beispiel: JWT-Authentifizierung**
```java
@RestController
@RequestMapping("/api")
public class UserController {
    @GetMapping("/profile")
    public ResponseEntity<UserProfile> getUserProfile(@RequestHeader("Authorization") String token) {
        // Token validieren
        String userId = jwtService.validateTokenAndGetUserId(token);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        // Benutzerprofile abrufen und zurückgeben
        UserProfile profile = userService.getUserProfile(userId);
        return ResponseEntity.ok(profile);
    }
}
```

### Wartbarkeit
- Modulare Struktur
- Testbarkeit
- Dokumentation

**Beispiel: Dependency Injection**
```java
// Schlecht: Harte Kopplung
public class OrderService {
    private final OrderRepository repository = new MySqlOrderRepository();
    
    // ...
}

// Gut: Dependency Injection für bessere Wartbarkeit und Testbarkeit
public class OrderService {
    private final OrderRepository repository;
    
    public OrderService(OrderRepository repository) {
        this.repository = repository;
    }
    
    // ...
}
```

## Fazit

Eine gute Software-Architektur ist entscheidend für den langfristigen Erfolg eines Projekts. Sie sollte:
- Die Geschäftsanforderungen unterstützen
- Technische Schulden minimieren
- Eine klare Struktur bieten
- Für zukünftige Änderungen flexibel sein
- Qualitätsattribute wie Performance, Skalierbarkeit und Sicherheit berücksichtigen

Die Wahl der richtigen Architektur hängt von den spezifischen Anforderungen, dem Team und dem Geschäftskontext ab. Es gibt keine "Einheitslösung" – jede Architekturentscheidung stellt einen Kompromiss dar, der sorgfältig abgewogen werden muss.
