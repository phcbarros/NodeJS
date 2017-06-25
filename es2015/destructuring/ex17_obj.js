const pessoa = { nome: 'Ana', idade: 51 };

const { nome, idade } = pessoa;
console.log(nome, idade); //Ana 51

const { nome: n, idade: i} = pessoa;
console.log(n, i); //Ana 51

const { genero, situacao = 'Ativa'} = pessoa;
console.log(genero, situacao); //undefined Ativa