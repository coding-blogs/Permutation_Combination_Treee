const fs = require('fs')
const stringPermutation = require('./permutationCombinationTree')

const permutation = new stringPermutation('ABC');
fs.writeFileSync('tree.json',JSON.stringify(permutation.renderTree(),null,2));

