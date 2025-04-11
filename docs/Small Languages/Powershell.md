# Powershell

<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>

```powershell
Get-process
Get-service
get-help md
ls -Path HKLM:\HARDWARE
```
```powershell
# sql like
Get-process | where handels -gt 900 | sort handels
Get-service | select -property name, status
```
```powershell
# output
Tree | out-file j:\main.html
| ConvertTo-html | out-file j:\main.html
```
```powershell
# vars
$location = Get-Location
```
```powershell
# if
if($x -le 20){
    write-host("This is if statement")
}else {
    write-host("This is else statement")
}
```
```powershell
# for loop
for($i = 0; $i -lt $array.length; $i++){ 
    $array[$i] 
}
```
```powershell
# while loop
while($counter -lt $array.length) {
   $array[$counter]
}
```
```powershell
# for each loop
$array = @("item1", "item2", "item3")
$A = 1, 2, 3, 4


foreach ($element in $array) { $element }

$array | foreach { $_ }
```
```powershell
# regex
"book" -match "oo"
"and" -match "[^brt]nd"
```
```powershell
# function
function Verb-Noun {
    param (
        # static parameters
    )
    dynamicparam {
        # dynamic parameters
    }
    begin {
        # start of the pipeline
    }
    process {
        # ran for each item in the pipeline
    }
    end {
        # end of the pipeline
    }
}
```
</div>