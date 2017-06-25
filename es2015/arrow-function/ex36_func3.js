const estoque = [
    { nome: 'Livro', preco: 12.58, quantidade: 52, fragil: false },
    { nome: 'Monitor LG', preco: 1512.58, quantidade: 12, fragil: true },
    { nome: 'Ovo - 30 un', preco: 10.00, quantidade: 100, fragil: true },
    { nome: 'Ipad 32 GB, 1219', preco: 2220.00, quantidade: 15, fragil: true },
    { nome: 'Pneu Pirelli', preco: 1000.99, quantidade: 12, fragil: false }
];

const isPrecoAlto = item => item.preco >= 1000;
const isFragil = item => item.fragil;
const soma = (total, quantidade) => total + quantidade

const qtdProdutosCarosEFrageis = estoque
    .filter(isPrecoAlto)
    .filter(isFragil)
    .map(item => item.quantidade)
    .reduce(soma);

console.log(`Total de produtos caros e frágeis ${qtdProdutosCarosEFrageis}`);

const qtdProdutosCaros = estoque
    .filter(isPrecoAlto)
    .map(item => item.quantidade)
    .reduce(soma);

console.log(`Total de produtos caros ${qtdProdutosCaros}`);

const createObj = () => ({
    nome: 'Paulo',
    idade: 29
});

const obj = createObj();
console.log(obj)