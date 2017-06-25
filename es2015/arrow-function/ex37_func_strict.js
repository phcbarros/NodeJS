'use strict'

this.desc = 'Sou eu... :p';
console.log(this);

const func = function(msg) {
    console.log(msg, this === undefined);
}
func('Sem bind');

const funcBind = func.bind(this);
funcBind('Com bind');

const arrowFunc = () => console.log('Arrow function', this, this === module.exports);
arrowFunc();