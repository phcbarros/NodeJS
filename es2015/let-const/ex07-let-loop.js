var funcs = [];

for (let i = 0; i < 10; i++) {
    funcs.push(() => {
        return i;
    });
}

console.log(funcs[2]());
console.log(funcs[8]());