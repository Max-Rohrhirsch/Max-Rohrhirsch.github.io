# Datenbanken und SQL

## Relationale Datenbanken

Relationale Datenbanken organisieren Daten in Tabellen mit Zeilen und Spalten. Die Beziehungen zwischen den Tabellen werden durch Fremdschlüssel definiert.

### RDBMS-Systeme

#### MySQL/MariaDB
```sql
-- Tabelle erstellen
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Daten einfügen
INSERT INTO customers (name, email) 
VALUES ('Max Mustermann', 'max@example.com');

-- Daten abfragen
SELECT * FROM customers WHERE name LIKE 'Max%';

-- Tabelle ändern
ALTER TABLE customers ADD COLUMN phone VARCHAR(20);

-- Daten aktualisieren
UPDATE customers SET phone = '+49123456789' WHERE id = 1;

-- Daten löschen
DELETE FROM customers WHERE id = 1;
```

#### PostgreSQL
```sql
-- Spezielle PostgreSQL-Features
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2),
    tags TEXT[],  -- Array-Typ
    metadata JSONB  -- JSON-Speicherung
);

-- Array und JSON verwenden
INSERT INTO products (name, price, tags, metadata)
VALUES (
    'Laptop', 
    999.99, 
    ARRAY['electronics', 'computer'], 
    '{"brand": "ThinkPad", "model": "X1", "specs": {"ram": "16GB", "cpu": "i7"}}'::jsonb
);

-- JSON abfragen
SELECT * FROM products WHERE metadata @> '{"brand": "ThinkPad"}';

-- Volltextsuche
CREATE INDEX idx_products_fulltext ON products USING gin(to_tsvector('english', name));
SELECT * FROM products WHERE to_tsvector('english', name) @@ to_tsquery('laptop');
```

#### Microsoft SQL Server
```sql
-- Tabelle mit Identity erstellen
CREATE TABLE orders (
    id INT IDENTITY(1,1) PRIMARY KEY,
    customer_id INT NOT NULL,
    total_amount DECIMAL(10, 2),
    order_date DATETIME DEFAULT GETDATE()
);

-- Temporäre Tabelle
CREATE TABLE #temp_orders (
    id INT,
    customer_name VARCHAR(100)
);

-- CTE (Common Table Expression)
WITH customer_orders AS (
    SELECT c.name, COUNT(o.id) AS order_count
    FROM customers c
    JOIN orders o ON c.id = o.customer_id
    GROUP BY c.name
)
SELECT * FROM customer_orders WHERE order_count > 5;
```

### SQL-Grundlagen

#### Joins
```sql
-- Inner Join
SELECT c.name, o.id, o.total_amount
FROM customers c
INNER JOIN orders o ON c.id = o.customer_id;

-- Left Join
SELECT c.name, o.id, o.total_amount
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id;

-- Multiple Joins
SELECT c.name, o.id, p.name AS product_name
FROM customers c
JOIN orders o ON c.id = o.customer_id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id;
```

#### Aggregationen
```sql
-- Gruppieren und Aggregieren
SELECT 
    customer_id,
    COUNT(*) AS total_orders,
    SUM(total_amount) AS total_spent,
    AVG(total_amount) AS average_order,
    MIN(order_date) AS first_order,
    MAX(order_date) AS last_order
FROM orders
GROUP BY customer_id
HAVING COUNT(*) > 3;

-- Fensterfunktionen
SELECT 
    id,
    customer_id,
    total_amount,
    order_date,
    SUM(total_amount) OVER (PARTITION BY customer_id ORDER BY order_date) AS running_total,
    RANK() OVER (PARTITION BY customer_id ORDER BY total_amount DESC) AS amount_rank
FROM orders;
```

