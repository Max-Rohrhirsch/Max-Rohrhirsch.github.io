# BrainFuck

| Symbole | Description |
|---------|-------------|
| `>`     | Move memory pointer to the right and go to next instruction |
| `<`     | Move memory pointer to the left and go to next instruction |
| `+`     | Increment memory cell and go to next instruction |
| `-`     | Decrement memory cell and go to next instruction |
| `,`     | Read char from input and store in memory then go to next instruction |
| `.`     | Write memory value as ASCII char to output then go to next instruction |
| `[`     | Go to next instruction if cell is not null, or to the matching closing `]` if null |
| `]`     | Go back to the matching opening `[` if cell is not null, or go to next instruction if null |

<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>

```bf
Move/ Add
                    
[-<+>]   Move 1 to left
[->>+<<] Move 2 to right
```
```bf
Sub

[-<->] Substrakt
```
```bf
Copy

[->+>+<<]
```
```bf
Multiplication
 v
[A][B][_B][result]
++++++++++               (10)
>+++++<                  (5)
[>[->+>+<<]>[-<+>]<<-]   multiply
>[-]>>[-<<<+>>>]<<<      cleansing
.                        print 5x10 = 50 ('2' in ASCII)
```
```bf
Move array

[          while current array cell is not null
  [->+<]   move it to the right
  <        go to left
]          loop
```
```bf
Reverse Array
                
[                 while ArrayA last cell is not null
                  Move it after rightmost 0 delimiter of ArrayB
  [-              decrase by 1
    >>[>]>+       go to target and increase by one
    <<[<]<        go back to source
  ]               and loop
  >>[>]>[-<+>]    then move copied value after ArrayB
  <[<]>[[-<+>]>]  shift ArrayB to the left
  <<[<]<          go back to ArrayA last cell
]>                loop, and go back to left delimiter of revert(Array)
```
</div>