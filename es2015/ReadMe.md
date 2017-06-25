# ECMAScript 2015

## Var
Usada para declara variável e possuem escopo **global e função**. Pode ser redeclarada no mesmo escopo;

```javascript
var semProblema  = 1;
var semProblema = 2;
```

## Let e Const
Usadas para declarar variáveis e elas podem possuir escopo **global, de função ou de bloco**.

Não é possível redeclarar a mesma variaável no mesmo escopo.
```javascript
var semProblema  = 1;
var semProblema = 2;

console.log(semProblema); // 2

var comProblema = 3;
let comProblema = 4; //Identifier 'comProblema' has already been declared.

console.log(comProblema);
```

### Let
Não sofre hoisting.

```javascript
console.log('a =', a); //a = undefined
var a = 2;

console.log('b = ', b); //ReferenceError: b is not defined.
let b = 5; 
```

## Const
No momento da declaração é obrigatório a inicialização da variável.

```javascript
const a; //Missing initializer in const declaration.
a = 1;

console.log(a);
```

O valor declarado na variável não pode ser alterado.

```javascript
const produto = {
    nome: 'Caneta',
    preco: 2.59
};

produto.nome = 'Notebook'; //é permitido pois a referência não foi alterada.
console.log(produto.nome); //Notebook

produto = {}; //Assignment to constant variable.
```