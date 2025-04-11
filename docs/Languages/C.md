# C/C++

### OOP
```cpp
class Car {
    public ...;
    private ...;
};
```

### Pointer
```cpp
String ptr = &var;

ptr // 0x6f...
*ptr //value
```

### Array
```cpp
#include <vector>

std::vector<int> v = {1, 2, 3};
v.push_back(4); // Adds 4 to the end
std::cout << "Vector size: " << v.size() << std::endl;
std::cout << "Second element: " << v.at(1) << std::endl; // Accesses second element
v.pop_back(); // Removes the last element
```
```cpp
#include <list>
std::list<int> l = {2, 3, 4};
l.push_front(1); // Inserts 1 at the beginning
l.push_back(5); // Inserts 5 at the end
for (auto it = l.begin(); it != l.end(); ++it) {
    std::cout << *it << ' ';
}
std::cout << std::endl;
l.pop_front(); // Removes the first element
l.pop_back(); // Removes the last element
```
```cpp
#include <stack>
std::stack<int> s;
s.push(1); // Pushes 1 onto the stack
s.push(2); // Pushes 2 onto the stack
std::cout << "Top element: " << s.top() << std::endl; // Views the top element
s.pop(); // Removes the top element
```
              
### Malloc
```cpp
int *ptr; //pointer
ptr = malloc(5 * sizeof(int))

*(ptr + 1) = 20;

free(ptr)
```

### Struct
```cpp
struct Adresse {
    char city[200];
}

struct Adresse myOberkirch;
myOberkirch.city = "..."


typedef struct {
    char age[200];
} Person;

Person max;
max.age = 19;
```

### Header
```cpp
                // Header

// foo.h
#ifndef FOO_H_   
#define FOO_H_
int foo(int x);  
#endif 

// foo.c
#include "foo.h" 
int foo(int x)   
{
    return x + 5;
}

// main.c
#include 
#include "foo.h"  
int main(void)
{
    int y = foo(3); 
    printf("%d\n", y);
    return 0;
}

// gcc -o my_app main.c foo.c
```
