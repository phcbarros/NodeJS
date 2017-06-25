var nome = 'Paulo', anoNascimento = 1987;

function idade(){
    return new Date().getFullYear() - this.anoNascimento;
}

var pessoa = {
    nome,
    anoNascimento,
    idade,
    toString() { return `Meu nome é ${this.nome} e tenho ${this.idade()} anos.` }
}

//pessoa.nome = 'Janaina';
//pessoa.anoNascimento = 1995;
console.log(pessoa.toString());