Takes any rules with multiple selectors and splits them into individual rules.

Installation:
```npm i -g https://github.com/yurimataev/css-split-selectors.git```

Usage:
```css-split <path to CSS file>```

Example:

_input.css_
```
h1, h2 {
    padding: 5px;
    margin: 5px;
}
```

```
css-split input.css
```

Output:
```
h1 {
    padding: 5px;
    margin: 5px;
}
h2 {
    padding: 5px;
    margin: 5px;
}
```