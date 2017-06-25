function media(...notas) {
    const total = notas.reduce((soma, nota) => soma + nota);
    return (total /notas.length).toFixed(2);
}

console.log(media(7.8, 8.5, 9.3));