#### Transaktionen
```sql
-- Transaktion starten
BEGIN TRANSACTION;

-- Operationen durchführen
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- Überprüfung
IF (SELECT balance FROM accounts WHERE id = 1) < 0
BEGIN
    -- Rollback bei negativem Kontostand
    ROLLBACK TRANSACTION;
    PRINT 'Transaktion abgebrochen: Nicht genügend Guthaben';
END
ELSE
BEGIN
    -- Transaktion bestätigen
    COMMIT TRANSACTION;
    PRINT 'Überweisung erfolgreich';
END
```

#### Indizes
```sql
-- Einfacher Index
CREATE INDEX idx_customers_name ON customers(name);

-- Zusammengesetzter Index
CREATE INDEX idx_orders_customer_date ON orders(customer_id, order_date);

-- Eindeutiger Index
CREATE UNIQUE INDEX idx_customers_email ON customers(email);

-- Partieller Index (PostgreSQL)
CREATE INDEX idx_orders_large ON orders(id) WHERE total_amount > 1000;

-- Indexinformationen anzeigen
EXPLAIN SELECT * FROM customers WHERE name = 'Max Mustermann';
```

#### Trigger
```sql
-- Trigger nach Einfügung
CREATE TRIGGER after_order_insert
AFTER INSERT ON orders
FOR EACH ROW
BEGIN
    -- Kunden-Status aktualisieren
    UPDATE customers 
    SET status = CASE 
        WHEN (SELECT COUNT(*) FROM orders WHERE customer_id = NEW.customer_id) > 10 THEN 'GOLD'
        WHEN (SELECT COUNT(*) FROM orders WHERE customer_id = NEW.customer_id) > 5 THEN 'SILVER'
        ELSE 'REGULAR'
    END
    WHERE id = NEW.customer_id;
END;
```

#### Stored Procedures
```sql
-- Stored Procedure erstellen
CREATE PROCEDURE get_customer_orders(IN customer_id INT)
BEGIN
    SELECT 
        o.id,
        o.order_date,
        o.total_amount,
        GROUP_CONCAT(p.name) AS products
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    JOIN products p ON oi.product_id = p.id
    WHERE o.customer_id = customer_id
    GROUP BY o.id, o.order_date, o.total_amount
    ORDER BY o.order_date DESC;
END;

-- Stored Procedure aufrufen
CALL get_customer_orders(42);
```

### Datenbankdesign

#### Normalisierung

**1. Normalform (1NF):**
- Jede Tabellenzelle enthält nur atomare (unteilbare) Werte
- Keine wiederholenden Gruppen oder Arrays

**2. Normalform (2NF):**
- Erfüllt 1NF
- Alle Nicht-Schlüsselattribute sind vollständig vom Primärschlüssel abhängig

**3. Normalform (3NF):**
- Erfüllt 2NF
- Kein Nicht-Schlüsselattribut ist transitiv abhängig vom Primärschlüssel

**Beispiel für Normalisierung:**

Unnormalisierte Tabelle:
```
| Bestellung | Kunde    | Kunde_Email       | Produkt  | Produkt_Kategorie | Preis |
|------------|----------|-------------------|----------|-------------------|-------|
| 1001       | Max      | max@example.com   | Laptop   | Elektronik        | 999   |
| 1001       | Max      | max@example.com   | Maus     | Elektronik        | 29    |
| 1002       | Eva      | eva@example.com   | Monitor  | Elektronik        | 199   |
```

Nach Normalisierung:

Kunden-Tabelle:
```
| Kunden_ID | Name | Email             |
|-----------|------|-------------------|
| 1         | Max  | max@example.com   |
| 2         | Eva  | eva@example.com   |
```

Produkt-Tabelle:
```
| Produkt_ID | Name    | Kategorie  | Preis |
|------------|---------|------------|-------|
| 101        | Laptop  | Elektronik | 999   |
| 102        | Maus    | Elektronik | 29    |
| 103        | Monitor | Elektronik | 199   |
```

Bestellungen-Tabelle:
```
| Bestell_ID | Kunden_ID |
|------------|-----------|
| 1001       | 1         |
| 1002       | 2         |
```

