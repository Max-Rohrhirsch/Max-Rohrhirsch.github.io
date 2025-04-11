# Elastic Search

### Docker-Compose
```yaml
version: '3.8'

services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.6.2
    container_name: elasticsearch
    environment:
      - discovery.type=single-node
      - bootstrap.memory_lock=true
      - xpack.security.enabled=false  # Disable security for simplicity
    ulimits:
      memlock:
        soft: -1
        hard: -1
    ports:
      - "9200:9200"

  kibana:
    image: docker.elastic.co/kibana/kibana:8.6.2
    container_name: kibana
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    ports:
      - "5601:5601"
```

### Python Implementation
```python
from elasticsearch import Elasticsearch

class ElasticsearchHandler:
    def __init__(self, host="localhost", port=9200):
        self.es = Elasticsearch([{"host": host, "port": port, "scheme": "http"}])

    def create_person(self, name, age, parents, friends):
        doc = {
            "name": name,
            "age": age,
            "parents": parents,
            "friends": friends,
        }
        response = self.es.index(index="people", document=doc)
        print("Document indexed:", response)

    def read_all(self):
        response = self.es.search(index="people", query={"match_all": {}})
        print("Search results:")
        for hit in response["hits"]["hits"]:
            print(hit["_source"])

    def create_index(self, index_name, mappings=None):
        """Create an index with optional mappings."""
        if not self.es.indices.exists(index=index_name):
            self.es.indices.create(index=index_name, body=mappings or {})
            print(f"Index '{index_name}' created.")
        else:
            print(f"Index '{index_name}' already exists.")

    def delete_index(self, index_name):
        """Delete an index."""
        if self.es.indices.exists(index=index_name):
            self.es.indices.delete(index=index_name)
            print(f"Index '{index_name}' deleted.")
        else:
            print(f"Index '{index_name}' does not exist.")

    def clear_index(self, index_name):
        """Clear all documents from an index without deleting it."""
        if self.es.indices.exists(index=index_name):
            self.es.delete_by_query(index=index_name, body={"query": {"match_all": {}}})
            print(f"Index '{index_name}' cleared.")
        else:
            print(f"Index '{index_name}' does not exist.")

    def add_document(self, index_name, doc_id, document):
        """Add a document to an index."""
        self.es.index(index=index_name, id=doc_id, body=document)
        print(f"Document added to index '{index_name}'.")

    def get_all_documents(self, index_name):
        """Retrieve all documents from an index."""
        if self.es.indices.exists(index=index_name):
            response = self.es.search(index=index_name, body={"query": {"match_all": {}}})
            return response["hits"]["hits"]
        else:
            print(f"Index '{index_name}' does not exist.")
            return []

# Example usage
if __name__ == "__main__":
    es_handler = ElasticsearchHandler()

    # Define an index name
    index_name = "people"

    # Create index
    es_handler.create_index(index_name)

    # Add some documents
    es_handler.add_document(index_name, 1, {"name": "Alice", "age": 30})
    es_handler.add_document(index_name, 2, {"name": "Bob", "age": 25})

    # Fetch and print all documents
    docs = es_handler.get_all_documents(index_name)
    print("Documents:", docs)

    # Clear the index
    es_handler.clear_index(index_name)

    # Delete the index
    es_handler.delete_index(index_name)
```