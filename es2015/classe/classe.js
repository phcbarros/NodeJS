class Busca {
    constructor(nome) {
        this.nome = nome;
    }

    somar(a, b) {
        return a + b;
    }

    alterarTeste(value){
        this.teste = value;
    }
    
}

class BuscaFilho1 extends Busca {
    constructor() {
        super('busca filho 1');
        this.teste = 'Teste filho 1'
    }
    
     alterarTeste(){
        super.alterarTeste('teste passando para o pai do filho 1')
    }
}

class BuscaFilho2 extends Busca {
    constructor() {
        super('busca filho 2');
        this.teste = 'Teste filho 2';
    }

    alterarTeste(){
        super.alterarTeste('teste passando para o pai do filho 2')
    }
}


const b1 = new BuscaFilho1();
const b2 = new BuscaFilho2();

console.log(b1.nome, b1.teste);
console.log(b2.nome, b2.teste);


b2.alterarTeste();
console.log(b2.teste);

b1.alterarTeste();
console.log(b1.teste);