Bestellpositionen-Tabelle:
```
| Position_ID | Bestell_ID | Produkt_ID |
|-------------|------------|------------|
| 1           | 1001       | 101        |
| 2           | 1001       | 102        |
| 3           | 1002       | 103        |
```

#### ER-Diagramm (Entity-Relationship)

```
+-------------+       +--------------+       +-------------+
|  Customers  |       |    Orders    |       |  Products   |
+-------------+       +--------------+       +-------------+
| PK: id      |<----->| PK: id       |       | PK: id      |
|    name     |       | FK: customer |       |    name     |
|    email    |       |    amount    |       |    price    |
|    phone    |       |    date      |       |    category |
+-------------+       +--------------+       +-------------+
                             |
                             |
                             V
                      +--------------+
                      | Order_Items  |
                      +--------------+
                      | PK: id       |
                      | FK: order    |
                      | FK: product  |
                      |    quantity  |
                      +--------------+
```

#### Fremdschlüssel und Constraints

```sql
-- Referentielle Integrität
CREATE TABLE orders (
    id INT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
        ON DELETE CASCADE  -- Löscht Bestellungen, wenn Kunde gelöscht wird
        ON UPDATE CASCADE  -- Aktualisiert FK, wenn PK aktualisiert wird
);

-- Check Constraint
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10, 2),
    CONSTRAINT chk_price_positive CHECK (price > 0)
);

-- Unique Constraint
CREATE TABLE users (
    id INT PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(100),
    CONSTRAINT uq_user_email UNIQUE (email)
);
```

## NoSQL-Datenbanken

### Dokumentenorientierte Datenbanken

#### MongoDB
```javascript
// Collection erstellen und Dokumente einfügen
db.customers.insertMany([
  {
    name: "Max Mustermann",
    email: "max@example.com",
    address: {
      street: "Hauptstraße 1",
      city: "Berlin",
      zipcode: "10115"
    },
    orders: [
      { productName: "Laptop", quantity: 1, price: 999.99 },
      { productName: "Maus", quantity: 2, price: 29.99 }
    ]
  },
  {
    name: "Eva Example",
    email: "eva@example.com",
    address: {
      street: "Nebenstraße 42",
      city: "München",
      zipcode: "80331"
    },
    orders: [
      { productName: "Monitor", quantity: 1, price: 199.99 }
    ]
  }
]);

// Dokumente abfragen
db.customers.find({ "address.city": "Berlin" });

// Aggregation Pipeline
db.customers.aggregate([
  { $match: { "orders.price": { $gt: 100 } } },
  { $project: { 
      name: 1, 
      email: 1,
      orderTotal: { $sum: "$orders.price" } 
  } },
  { $sort: { orderTotal: -1 } }
]);

// Indizes
db.customers.createIndex({ email: 1 }, { unique: true });
db.customers.createIndex({ "address.city": 1, name: 1 });
```

### Key-Value-Datenbanken

#### Redis
```
# Wert setzen
SET user:1001 "Max Mustermann"

# Wert mit Ablaufzeit setzen (TTL)
SET session:abc123 "user_data" EX 3600

# Wert abrufen
GET user:1001

# Prüfen, ob Schlüssel existiert
EXISTS user:1001

# Mehrere Operationen
MSET user:1001:name "Max" user:1001:email "max@example.com"
MGET user:1001:name user:1001:email

# Listen
LPUSH notifications:1001 "Neue Nachricht"
LPUSH notifications:1001 "Zahlung bestätigt"
LRANGE notifications:1001 0 -1

# Sets
SADD interests:1001 "Technologie" "Musik" "Sport"
SMEMBERS interests:1001
SISMEMBER interests:1001 "Musik"

# Hashes
HSET user:1001 name "Max" email "max@example.com" age 30
HGET user:1001 email
HGETALL user:1001

# Pub/Sub
SUBSCRIBE news
PUBLISH news "Wichtige Ankündigung"
```

### Spaltenorientierte Datenbanken

