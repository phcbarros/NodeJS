function tag(strings, ...values){
    console.log(strings);
    console.log(values);
    return 'Outro valor';
}

let nome = 'Paulo';
let status = 'Aprovado';

console.log(tag `O aluno ${nome} está ${status}`);