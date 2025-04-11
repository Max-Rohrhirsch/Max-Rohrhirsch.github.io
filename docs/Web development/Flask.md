# Flask

```python
from flask import Flask, request, session, redirect, jsonify, url_for
from flask_socketio import SocketIO


app = Flask(__name__)
app.secret_key = SECRET_KEY
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        session['username'] = request.form['username']
        return redirect(url_for('helloWorld'))
    return '''
        <form method="post">
            <p><input type=text name=username>
            <p><input type=submit value=Login>
        </form>
    '''
```
```python
import sqlite3

def get_connection():
    return sqlite3.connect("umoc.db", check_same_thread=False)

def create_tables():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    ...""")
    conn.commit()
    conn.close()
```
```python
# Server-side (Flask-SocketIO)

# 1. Basic Setup
from flask_socketio import SocketIO, emit, join_room, leave_room
socketio = SocketIO(app, cors_allowed_origins="*")

# 2. Core Event Functions
@socketio.on('connect')                      # Handle new connections
@socketio.on('disconnect')                   # Handle disconnections
@socketio.on('message')                      # Handle custom events

# 3. Sending Messages
# To specific client
emit('event_name', data, to=specific_user_sid)  

# To a room
emit('event_name', data, to=room_name)

# Broadcast to all except sender
emit('event_name', data, broadcast=True)

# Broadcast to all including sender
emit('event_name', data, broadcast=True, include_self=True)

# 4. Room Management
join_room(room_name)                        # Add user to room
leave_room(room_name)                       # Remove user from room

# 5. Get Session Info
from flask import request
client_sid = request.sid                    # Get client's socket ID
```