#### Cassandra (CQL)
```sql
-- Keyspace erstellen
CREATE KEYSPACE ecommerce 
WITH REPLICATION = { 'class': 'SimpleStrategy', 'replication_factor': 3 };

-- Tabelle erstellen
CREATE TABLE ecommerce.user_events (
    user_id UUID,
    event_timestamp TIMESTAMP,
    event_type TEXT,
    product_id UUID,
    amount DECIMAL,
    PRIMARY KEY (user_id, event_timestamp)
) WITH CLUSTERING ORDER BY (event_timestamp DESC);

-- Daten einfügen
INSERT INTO ecommerce.user_events 
(user_id, event_timestamp, event_type, product_id, amount) 
VALUES 
(uuid(), toTimestamp(now()), 'purchase', uuid(), 199.99);

-- Abfragen
SELECT * FROM ecommerce.user_events 
WHERE user_id = 123e4567-e89b-12d3-a456-426614174000 
AND event_timestamp > '2023-01-01 00:00:00'
AND event_timestamp < '2023-12-31 23:59:59'
LIMIT 100;

-- Sekundärindex
CREATE INDEX ON ecommerce.user_events (event_type);
```

### Graphdatenbanken

#### Neo4j (Cypher Query Language)
```cypher
// Knoten erstellen
CREATE (john:Person {name: 'John', age: 35}),
       (mary:Person {name: 'Mary', age: 32}),
       (movie:Movie {title: 'The Matrix', released: 1999});

// Beziehungen erstellen
MATCH (john:Person {name: 'John'}), (mary:Person {name: 'Mary'})
CREATE (john)-[:FRIENDS_WITH]->(mary);

MATCH (john:Person {name: 'John'}), (movie:Movie {title: 'The Matrix'})
CREATE (john)-[:WATCHED {rating: 9, on: date('2022-03-15')}]->(movie);

// Abfragen
MATCH (p:Person)-[:WATCHED]->(m:Movie)
WHERE p.age > 30
RETURN p.name, m.title;

// Pfadabfragen
MATCH path = (p1:Person)-[:FRIENDS_WITH*1..3]-(p2:Person)
WHERE p1.name = 'John' AND p2.name <> 'John'
RETURN path;

// Empfehlungsabfrage
MATCH (p:Person {name: 'John'})-[:FRIENDS_WITH]->(friend),
      (friend)-[:WATCHED]->(movie),
      (movie)<-[:WATCHED]-(otherPerson)
WHERE NOT (p)-[:WATCHED]->(movie)
RETURN movie.title, COUNT(DISTINCT otherPerson) AS recommendations
ORDER BY recommendations DESC
LIMIT 5;
```

## Datenbankadministration

### Backups und Recovery

#### MySQL Backup
```bash
# Vollständiges Backup
mysqldump -u root -p --all-databases > full_backup.sql

# Einzelne Datenbank
mysqldump -u root -p --databases mydb > mydb_backup.sql

# Backup mit Kompression
mysqldump -u root -p mydb | gzip > mydb_backup.sql.gz

# Wiederherstellung
mysql -u root -p < full_backup.sql
```

#### PostgreSQL Backup
```bash
# Vollständiges Backup
pg_dump -U postgres -Fc -f full_backup.dump postgres

# Einzelne Datenbank
pg_dump -U postgres -Fc -f mydb_backup.dump mydb

# Wiederherstellung
pg_restore -U postgres -d postgres full_backup.dump
```

### Performance-Optimierung

#### Query-Analyse
```sql
-- MySQL EXPLAIN
EXPLAIN SELECT c.name, o.total_amount
FROM customers c
JOIN orders o ON c.id = o.customer_id
WHERE c.status = 'ACTIVE' AND o.order_date > '2023-01-01';

-- PostgreSQL EXPLAIN ANALYZE
EXPLAIN ANALYZE SELECT c.name, o.total_amount
FROM customers c
JOIN orders o ON c.id = o.customer_id
WHERE c.status = 'ACTIVE' AND o.order_date > '2023-01-01';
```

