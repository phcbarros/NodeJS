function media(p1, p2, p3) {
    return ((p1 + p2 + p3) / 3).toFixed(2);
}

const notas = [7.2, 7.8, 8.2, 0];
console.log(media.apply(null, notas));
console.log(media(...notas));