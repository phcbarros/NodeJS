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
//template-string/ex13_templ.js
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
//template-string/ex14_expr.js
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
//template-string/ex15_tag.js
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
//template-string/ex16_real.js
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

## Destructuring ({} ou [])
Forma simples de obter dados de objetos e arrays e precisa ser inicializado quando declarado.

### Objeto
Para recuperar o valor é preciso criar as variáveis dentro de **_{}_** ou **_[]_** com o mesmo nome da propriedade do objeto.

```javascript
//destructuring/ex17_obj.js
const pessoa = { nome: 'Ana', idade: 51 };

const { nome, idade } = pessoa;
console.log(nome, idade); //Ana 51
```

Pode dar outros nomes para as variávies.
```javascript
const { nome: n, idade: i} = pessoa;
console.log(n, i); //Ana 51
```

Pode definir valores padrão quando a propriedade não existir no objeto.

```javascript
const { genero, situacao = 'Ativa'} = pessoa;
console.log(genero, situacao); //undefined Ativa
```

Pode-se obter dados de objetos aninhados.
```javascript
//destructuring/ex18_deep.js
const pessoa = { 
    nome: 'Ana',
    endereco: {
        rua: 'A',
        numero: 1000
    }
}

const { endereco : { rua, numero, cep } } = pessoa;
console.log(rua, numero, cep); //A 1000 undefined
```

Não é possível tentar obter o valor de um objeto que não exista dentro do objeto que está sendo feita a busca.

```javascript
//destructuring/ex18_deep.js
const { conta: { agencia } } = pessoa;
console.log(agencia);
//Cannot match against 'undefined' or 'null'.
```

### Array
Para recuperar os valores de uma array é preciso declarar as variáveis na posição que elas estão dentro do array.

```javascript
//destructuring/ex19_array.js
const [a] = [10];
console.log(a); //10

const [n1,,n3,,n5,n6 = 0] = [10,5,7,9];
console.log(n1, n3, n5, n6); //10 7 undefined 0

const [,[,nota]] = [[4,3,7],[1,10,5]];
console.log(nota); //10
```

### Funções

O operador destructuring também funciona dentro de função.

```javascript
//destructuring/ex20_func.js
function random({ min = 0, max = 1000}){
    const value = Math.random() * (max - min);
    return Math.floor(value) + min;
}

console.log(random({min: 12, max: 5})); //10
console.log(random({min: 50})); //217
console.log(random({})); //833
console.log(random()); //Cannot match against 'undefined' or 'null'.
```

```javascript
//destructuring/ex21_func.js
function random([min = 0, max = 1000]){
    if(min > max) [min, max] = [max, min];
    const value = Math.random() * (max - min);
    return Math.floor(value) + min;
}

console.log(random([12, 5])); //10
console.log(random([100])); //217
console.log(random([, 900])); //698
console.log(random([])); //1
```