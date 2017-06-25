const estoque = [
    { nome: 'Livro', preco: 12.58, quantidade: 52, fragil: false },
    { nome: 'Monitor LG', preco: 1512.58, quantidade: 12, fragil: true },
    { nome: 'Ovo - 30 un', preco: 10.00, quantidade: 100, fragil: true },
    { nome: 'Ipad 32 GB, 1219', preco: 2220.00, quantidade: 15, fragil: true },
    { nome: 'Pneu Pirelli', preco: 1000.99, quantidade: 45, fragil: false }
];

const qtdProdutosCarosEFrageis = estoque
    .filter(item => item.preco >=1000)
    .filter(item => item.fragil)
    .map(item => item.quantidade)
    .reduce((total, quantidade) => total + quantidade);

console.log(qtdProdutosCarosEFrageis);