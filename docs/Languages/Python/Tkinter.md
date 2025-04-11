# Tkinter - Python GUI

### Installation
```bash
sudo apt-get install python3-tk
```

### Basic Window
```python
from tkinter import * 
from tkinter.ttk import * 

root = Tk()
root.title('MyTitle') 
root.geometry('100x100')  
 
# Create a Button
btn = Button(root, text = 'Click me !', bd = '5',
                          command = root.destroy) 
 
# Set the position of button on the top of window.   
btn.pack(side = 'top')    
root.mainloop()
```

### Components


<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>

```python
# Checkbox

Checkbutton1 = IntVar()   
Checkbutton2 = IntVar()   
    
Button1 = Checkbutton(root, text = "Tutorial",  
                        variable = Checkbutton1, 
                        onvalue = 1, 
                        offvalue = 0, 
                        height = 2, 
                        width = 10) 
    
Button2 = Checkbutton(root, text = "Student", 
                        variable = Checkbutton2, 
                        onvalue = 1, 
                        offvalue = 0, 
                        height = 2, 
                        width = 10) 
    
Button1.pack()   
Button2.pack()   

# deselect()
# select()
# toggle()
```
```python
menubar = Menu(root)

# repeat this Block
file = Menu(menubar, tearoff = 0) 
menubar.add_cascade(label ='File', menu = file) 
file.add_command(label ='New File', command = None) 
file.add_separator() 
file.add_command(label ='Exit', command = root.destroy) 

root.config(menu = menubar) 
```
```python
# Dropdown

menubutton = Menubutton(root, text = "Menu")   
menubutton.menu = Menu(menubutton)   
menubutton["menu"]= menubutton.menu   

# repeat
var1 = IntVar() 
menubutton.menu.add_checkbutton(label = "Courses", 
    variable = var1)  

menubutton.pack() 
```
```python
# Text

T = Text(root, height = 5, width = 52)
INPUT = T.get("1.0", "end-1c")
T.pack()
```
```python
# Radiobutton

v = StringVar(master, "1") 
 
# Dictionary to create multiple buttons 
values = {"RadioButton 1" : "1", 
        "RadioButton 2" : "2", 
        "RadioButton 3" : "3"} 

for (text, value) in values.items(): 
    Radiobutton(master, text = text, variable = v, 
        value = value).pack(side = TOP, ipady = 5)
```
```python
# List

listbox = Listbox(top)

listbox.insert(1, "Nachos")
listbox.insert(2, "Sandwich")
listbox.delete(2)
listbox.pack()
```
```python
# Combobox

n = tk.StringVar() 
monthchoosen = ttk.Combobox(window, 
    width = 27, 
    textvariable = n) 
    
# Adding combobox drop down list 
monthchoosen['values'] = (' January',  
                            ' February') 
    
monthchoosen.grid(column = 1, row = 5) 
monthchoosen.current(2) # default
```
```python
# Scale 

s1 = Scale( root, variable = v1,  
    from_ = 1, to = 100,  
    orient = HORIZONTAL)  
    # VERTICAL

s1.pack()
```
```python
# Scroll bar

scroll_bar = Scrollbar(root) 

scroll_bar.pack( side = RIGHT, 
    fill = Y ) 
```
```python
# Label

label = Label(top, text = "Username")  
label.pack()

msg = Message( root, text = "A compute")   
msg.pack() 
```
```python
# Progress bar

progress = Progressbar(root, orient = HORIZONTAL, 
length = 100, mode = 'determinate') 

progress['value'] = 20
root.update_idletasks() 

progress.pack()
```
```python
# Seperator

separator = ttk.Separator(x, orient='vertical')
separator.place(relx=0.47, rely=0, relwidth=0.2, relheight=1)
```
```python
# Frame

frame = Frame(root) 
frame.pack() 
```
```python
# Grid

.grid(row = 1, column = 1, pady = 2)
.place(relx = 0.5, rely = 0.5, anchor = CENTER)
```
</div>

```python
# Entry/ Inputfields
myFont = ('calibre',10,'normal')
name_entry = tk.Entry(root,textvariable = name_var, font=myFont)
passw_entry=tk.Entry(root, textvariable = passw_var, font =myFont, show = '*')
sub_btn=tk.Button(root,text = 'Submit', command = submit)

name=name_var.get()
password=passw_var.get()
name_var.set("")
passw_var.set("")
```
```python
# Canvas

C = Canvas(root, bg="yellow",
           height=250, width=300)
 
line = C.create_line(108, 120,
                     320, 40)
 
arc = C.create_arc(180, 150, 80,
                   210, start=0,
                   extent=220)
 
oval = C.create_oval(80, 30, 140,
                     150)
C.pack()

# Paint with mouse
x1, y1, x2, y2 = ( event.x - 3 ),( event.y - 3 ), ( event.x + 3 ),( event.y + 3 ) 
w.create_line( x1, y1, x2, y2, fill = Colour )
w.bind( "<B1-Motion>", paint )

# root.bind("<Control-c>", lambda x: key())
# listbox.bind("<Double-Button>", lambda x: double_clicked())
```