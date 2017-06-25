# ECMAScript 2015

## Let e Const
Usadas para declara variáveis e elas podem possuir escopo global, de função ou de bloco.

### Let
Não sofre hoisting.

```javascript
console.log('a =', a); //a = undefined
var a = 2;

console.log('b = ', b); //ReferenceError: b is not defined
let b = 5; 
```