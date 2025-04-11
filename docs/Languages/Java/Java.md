# Java
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>

```java
public class ClassName {
    public static void main(String[] args){
        System.out.println("Hello World");
    }
}
```
```java
// Vererbung
    
class Mitarbeiter extends Person {
    /* ... */
}
```
```java
// Abstract

abstract class Animal {
    // Abstract method (does not have a body)
    public abstract void animalSound();
}
```
```java
/* Interfaces
   An interface is a completely 
   "abstract class" that is used to
   group related methods with empty bodies*/

interface Animal {
    public void animalSound(); 
    public void run(); 
}
```
```java
// Polymorphism
    
Animal myDog = new Dog();
```
```java
// Nested classes

class OuterC {
    int x = 10;
    
    class InnerC {
        int y = 5;
    }
}
// ...
OuterC myOuter = new OuterC();
OuterC.InnerC myInner = myOuter.new InnerC();

```
```java
// Enum

enum Level {
    LOW,
    MEDIUM,
    HIGH
}
Level myVar = Level.MEDIUM;
```
```java
// Exceptions

try {   
    //  Block of code to try
} catch(Exception e) {
    //  Block of code to handle errors
} 
```
```java
// Type casting

int myInt = (int) myDouble;
```
</div>

## With Imports
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>

```java
// Inputs

import java.util.Scanner;

class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);  // Create a Scanner object
    
        String userName = sc.nextLine();  // Read user input
        System.out.println("Username is: " + userName);  
    }
}
```
```java
// Array Lists

import java.util.ArrayList; 

ArrayList <String> cars = new ArrayList <String>(); 

cars.add("Volvo");
cars.get(0);
cars.set(0, "Opel");
cars.remove(0);
cars.size();

Stack<String> stack = new Stack<();
stack.search("apple") 
```
```java
// Dictionaries/ HashMap

import java.util.HashMap; 

HashMap<String, String> capitalCities = new HashMap<String, String>();

capitalCities.put("England", "London");
capitalCities.get("England");
capitalCities.remove("England");
```
```java
// Threads

public class Main extends Thread {

    public static void main(String[] args) {

        Main thread = new Main();
        thread.start();
    }

    public void run() {
        // ...
    }
}
```
```java
// File handling

import java.io.File; 
import java.util.Scanner;

File myObj = new File("filename.txt"); 
Scanner myReader = new Scanner(myObj);

while (myReader.hasNextLine()) {
    String data = myReader.nextLine();
    System.out.println(data);
}
myReader.close();
myObj.delete()

/* ----------------------------------- */

import java.io.FileWriter; 

FileWriter myWriter = new FileWriter("filename.txt");
myWriter.write("Files in Java might be tricky, but it is fun enough!");
myWriter.close();

```
```java
// One liners
 
import java.util.function.Consumer;

Consumer<Integer> method = (n) -> { System.out.println(n); };
numbers.forEach( method );

// Or you write
numbers.forEach( (n) -> { System.out.println(n); } );

// Multiple Each Item in a List by 2
IntStream.range(1, 10).map(i -> i * 2);

// Sum a List of Numbers
IntStream.range(1, 1000).sum();

// If one liner
name = condition ? "then" : "else";

//for loop
for (type elementName : arrayName) {
    // ...
}
```
```java
// Generics

public static <T extends Number> void myFunction(T number){
    // ...    
}
```
```java
// args and quarks

public void useKwargs(String... parameters) {
    for (String param : parameters) {
        System.out.println( param );
    }
}
```
```java
// time

import java.time.LocalDateTime;

LocalDateTime myObj = LocalDateTime.now();    // -> 2023-10-06T17:54:36.019837

DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
String formattedDate = myDateObj.format(myFormatObj);

SimpleDateFormat format = new SimpleDateFormat("HH:mm:ss");
Date date1 = format.parse(time1);
Date date2 = format.parse(time2);
long difference = date2.getTime() - date1.getTime(); 
```
</div>