#### Index-Optimierung
```sql
-- Indexe analysieren
SELECT 
    table_name, 
    index_name, 
    column_name 
FROM information_schema.statistics 
WHERE table_schema = 'mydb' 
ORDER BY table_name, index_name, seq_in_index;

-- Index-Nutzung überprüfen
SELECT 
    relname as table_name, 
    idx_scan as index_scans,
    seq_scan as sequential_scans
FROM pg_stat_user_tables 
ORDER BY index_scans DESC;
```

#### Abfrageoptimierung
```sql
-- Schlechte Abfrage
SELECT * FROM large_table WHERE created_at > '2023-01-01';

-- Verbesserte Abfrage
SELECT id, name, status FROM large_table WHERE created_at > '2023-01-01';

-- Schlechter JOIN
SELECT * FROM orders o JOIN customers c ON o.customer_id = c.id;

-- Verbesserte JOIN-Abfrage
SELECT o.id, o.total_amount, c.name, c.email
FROM orders o 
JOIN customers c ON o.customer_id = c.id 
WHERE o.order_date > '2023-01-01';
```

### Datenbankreplikation

#### MySQL Master-Slave-Replikation
```sql
-- Auf Master-Server
CREATE USER 'replication_user'@'%' IDENTIFIED BY 'password';
GRANT REPLICATION SLAVE ON *.* TO 'replication_user'@'%';

-- Master-Status überprüfen
SHOW MASTER STATUS;

-- Auf Slave-Server
CHANGE MASTER TO
    MASTER_HOST='master_ip',
    MASTER_USER='replication_user',
    MASTER_PASSWORD='password',
    MASTER_LOG_FILE='mysql-bin.000001',
    MASTER_LOG_POS=123;

START SLAVE;
SHOW SLAVE STATUS\G
```

#### PostgreSQL Streaming-Replikation
```bash
# Auf Master-Server (postgresql.conf)
listen_addresses = '*'
wal_level = replica
max_wal_senders = 10
wal_keep_segments = 32

# Auf Master-Server (pg_hba.conf)
host replication replication_user 192.168.1.0/24 md5

# Auf Slave-Server
pg_basebackup -h master_ip -U replication_user -D /var/lib/postgresql/data -P -v -R
```

## Datenbankmigrationen

### Flyway-Migrationen
```sql
-- V1__Create_customers_table.sql
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- V2__Add_status_to_customers.sql
ALTER TABLE customers ADD COLUMN status VARCHAR(20) DEFAULT 'ACTIVE';

-- V3__Create_orders_table.sql
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);
```

### Liquibase-Migrationen
```xml
<!-- changelog.xml -->
<databaseChangeLog
    xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog
                      http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-3.8.xsd">
    
    <changeSet id="1" author="dev">
        <createTable tableName="customers">
            <column name="id" type="int" autoIncrement="true">
                <constraints primaryKey="true" nullable="false"/>
            </column>
            <column name="name" type="varchar(100)">
                <constraints nullable="false"/>
            </column>
            <column name="email" type="varchar(100)">
                <constraints nullable="false" unique="true"/>
            </column>
            <column name="created_at" type="timestamp" defaultValueComputed="CURRENT_TIMESTAMP"/>
        </createTable>
    </changeSet>
    
    <changeSet id="2" author="dev">
        <addColumn tableName="customers">
            <column name="status" type="varchar(20)" defaultValue="ACTIVE"/>
        </addColumn>
    </changeSet>
</databaseChangeLog>
```

## Datenbankdesignmuster

