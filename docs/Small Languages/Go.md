# Go

<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>

```Go
package main
import ("fmt")

func main() {
    fmt.Println("Hello World!")
}
```
```Go
// Variables

var student1 string = "John" 
var student2 = "Jane" 
var b int

x := 2 // Only in functions

const PI = 3.14
```
```Go
// Function

func sum(int param) string {
    ...
}
```
```Go
// Struct

type Person struct {
    name string
}
person{name: ...}
```
```Go
// Array, Dict

var array [5]int
a := []int{...}
a[2] = 4
a = append(a, 13, 67, 8)

len(a)
copy(a)

b := a[2:3]


dict := make(map[string]int)
```
```Go
// For

for i := 0; i < 6; i++ {
    ...
}
```
</div>