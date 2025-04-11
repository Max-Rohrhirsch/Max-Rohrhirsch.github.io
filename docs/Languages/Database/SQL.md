# SQL

### basic
```sql
SELECT * AS aliasNameFROM table
Where condition -- Selects after beeing grouped
GROUP BY column 
HAVING contition -- Selects before beeing grouped
ORDER BY column ASC/ DESC
LIMIT 30 -- only first 30 lines

/* Comment */
```
**ASC** is from small to big; **A - Z (Default)**

**DESC** is from big to small; **Z - A**

### joins
```sql
SELECT * FROM table
JOIN otherTable ON t1.name = t2.name
Where condition
GROUP BY column 
ORDER BY column ASC/ DESC
LIMIT 30 -- only first 30 lines
```
```sql
SELECT OrderID, Quantity,
CASE
    WHEN Quantity > 30 THEN 'The quantity is greater than 30'
    WHEN Quantity = 30 THEN 'The quantity is 30'
    ELSE 'The quantity is under 30'
END AS QuantityText
FROM OrderDetails;
```

| Methode |
|---------|
| MIN()   |
| MAX()   |
| COUNT() |
| AVG()   |
| SUM()   |

---

## Wildcards

| Symbol | Description                               |
|--------|-------------------------------------------|
| `%`    | Represents zero or more characters        |
| `_`    | Represents a single character             |
| `[]`   | Represents any single character within the brackets |
| `^`    | Represents any character not in the brackets |
| `-`    | Represents any single character within the specified range |

Example:
```sql
WHERE CustomerName LIKE 'a%'
```

### Create
```sql
CREATE DATABASE databasename;
DROP DATABASE databasename;


CREATE TABLE Persons (
    PersonID int NOT NULL,
    LastName varchar(255) UNIQUE,
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255),
    PRIMARY KEY (PersonID),
    FOREIGN KEY (PersonID) REFERENCES ORDER(PersonID)
);
DROP TABLE table_name;


INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);

DELETE FROM table_name WHERE condition;
```

---

# Advanced

```sql
SELECT Count(*) AS DistinctCountries
FROM (SELECT DISTINCT Country FROM Customers);
```

```sql
SELECT column_name(s)
FROM table_name
WHERE EXISTS
(SELECT column_name FROM table_name WHERE condition);
```

```sql
SELECT column_name(s)
FROM table_name
WHERE column_name BETWEEN value1 AND value2;
```