### Repository-Muster
```java
// Repository-Interface
public interface CustomerRepository {
    Customer findById(Long id);
    List<Customer> findByStatus(String status);
    void save(Customer customer);
    void delete(Long id);
}

// SQL-Implementierung
public class SqlCustomerRepository implements CustomerRepository {
    private final Connection connection;
    
    @Override
    public Customer findById(Long id) {
        try (PreparedStatement stmt = connection.prepareStatement(
                "SELECT * FROM customers WHERE id = ?")) {
            stmt.setLong(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return mapToCustomer(rs);
            }
            return null;
        } catch (SQLException e) {
            throw new RepositoryException("Error finding customer", e);
        }
    }
    
    // Weitere Implementierungen
}
```

### Unit of Work
```java
public class UnitOfWork {
    private Connection connection;
    private Map<String, Object> newObjects = new HashMap<>();
    private Map<String, Object> dirtyObjects = new HashMap<>();
    private List<String> deletedObjects = new ArrayList<>();
    
    public void registerNew(String key, Object obj) {
        newObjects.put(key, obj);
    }
    
    public void registerDirty(String key, Object obj) {
        dirtyObjects.put(key, obj);
    }
    
    public void registerDeleted(String key) {
        deletedObjects.add(key);
    }
    
    public void commit() {
        try {
            connection.setAutoCommit(false);
            
            // Einfügen neuer Objekte
            for (Map.Entry<String, Object> entry : newObjects.entrySet()) {
                // SQL-Insert für das Objekt ausführen
            }
            
            // Aktualisieren geänderter Objekte
            for (Map.Entry<String, Object> entry : dirtyObjects.entrySet()) {
                // SQL-Update für das Objekt ausführen
            }
            
            // Löschen markierter Objekte
            for (String key : deletedObjects) {
                // SQL-Delete für das Objekt ausführen
            }
            
            connection.commit();
        } catch (SQLException e) {
            try {
                connection.rollback();
            } catch (SQLException ex) {
                throw new RuntimeException("Error during rollback", ex);
            }
            throw new RuntimeException("Error during commit", e);
        } finally {
            try {
                connection.setAutoCommit(true);
            } catch (SQLException e) {
                throw new RuntimeException("Error resetting auto-commit", e);
            }
            
            // Listen zurücksetzen
            newObjects.clear();
            dirtyObjects.clear();
            deletedObjects.clear();
        }
    }
}
```

### Data Access Object (DAO)
```java
// DAO-Interface
public interface CustomerDao {
    Customer findById(Long id);
    List<Customer> findAll();
    void save(Customer customer);
    void update(Customer customer);
    void delete(Long id);
}

// DAO-Implementierung
public class CustomerDaoImpl implements CustomerDao {
    private final DataSource dataSource;
    
    public CustomerDaoImpl(DataSource dataSource) {
        this.dataSource = dataSource;
    }
    
    @Override
    public Customer findById(Long id) {
        String sql = "SELECT * FROM customers WHERE id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setLong(1, id);
            ResultSet rs = stmt.executeQuery();
            
            if (rs.next()) {
                Customer customer = new Customer();
                customer.setId(rs.getLong("id"));
                customer.setName(rs.getString("name"));
                customer.setEmail(rs.getString("email"));
                customer.setStatus(rs.getString("status"));
                customer.setCreatedAt(rs.getTimestamp("created_at"));
                return customer;
            }
            
            return null;
        } catch (SQLException e) {
            throw new DaoException("Error finding customer by id", e);
        }
    }
    
    // Weitere Implementierungen
}
```

## Datenbankabstraktion und ORMs

### Java Persistence API (JPA)
```java
@Entity
@Table(name = "customers")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String name;
    
    @Column(nullable = false, unique = true, length = 100)
    private String email;
    
    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
    
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Order> orders;
    
    // Getter und Setter
}

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;
    
    @Column(name = "total_amount", nullable = false)
    private BigDecimal totalAmount;
    
    @Column(name = "order_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date orderDate;
    
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> items;
    
    // Getter und Setter
}
```

