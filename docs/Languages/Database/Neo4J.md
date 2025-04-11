# Neo4J

### Installation
```bash
kotlinc hello.kt -include-runtime -d hello.jar
```

<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>

```cypher
MATCH (player:PLAYER) RETURN player.name AS name LIMIT 10
```
```cypher
MATCH (player:PLAYER) 
WHERE name = "max"
RETURN player.name AS name 
LIMIT 10 
ORDER BY player.age DESC
```
```cypher
MATCH (player:PLAYER {name: "max"}) RETURN player.age
```
```cypher
player.name <> "max" // Not named max
RETURN player SKIP 2 LIMIT 2 // The next 2 players
AVG() MAX() MIN() ABS() COUNT() SUM()
```
```cypher
MATCH (player:PLAYER) -[:PLAYS_FOR]-> (team:TEAM {name: "teamname"}) RETURN player
```
```cypher
MATCH (max:PLAYER {name:"max"})
MATCH (erik:PLAYER {name: "erik"})
CREATE (max)-[:CODES_WITH]->(erik)
```
```cypher
MATCH (player {name: "max"})
DETACH DELETE player
```
```cypher
CREATE (:PLAYER {name: "max"})
```
```cypher
MATCH (player:PLAYER)
WHERE player.name = "max"
SET player.height = 2.02
```
</div>

### Docker-Compose
```yaml
version: '3.9'

services:
  neo4j:
    image: neo4j:5.12
    container_name: neo4j-container
    ports:
      - "7474:7474"
      - "7687:7687"
    environment:
      - NEO4J_AUTH=neo4j/test12345  # Username and password(8 characters long)
      - NEO4J_ACCEPT_LICENSE_AGREEMENT=yes
      - NEO4J_dbms_memory_heap_initial__size=512M
      - NEO4J_dbms_memory_heap_max__size=1G
    volumes:
      - neo4j_data:/data
      - neo4j_logs:/logs
      - neo4j_import:/import
      - neo4j_plugins:/plugins

volumes:
  neo4j_data:
  neo4j_logs:
  neo4j_import:
  neo4j_plugins:
```

## Python Implementation
```python
from neo4j import GraphDatabase

class Neo4jHandler:
    def __init__(self, uri, user, password):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        self.driver.close()

    def clear_database(self):
        with self.driver.session() as session:
            session.execute_write(self._clear_database_tx)

    @staticmethod
    def _clear_database_tx(tx):
        tx.run("MATCH (n) DETACH DELETE n")


    # Create a person node with relationships
    def create_person(self, name, age, parents=None, friends=None):
        with self.driver.session() as session:
            session.execute_write(self._create_person_tx, name, age, parents, friends)

    @staticmethod
    def _create_person_tx(tx, name, age, parents, friends):
        # Create the person
        tx.run("""
            MERGE (p:Person {name: $name})
            SET p.age = $age
        """, name=name, age=age)

        # Add parent relationships
        if parents:
            for parent in parents:
                tx.run("""
                    MATCH (p:Person {name: $name})
                    MERGE (parent:Person {name: $parent_name})
                    CREATE (parent)-[:PARENT]->(p)
                """, name=name, parent_name=parent)

        # Add friend relationships
        if friends:
            for friend in friends:
                tx.run("""
                    MATCH (p:Person {name: $name})
                    MERGE (friend:Person {name: $friend_name})
                    MERGE (p)-[:FRIEND]->(friend)
                    MERGE (friend)-[:FRIEND]->(p)
                """, name=name, friend_name=friend)

    # Read all people and their relationships
    def read_all(self):
        with self.driver.session() as session:
            return session.execute_read(self._read_all_tx)

    @staticmethod
    def _read_all_tx(tx):
        result = tx.run("""
            MATCH (p:Person)
            OPTIONAL MATCH (p)<-[:PARENT]-(parent:Person)
            OPTIONAL MATCH (p)-[:FRIEND]-(friend:Person)
            RETURN p.name AS name, p.age AS age, 
                   COLLECT(DISTINCT parent.name) AS parents, 
                   COLLECT(DISTINCT friend.name) AS friends
        """)
        return [record.data() for record in result]

# Example Usage
if __name__ == "__main__":
    # Connection setup
    neo4j_handler = Neo4jHandler("bolt://localhost:7687", "neo4j", "test12345")

    # Clear database
    neo4j_handler.clear_database()

    # Create people
    neo4j_handler.create_person("Alice", 30, parents=["Bob", "Carol"], friends=["Eve", "Dave"])
    neo4j_handler.create_person("Bob", 60, friends=["Alice", "Dave"])
    neo4j_handler.create_person("Carol", 58)
    neo4j_handler.create_person("Eve", 28, parents=["Bob", "Carol"])
    neo4j_handler.create_person("Dave", 32)

    # Read all people and their relationships
    all_people = neo4j_handler.read_all()
    for person in all_people:
        print(person)

    # Close connection
    neo4j_handler.close()
```