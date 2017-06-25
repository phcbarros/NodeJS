const [a] = [10];
console.log(a); //10

const [n1,,n3,,n5,n6 = 0] = [10,5,7,9];
console.log(n1, n3, n5, n6); //10 7 undefined 0

const [,[,nota]] = [[4,3,7],[1,10,5]];
console.log(nota); //10