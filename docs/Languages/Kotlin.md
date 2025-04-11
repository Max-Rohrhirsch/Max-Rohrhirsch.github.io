# Kotlin

### Installation 
```bash
kotlinc hello.kt -include-runtime -d hello.jar
```

<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>

```kt
fun main() {
    var hello = "Hello"
    var hello: String = "Hello"
    println(hello)
}
```
```kt
var hello = "Hello" // var is a variable 
val hello = "Hello" // val is a constant
var hi: string? // can be null
val c: Int
c = 3 // can only be assignt once

var a = 1
val s1 = "a is $a" // string formating

val nullableStringLength: Int? = nullableString?.length
```
```kt
class Humanoid {
    val name = "Max"

    fun yo() {
        print(name)
    }
}

fun Humanoid.walk() {
    
}

data class User(val name: String, val age: Int)
val person = User("Max", 48)

val (name, age) = person

class MyChildClass: MyParentClass() {

}

fun getStringLength(obj: Any): Int? {} // Type check

```
```kt
fun double(x: Int) = x * 2

var lambda: (Int) -> Int = { num -> double(num) }
        
```
```kt
if (condition1) {
   
} else if (condition2) {
    
} else {
    
}

if (x in 1..y+1) {
    println("fits in range")
}
```
```kt
val result = when (day) {
    1 -> "Monday"
    2 -> "Tuesday"
    3 -> "Wednesday"
    4 -> "Thursday"
    5 -> "Friday"
    6 -> "Saturday"
    7 -> "Sunday"
    else -> "Invalid day."
}
```
```kt
while (condition) {
    // code block to be executed
}

do {
    // code block to be executed
}
while (condition);

for (x in cars) {
    println(x)
}

for (nums in 5..15) {
    println(nums)
} 
```
```kt
val cars = arrayOf("Volvo", "BMW")
```
</div>