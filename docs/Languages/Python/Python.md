# Python

<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>

```python
myArray = [1, "hallo", 1.223]
myArray[2] //Outputs -> 1.223

myArray.extend([3, "element"])
myArray.insert(2, "...") # replaces second element
myArray.append("hi")
myArray.remove("hi")
myArray.index("hallo") 
# returns the Index of the element


dictionary = {
    name: "max",
    age: "19"
}
dictionary["age"] # Outputs -> 19


myTuple = ("apple", 83, 1)
myTuple[1] //Outputs -> 83
# Like a Array, but it cant 
# be changed after being declared.


mySet = {1, "two", 3, 4.1}
# unordered, unchangeable*, and unindexed
# not changeable but can be removed or added.
```
```python
match command.split():
    case ['show']:
        print('List all files and directories: ')

    case ['remove' | 'delete', *files] if '--ask' in files:
        del_files = [f for f in files if len(f.split('.'))>1]
        print('Please confirm: Removing files: {}'.format(del_files))

     case ['remove' | 'delete', *files]:
         print('Removing files: {}'.format(files))

     case _:
         print('Command not recognized')
```
```python
f = open("demofile.txt")
print( f.read() )

print( f.readline() ) # reads one line
f.close()

f = open("demofile2.txt", "a")
f.write("Now the file has more content!")

import os
os.remove("demofile.txt")
```
```python
x = lambda a, b : a * b
print(x(5, 6))

x = [i for i in range(10)]
```
```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

p1 = Person("John", 36)
```
```python
try:
    # ...
except:
    print("Something went wrong")
```
</div>

---

# Numpy
```Bash
pip install numba
```

<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>

```python
from numba import jit
import numpy as np

# @vectorize

x = np.arange(100).reshape(10, 10)

@njit
def go_fast(a): 
    trace = 0.0
    for i in range(a.shape[0]):   
        trace += np.tanh(a[i, i])
    return a + trace             

print(go_fast(x)) 
```
```python
import numpy as np 

arr = np.array([1, 2, 3, 4, 5]) 
print(arr[2]) 

newarr = arr.reshape(4, 3) 
newarr = np.concatenate((arr1, arr2)) 
newarr = np.array_split(arr, 3) 

x = np.where(arr == 4) 

np.sort(arr) 
```
```python
x = random.randint(100) # one  random number 
x = random.randint(100, size=(3, 5)) 
```
```python
newarr = np.add(x, y) 
newarr = np.subtract(arr1, arr2) 
newarr = np.multiply(arr1, arr2) 
newarr = np.divide(arr1, arr2) 
newarr = np.power(arr1, arr2) 
newarr = np.mod(arr1, arr2) 
newarr = np.remainder(arr1, arr2) 

x = np.prod(arr) # 1 * 2 * 3 * 4 
```
```python
np.dot(3, 4) 

x = [1, 2, 3]  
y = [4, 5, 6]  
p.cross(x, y)  
```
</div>

---

# Matplotlib

<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>

```python
import matplotlib.pyplot as plt 
import numpy as np 
    
xpoints = np.array([0, 6]) 
ypoints = np.array([0, 250]) 
    
plt.plot(xpoints, ypoints) 
plt.show() 
```
```python
# linestyle = 'dotted' 
# c = 'hotpink' 
# color = 'r' 
# alpha=0.5 
# labels = mylabels 
# width = 0.1
# map='nipy_spectral'
plt.plot(ypoints, marker = 'o') 
```
```python
font = {'family':'serif','color':'darkred','size':15} 
plt.title("Sports Watch Data", fontdict = font) 
plt.xlabel("Average Pulse", fontdict = font) 
plt.ylabel("Calorie Burnage", fontdict = font) 
```
```python
plt.scatter(x, y) # show points 
plt.subplot(1, 2, 2) 

plt.scatter(x, y, c=colors, cmap='viridis') 
plt.colorbar() 
plt.legend(title = "Four Fruits:") 

plt.bar(x,y)     
plt.hist(x) 
plt.pie(y) 
```
</div>

---

# Email

<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>

