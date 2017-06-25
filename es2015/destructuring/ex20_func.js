function random({ min = 0, max = 1000}){
    const value = Math.random() * (max - min);
    return Math.floor(value) + min;
}

console.log(random({min: 12, max: 5})); //10
console.log(random({min: 50})); // 217
console.log(random({})); //833
console.log(random()); //Cannot match against 'undefined' or 'null'.
