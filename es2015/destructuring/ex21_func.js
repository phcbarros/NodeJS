function random([min = 0, max = 1000]){
    if(min > max) [min, max] = [max, min];
    const value = Math.random() * (max - min);
    return Math.floor(value) + min;
}

console.log(random([12, 5])); //10
console.log(random([100])); //217
console.log(random([, 900])); //698
console.log(random([])); //1