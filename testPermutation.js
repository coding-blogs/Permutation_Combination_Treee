const stringPermutation = require('./permutationCombinationTree');

var permuationStringObject = new stringPermutation('AAAN');
let repeted = 2, n = 4, k = 4
var perWithRepition = permuationStringObject.permutationWithRepition;
var res1 = perWithRepition.call(permuationStringObject, k);
var res2 = permuationStringObject.permutationWithoutRepition(k);
var combs = permuationStringObject.combination(k);
console.log(combs, combs.length) ;
//console.assert(combs.length === )
//console.log(permuationStringObject);
console.log(res1, res1.length);
console.log(res2, res2.length);