JPA-Abfragen:
```java
// EntityManager-Abfragen
public List<Customer> findAllActiveCustomers() {
    return entityManager.createQuery(
        "SELECT c FROM Customer c WHERE c.status = :status", Customer.class)
        .setParameter("status", "ACTIVE")
        .getResultList();
}

// Named Query
@Entity
@NamedQueries({
    @NamedQuery(
        name = "Customer.findByStatus",
        query = "SELECT c FROM Customer c WHERE c.status = :status"
    ),
    @NamedQuery(
        name = "Customer.findWithOrderCount",
        query = "SELECT c, COUNT(o) FROM Customer c LEFT JOIN c.orders o GROUP BY c"
    )
})
public class Customer {
    // ...
}

// Criteria API
public List<Customer> findCustomersWithOrdersAfter(Date date) {
    CriteriaBuilder cb = entityManager.getCriteriaBuilder();
    CriteriaQuery<Customer> query = cb.createQuery(Customer.class);
    Root<Customer> customer = query.from(Customer.class);
    
    Join<Customer, Order> orders = customer.join("orders", JoinType.INNER);
    
    query.select(customer)
         .where(cb.greaterThan(orders.get("orderDate"), date))
         .distinct(true);
    
    return entityManager.createQuery(query).getResultList();
}
```

### Spring Data JPA
```java
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    // Methoden werden automatisch aus Namen abgeleitet
    List<Customer> findByStatus(String status);
    Optional<Customer> findByEmail(String email);
    List<Customer> findByNameContaining(String namePart);
    
    // Query-Annotation für komplexe Abfragen
    @Query("SELECT c FROM Customer c WHERE c.createdAt > :date AND c.status = :status")
    List<Customer> findNewCustomers(@Param("date") Date date, @Param("status") String status);
    
    // Native SQL-Query
    @Query(
        value = "SELECT * FROM customers c INNER JOIN orders o ON c.id = o.customer_id " +
                "WHERE o.total_amount > :amount",
        nativeQuery = true
    )
    List<Customer> findCustomersWithLargeOrders(@Param("amount") BigDecimal amount);
    
    // Paginierung
    Page<Customer> findByNameStartingWith(String prefix, Pageable pageable);
    
    // Modifizierende Queries
    @Modifying
    @Query("UPDATE Customer c SET c.status = :status WHERE c.lastLogin < :date")
    int updateInactiveCustomers(@Param("date") Date date, @Param("status") String status);
}
```

## NewSQL und verteilte Datenbanken

### CockroachDB
```sql
-- Tabellenerstellen mit Primärschlüssel
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name STRING NOT NULL,
    email STRING UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT current_timestamp()
);

-- Daten einfügen
INSERT INTO users (name, email) VALUES 
    ('Max Mustermann', 'max@example.com'),
    ('Eva Example', 'eva@example.com');

-- Tabelle mit Verteilung definieren
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    amount DECIMAL(19,4) NOT NULL,
    created_at TIMESTAMP DEFAULT current_timestamp(),
    INDEX (user_id)
) PARTITION BY RANGE (created_at) (
    PARTITION orders_2023_q1 VALUES FROM ('2023-01-01') TO ('2023-04-01'),
    PARTITION orders_2023_q2 VALUES FROM ('2023-04-01') TO ('2023-07-01'),
    PARTITION orders_2023_q3 VALUES FROM ('2023-07-01') TO ('2023-10-01'),
    PARTITION orders_2023_q4 VALUES FROM ('2023-10-01') TO ('2024-01-01')
);
```

