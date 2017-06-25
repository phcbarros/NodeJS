const pessoa = { 
    nome: 'Ana',
    endereco: {
        rua: 'A',
        numero: 1000
    }
};

const { endereco : { rua, numero, cep } } = pessoa;
console.log(rua, numero, cep);

const { conta: { agencia } } = pessoa;