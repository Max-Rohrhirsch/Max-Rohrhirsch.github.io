# Typst

<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>

```Typst
// Aufzählung
1. ...
2. ...

+ The climate
+ The topography
+ The geology

Manually numbered:
2. What is the first step?
5. I am confused.
+  Moving on ...

#set enum(numbering: "a)")
+ Starting off ...   // a) ...
+ Don't forget step two // b) ...
```
```Typst
// Split/Grid

#grid(
  columns: (1fr, 1fr),
  align(center)[
    Therese Tungsten \
    Artos Institute \
    #link("mailto:tung@artos.edu")
  ],
  align(center)[
    Dr. John Doe \
    Artos Institute \
    #link("mailto:doe@artos.edu")
  ]
)
```
```Typst
// cite
This was already noted by
pirates long ago. @arrgh

Multiple sources say ...
@arrgh @netwok.

You can also call `cite`
explicitly. #cite(<arrgh>)

#bibliography("works.bib")
```
```Typst
// Aufzählung 
. ...
. ...
. ...

- Temperature
- Precipitation
- third
```
```Typst
= Überschrift
== Zweite Überschrift
=== Dritte Überschrift

*BOLD*
_ITALIC_
```
```Typst
#image("glacier.jpg", width: 70%)
```
```Typst
#figure(
  image("glacier.jpg", width: 70%),
  caption: [
    _Glaciers_ form an important part
    of the earth's climate system.
  ],
)
```
```Typst
// Math
$Q = rho A v + C$

$ sum_(i=0)^nabla
    (Q_i (a_i - epsilon)) / 2 $
    
$ v := vec(x_1, x_2, x_3) $
```
```Typst
#set page(
  paper: "a6",
  margin: (x: 1.8cm, y: 1.5cm),
)
#set par(
  justify: true,
  leading: 0.52em,
)
```
```Typst
// template
#let conf(title, doc) = {
	#title
	...
}

-------

#import "Template.typ": conf
#conf(title, doc)
```
```Typst
#link("https://example.com") \
#link("https://example.com")[
  See example.com
]
```
```Typst
\`\`\`rust
fn main() {
    println!("Hello World!");
}
\`\`\`
```
</div>

### Advanced
```Typst
#set table(
  stroke: none,
  gutter: 0.2em,
  fill: (x, y) =>
    if x == 0 or y == 0 { gray },
  inset: (right: 1.5em),
)

#show table.cell: it => {
  if it.x == 0 or it.y == 0 {
    set text(white)
    strong(it)
  } else if it.body == [] {
    // Replace empty cells with 'N/A'
    pad(..it.inset)[_N/A_]
  } else {
    it
  }
}

#let a = table.cell(
  fill: green.lighten(60%),
)[A]
#let b = table.cell(
  fill: aqua.lighten(60%),
)[B]

#table(
  columns: 4,
  [], [Exam 1], [Exam 2], [Exam 3],

  [John], [], a, [],
  [Mary], [], a, a,
  [Robert], b, a, b,
)
```

### Bib or yaml
```Typst
@article{lin1973,
    author  = {Shen Lin and Brian W. Kernighan},
    title   = {An Effective Heuristic Algorithm for the Travelling-Salesman Problem},
    journal = {Operations Research},
    volume  = {21},
    year    = {1973},
    pages   = {498--516},
}
```