### TiDB
```sql
-- Tabelle mit Verteilung erstellen
CREATE TABLE orders (
    id BIGINT AUTO_RANDOM PRIMARY KEY,
    customer_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    order_time TIMESTAMP DEFAULT NOW(),
    INDEX idx_customer (customer_id),
    INDEX idx_product (product_id),
    INDEX idx_time (order_time)
) PARTITION BY RANGE (UNIX_TIMESTAMP(order_time)) (
    PARTITION p2023_01 VALUES LESS THAN (UNIX_TIMESTAMP('2023-02-01')),
    PARTITION p2023_02 VALUES LESS THAN (UNIX_TIMESTAMP('2023-03-01')),
    PARTITION p2023_03 VALUES LESS THAN (UNIX_TIMESTAMP('2023-04-01')),
    PARTITION p_future VALUES LESS THAN (MAXVALUE)
);

-- Analysefunktionen mit TiFlash
SELECT 
    DATE_FORMAT(order_time, '%Y-%m') AS month,
    COUNT(*) AS order_count,
    SUM(amount) AS total_amount,
    AVG(amount) AS avg_order_value
FROM orders 
WHERE order_time >= '2023-01-01' AND order_time < '2023-04-01'
GROUP BY DATE_FORMAT(order_time, '%Y-%m')
ORDER BY month;
```

## Datensicherheit und Verschlüsselung

### Benutzerverwaltung und Berechtigungen
```sql
-- MySQL-Benutzer erstellen
CREATE USER 'app_user'@'%' IDENTIFIED BY 'secure_password';

-- Berechtigungen gewähren
GRANT SELECT, INSERT, UPDATE ON mydb.customers TO 'app_user'@'%';
GRANT SELECT ON mydb.products TO 'app_user'@'%';

-- Nur-Lese-Benutzer für Reporting
CREATE USER 'report_user'@'%' IDENTIFIED BY 'read_only_pwd';
GRANT SELECT ON mydb.* TO 'report_user'@'%';

-- Berechtigungen überprüfen
SHOW GRANTS FOR 'app_user'@'%';

-- Berechtigungen widerrufen
REVOKE UPDATE ON mydb.customers FROM 'app_user'@'%';

-- Benutzer löschen
DROP USER 'app_user'@'%';
```

### Datenverschlüsselung
```sql
-- MySQL - Transparent Data Encryption (TDE)
ALTER TABLE customers ENCRYPTION = 'Y';

-- PostgreSQL - pgcrypto
CREATE EXTENSION pgcrypto;

-- Daten verschlüsselt speichern
INSERT INTO users (name, email, password) 
VALUES ('Max', 'max@example.com', crypt('secret_password', gen_salt('bf')));

-- Passwort überprüfen
SELECT * FROM users 
WHERE email = 'max@example.com' 
AND password = crypt('entered_password', password);

-- Feld-Level-Verschlüsselung
CREATE OR REPLACE FUNCTION encrypt_credit_card(card_number TEXT) 
RETURNS BYTEA AS $$
BEGIN
    RETURN pgp_sym_encrypt(card_number, 'encryption_key');
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION decrypt_credit_card(encrypted_card BYTEA) 
RETURNS TEXT AS $$
BEGIN
    RETURN pgp_sym_decrypt(encrypted_card, 'encryption_key');
END;
$$ LANGUAGE plpgsql;

-- Verwendung der Verschlüsselungsfunktionen
INSERT INTO payment_info (user_id, credit_card) 
VALUES (1, encrypt_credit_card('1234-5678-9012-3456'));

SELECT user_id, decrypt_credit_card(credit_card) AS card_number 
FROM payment_info WHERE user_id = 1;
```

## Fazit

Datenbanken sind ein zentraler Bestandteil moderner Softwaresysteme. Die Wahl des richtigen Datenbanksystems und der Einsatz effizienter Datenbankkonzepte und -praktiken sind entscheidend für die Performance, Skalierbarkeit und Wartbarkeit von Anwendungen. Von relationalen Datenbanken über NoSQL-Lösungen bis hin zu verteilten NewSQL-Systemen – jeder Ansatz hat seine spezifischen Stärken und Einsatzgebiete.

Gute Datenbankentwicklung erfordert:
- Solides Verständnis von Datenbankkonzepten und -theorien
- Kenntnis der verschiedenen Datenbankparadigmen
- Fähigkeit zur Optimierung von Datenbankabfragen und -strukturen
- Bewusstsein für Datensicherheit und Datenschutz
- Verständnis für Skalierbarkeits- und Verfügbarkeitsanforderungen
