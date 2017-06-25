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

## Template Literals \`...`

Usada para interpolação de strings. Pode ser usado com múltiplas linhas, variaváveis e expressões;

### Múltiplas linhas
A formatação é respeitada.

```javascript
let nome = 'paulo';
let es5 = 'olá ' + nome + '!';
let es6 = `
    olá
    ${nome}!`;

console.log(es5, es6);

//olá paulo!
//    olá
//    paulo!
```

### Expressão
A expressão será interpretada.

```javascript
function upper(s){
    return s.toUpperCase();
}

console.log(`O soma de 1 + 1 = ${ 1 + 1 }`);
console.log(`Ei...${upper('cuidado')}`);

//O soma de 1 + 1 = 2
//Ei...CUIDADO
```

### Tagged Templates
Processa o template dentro de uma função.

```javascript
function tag(strings, ...values){
    console.log(strings);
    console.log(values);
    return 'Outro valor';
}

let nome = 'Paulo';
let status = 'Aprovado';

console.log(tag `O aluno ${nome} está ${status}`);

//[ 'O aluno ', ' está ', '' ]
//[ 'Paulo', 'Aprovado' ]
//Outro valor
```

Exemplo real:
```javascript
function real(strings, ...values){
    const resultado = [];
    values.forEach((value, index) => {
        value = (typeof value === 'number') 
            ? `R$${value.toFixed(2)}` : value;
        
        resultado.push(strings[index], value);
    });
    return resultado.join('');
}

const preco = 29.99, parcela = 11;
console.log(real `1x de ${preco} ou 3x de ${parcela}`); //1x de R$29.99 ou 3x de R$11.00
```