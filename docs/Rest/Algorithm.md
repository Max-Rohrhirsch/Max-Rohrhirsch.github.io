# Algorithm

# Quicksort
```python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)
```

# Binary Search
```python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
```

# Breadth-First Search
```python
def bfs(graph, start):
    visited, queue = set(), [start]
    while queue:
        vertex = queue.pop(0)
        if vertex not in visited:
            visited.add(vertex)
            queue.extend(graph[vertex] - visited)
    return visited
```

# Depth-First Search
```python
def dfs(graph, start):
    visited, stack = set(), [start]
    while stack:
        vertex = stack.pop()
        if vertex not in visited:
            visited.add(vertex)
            stack.extend(graph[vertex] - visited)
    return visited
```

---

# Data Structures

# Linked List
A linked list is a linear collection of nodes where each node points to the next.
```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
        else:
            current = self.head
            while current.next:
                current = current.next
            current.next = new_node
```

# Stack
A stack follows the Last In First Out (LIFO) principle.
```python
class Stack:
    def __init__(self):
        self.stack = []
    
    def push(self, data):
        self.stack.append(data)
    
    def pop(self):
        if self.stack:
            return self.stack.pop()
        return None
```

# Queue
A queue follows the First In First Out (FIFO) principle.
```python
class Node:
    def __init__(self, data):
        self.data = data  # Holds the data
        self.next = None  # Points to the next node in the queue

class Queue:
    def __init__(self):
        self.front = None  # Points to the front node of the queue
        self.rear = None   # Points to the last node of the queue

    def is_empty(self):
        return self.front is None

    def enqueue(self, data):
        new_node = Node(data)  # Create a new node with the data
        if self.rear is None:  # If the queue is empty
            self.front = self.rear = new_node  # Both front and rear point to the new node
            return
        self.rear.next = new_node  # Link the new node to the rear node
        self.rear = new_node       # Update the rear to the new node

    def dequeue(self):
        if self.is_empty():
            raise IndexError("Dequeue from empty queue")
        dequeued_data = self.front.data  # Get the data from the front node
        self.front = self.front.next    # Move the front to the next node
        if self.front is None:  # If the queue becomes empty
            self.rear = None    # Rear should also be None
        return dequeued_data
```

# Binary Tree
```python
class TreeNode:
    def __init__(self, key):
        self.left = None
        self.right = None
        self.value = key

    def insert(self, key):
        if key < self.value:
            if self.left is None:
                self.left = TreeNode(key)
            else:
                self.left.insert(key)
        else:
            if self.right is None:
                self.right = TreeNode(key)
            else:
                self.right.insert(key)

    def inorder(self):
        if self.left:
            self.left.inorder()
        print(self.value, end=" ")
        if self.right:
            self.right.inorder()
```

# Hash Table
A hash table is a data structure that maps keys to values for efficient lookup.
```python
class HashTable:
    def __init__(self):
        self.size = 10
        self.table = [[] for _ in range(self.size)]

    def _hash_function(self, key):
        return key % self.size

    def insert(self, key, value):
        hash_key = self._hash_function(key)
        self.table[hash_key].append((key, value))

    def search(self, key):
        hash_key = self._hash_function(key)
        for k, v in self.table[hash_key]:
            if k == key:
                return v
        return None

    def delete(self, key):
        hash_key = self._hash_function(key)
        for i, (k, v) in enumerate(self.table[hash_key]):
            if k == key:
                del self.table[hash_key][i]
```
