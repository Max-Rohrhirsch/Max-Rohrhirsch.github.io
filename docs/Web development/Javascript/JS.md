# JS
```js
function fibonacci(num) {
    if(num < 2) {
        return num;
    }
    else {
        return fibonacci(num-1) + fibonacci(num - 2);
    }
}
```

```js
const nTerms = prompt('Enter the number of terms: ');

if(nTerms <=0) {
    console.log('Enter a positive integer.');
}
else {
    for(let i = 0; i < nTerms; i++) {
        console.log(fibonacci(i));
    }
}

const cars = ["Saab", "Volvo", "BMW"];

Math.random();

fruits.forEach(myFunction);
```

Often Used Functions:
```js
                
element = document.getElementById("myBtn")
element = cocument.getElementsByClassName("myBtn")

element.addEventListener("click", function(){ myFunction(p1, p2); });
```