```python
import smtplib

server = smtplib.SMTP("smtp.gmail.com", 587)
server.starttls()
server.login("max007ist666@gmail.com", "passkey...")
server.sendmail("max007ist676@gmail.com", 
    "max.5666@gmail.com", "Hallo")
```
```python
import imaplib
import email
from email.header import decode_header

# Your Gmail credentials
email_user = "max007ist66776@gmail.com"
email_pass = ""

mail = imaplib.IMAP4_SSL("imap.gmail.com")
mail.login(email_user, email_pass)
mailbox = "inbox"
mail.select(mailbox)
status, email_ids = mail.search(None, "ALL")
email_ids = email_ids[0].split()

# Loop through each email
for email_id in email_ids:
    # Fetch the email by its ID
    status, msg_data = mail.fetch(email_id, "(RFC822)")
    if status == "OK":
        raw_email = msg_data[0][1]
        msg = email.message_from_bytes(raw_email)

        # Get email details
        subject, encoding = decode_header(msg["Subject"])[0]
        if isinstance(subject, bytes):
            subject = subject.decode(encoding if encoding else "utf-8")
        from_name, _ = decode_header(msg.get("From"))[0]
        if isinstance(from_name, bytes):
            from_name = from_name.decode(encoding if encoding else "utf-8")

        print("Subject:", subject)
        print("From:", from_name)

        # If the email is multipart (contains attachments)
        if msg.is_multipart():
            for part in msg.walk():
                content_type = part.get_content_type()
                content_disposition = str(part.get("Content-Disposition"))

                if "attachment" in content_disposition:
                    filename = part.get_filename()
                    if filename:
                        print("Attachment:", filename)

                if "text" in content_type:
                    text = part.get_payload(decode=True)
                    print("Text:", text.decode("utf-8", "ignore"))

        # If the email is not multipart
        else:
            content_type = msg.get_content_type()
            payload = msg.get_payload(decode=True)
            if "text" in content_type:
                print("Text:", payload.decode("utf-8", "ignore"))

# Logout and close the connection
mail.logout()                        
```
```python
from gtts import gTTS
from playsound import playsound

languedge = 'de'
tts = gTTS(text="Wann ist die schonzeit der fische",
            lang=languedge,
            slow=False)
tts.save("audio/tts.mp3")
playsound("audio/tts.mp3")
input()
```
```python
import os
import glob
from gtts import gTTS
from playsound import playsound
import speech_recognition as sr

def record(dur):
with sr.Microphone() as source:
    print("speak Anything: ")
    audio = r.record(source, duration=dur)
    print("finished")
    text = r.recognize_google(audio, language="de-DE")
    return text
```
```python
                    # SIN
import math as m

def mySin(theta):
    theta = m.fmod(theta + m.pi, 2*m.pi) - m.pi
    res = 0
    termsign = 1
    power = 1

    for i in range(10):
        res += (m.pow(theta, power) / m.factorial(power)) * termsign
        termsign *= -1
        power += 2
    return res

if x := 3:
    pass

    a = "name: %s"
    b = "max"
    print(a % b) # -> name: max
```
```python
array = [i for i in range(100)]

array[10:20:-1]

del array  # free/delete

def generator():
    for i in range(6):
        yield i*i

num: int = 5
def myFunc(a: num) -> str:
    pass
```
```python
def mydecorator(function):
    def wrapper():
        function()
        return wrapper

@mydecorator
def hello_world():
    print("hello World")
```
```python
# Args and Kwargs
def myfunction(*args, **kwargs):
    args[0]
    kwargs["param1"]


# python3 main.py test
import sys
print(sys.argv[0])  # main.py
print(sys.argv[1])  # test
```
```python

```
</div>
---

### Requirements file
Create a requirements.txt file with the following content:
```Bash
numpy==1.21.2
matplotlib==3.4.3
```
Install the dependencies using the following command:
```Bash
pip install -r requirements.txt
```

### Docstrings and Comments
```Python
def subtract(x, y):
    """
    Subtracts the second number from the first.

    Parameters
    ----------
    x : int or float
        The number from which to subtract.
    y : int or float
        The number to subtract.

    Returns
    -------
    int or float
        The result of `x - y`.
    """
    return x - y
```
