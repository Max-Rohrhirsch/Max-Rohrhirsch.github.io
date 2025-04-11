# Regex

```python
import re
text = "..."
pattern = re.compile(r'abc')

matches = pattern.finditer(text)

for match in matches:
    print(match)
```

# Regular Expressions Reference

## Symbols

| Symbol | Description                   |
|--------|-------------------------------|
| `.`    | Everything but a new line     |
| `\d`   | Digits 0 - 9                  |
| `\D`   | Not a digit                   |
| `\w`   | (a-z, A-Z, 0-9, _)            |
| `\W`   | Not a "normal" character      |
| `\s`   | Whitespace (space, tab, new line) |
| `\S`   | Not a Whitespace              |
| `\b`   | Word Boundary (space before)  |
| `^`    | Start of string               |
| `$`    | End of string                 |

---

## More Symbols

| Symbol   | Description                |
|----------|----------------------------|
| `[ ]`    | Matches character          |
| `[^ ]`   | Not in brackets            |
| `|`      | Either or                  |
| `{3,4}`  | Range                      |
| `[a-g]`  | Character between a & g    |
| `{3}`    | Exact                      |
| `*`      | 0 or more                  |
| `+`      | 1 or more                  |
| `?`      | 0 or 1                     |

### Escaping Special Characters

`\.` `\*` `\\` - Escaped special characters

---

## Flags

| Symbol  | Description                                          | Example                    |
|---------|------------------------------------------------------|----------------------------|
| `/i`    | Case-insensitive                                     | `/aBc/i` would match `AbC`.|
| `/m`    | Multiline. `^` and `$` match start and end of lines. | `/^[\s\S]+$/m`             |
| `[]`    | Matches character                                    |                            |
