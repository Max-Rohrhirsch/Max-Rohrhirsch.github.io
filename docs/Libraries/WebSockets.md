# Websockets

### Server
```python
from socket import AF_INET, SOCK_STREAM, socket

mySocket = socket(AF_INET, SOCK_STREAM)
mySocket.connect((IP, Port))

mySocket.send(bytes('...', 'utf8'))

mySocket.recv(10024).decode('utf8')

mySocket.close()
```

### Client
```python
from socket import AF_INET, SOCK_STREAM, socket

mySocket = socket(AF_INET, SOCK_STREAM)
mySocket.bind(Port)
mySocket.listen()
client, addr = mySocket.accept()

mySocket.close()
```

### Threads
```python
from threading import Thread

Thread(target = myFunction).start()
Thread(target = myFunction, args = (client, addr)).start()

.close()
```