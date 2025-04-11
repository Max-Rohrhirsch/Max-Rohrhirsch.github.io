# Bash

<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>

```Bash
name="John"
echo "Hi $name"  #=> Hi John
```
```Bash
# if

if [[ -z "$string" ]]; then
    echo "String is empty"
elif [[ -n "$string" ]]; then
    echo "String is not empty"
fi
```
```Bash
# wildcard

wildcard="*.txt"
options="iv"
cp -$options $wildcard /tmp
```
```Bash
# Function

get_name() {
    echo "John"
}
get_name
```
```Bash
# for

for i in /etc/rc.*; do
    echo "$i"
done

for ((i = 0 ; i < 100 ; i++)); do
    echo "$i"
done

for i in {1..5}; do
    echo "Welcome $i"
done
```
```Bash
# Array

Fruits = ('Apple' 'Banana' 'Orange')
```
```Bash
# Easy commands

echo $(whoami)       # Outputs commands

read name
echo $name
```
</div>