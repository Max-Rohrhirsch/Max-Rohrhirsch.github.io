# Rust

<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>

```rust
// Basic
fn main() { 
    const PI:f32 = 3.14; 
    println!("PI {}",PI); 
}
```
```rust
// Datatypes

let num: int = -1i8;
let an_integer = 1u32;
let salary:f64 = 35_000.00;
let mut mutable_binding = ;

const PI:f32 = 3.14;

let name1 = "Hello".to_string();
let name:String = String::from("TutorialsPoint");
```
```rust
// if
if num > 0 {
    println!("{} is positive",num);
} else if num < 0 {
    println!("{} is negative",num);
} else {
    println!("{} is neither positive nor negative",num) ;
}
```
```rust
// match case

let state_code = "MH";
let state = match state_code {
    "MH" => {println!("Found match for MH"); "Maharashtra"},
    "KL" => "Kerala",
    "KA" => "Karnadaka",
    "GA" => "Goa",
    _ => "Unknown"
};
```
```rust
// for and while
for x in 1..11{ // 11 is not inclusive
    // ...
}

while x < 10{
    // ...
}

loop {
    x+=1;
    println!("x={}",x);

    if x==15 {
        break;
    }
}

for num in 0..21 {

}
```
```rust
// Function
fn mutate_no_to_zero(mut param_no: i32, param: String) {
    // ...
}
```
```rust
// Tuple & Array

let tuple:(i32,f64,u8) = (-325,4.9,22);

let arr:[i32;4] = [10,20,30,40];
let arr = [10,20,30,40];

println!("{:?}",arr);
```
```rust
// Struct 1

struct Employee {
    name:String,
    company:String,
    age:u32
}

let emp1 = Employee {
    company:String::from("TutorialsPoint"),
    name:String::from("Mohtashim"),
    age:50
};

display(emp1);
                
```
```rust
// Struct 2

//define dimensions of a rectangle
struct Rectangle {
   width:u32, height:u32
}

//logic to calculate area of a rectangle
impl Rectangle {
   fn area(&self)->u32 {
      //use the . operator to fetch the value of a field via the self keyword
      self.width * self.height
   }
}

let p1 = Rectangle::getInstance(10,20);
```
```rust
// modules

pub mod movies {
    pub fn play(name:String) {
        println!("Playing movie {}",name);
    }
}

movies::play("Herold and Kumar".to_string());

use movies::play;
play("dddd".to_string());
```
```rust
// Error handeling

let f = File::open("pqr.txt").expect("File not able to open");

if no%2==0 {
    return Ok(true);
} else {
    return Err("NOT_AN_EVEN".to_string());
}

let f = File::open("main.jpg");   // main.jpg doesn't exist
match f {
    Ok(f)=> {
        println!("file found {:?}",f);
    },
    Err(e)=> {
        println!("file not found \n{:?}",e);   //handled error
    }
}
```
```rust
// Generics

fn print_pro(t:T){
    println!("Inside print_pro generic function:");
    println!("{}",t);
}
```
```rust
// File Handeling
use std::io::Write;
let mut file = std::fs::File::create("data.txt").expect("create failed");
file.write_all("Hello World".as_bytes()).expect("write failed");

use std::fs::OpenOptions;
use std::io::Write;
let mut file = OpenOptions::new().append(true).open("data.txt").expect(
    "cannot open file");

use std::io::Read;
let mut file = std::fs::File::open("data.txt").unwrap();
let mut contents = String::new();
file.read_to_string(&mut contents).unwrap();
print!("{}", contents);

use std::fs;
fs::remove_file("data.txt").expect("could not remove file");
```
</div>