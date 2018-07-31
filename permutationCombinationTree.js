/*
    Recursive currentNode
    1. currentNode Value : value at the Index of the String.
    2. currentNode Children : array of currentNode : where each as value at similar to Index of String 
*/

class stringPermutation {

    constructor(value) {
        this.stringValue = value;
    }

    __getTreeStructure(height = this.stringValue.length, isRepitionAllowed = true) {
        function currentNodeConnection(str, index, level, height = this.stringValue.length) {
            return {
                level: ++level,
                childIndex: index !== null ? index % str.length : -1,
                value: index !== null ? str[index % str.length] : '',
                lookupChildren: (() => {
                    if (level < height) {

                        let temp = str.split('');
                        // valid when repition is allowed in permutation.
                        if (!isRepitionAllowed && index !== null) {
                            temp.splice(index % str.length, 1);
                        }
                        return temp.map((value, ind, list) => {
                            return new currentNodeConnection(list.join(''), index + ind, level, height);
                        })
                    }
                    return null;
                })()
            }
        }

        return currentNodeConnection(this.stringValue, null, -1, height);
    }


    permutationWithRepition(height = this.stringValue.length) {
        const root = this.__getTreeStructure(height, true);
        return this.__traverseTree(root);
    }

    permutationWithoutRepition(height = this.stringValue.length) {
        const root = this.__getTreeStructure(height, false);
        return this.__traverseTree(root);
    }

    combination(height = this.stringValue.length) {
        if (height >= this.stringValue.length) {
            return [this.stringValue];
        } else {
            const root = this.__getTreeStructure(height, false);
            const hashCodeDP = {} // to store the path travelled by using sum of charcter as key;
            this.__combination(root, '', 0, hashCodeDP);
            return Object.keys(hashCodeDP).map((key) => hashCodeDP[key])
        }
    }

    __combination(currentNode, valueForRecursion, hashSum, dp) {
        if (currentNode !== null && currentNode.lookupChildren == null) {
            hashSum += currentNode.value.charCodeAt(0);
            dp[hashSum] = valueForRecursion += currentNode.value;
            return;
        }
        if (currentNode.level > 0) {
            hashSum += currentNode.value.charCodeAt(0);
        }
        valueForRecursion += currentNode.value;
        currentNode.lookupChildren.forEach((nextNode) => {
            if (nextNode !== null) {
                this.__combination(nextNode, valueForRecursion, hashSum, dp);
            }
        });
        return dp;
    }

    __traverseTree(root) {
        const store = {};
        this.__permuation(root, '', store)
        return Object.keys(store).map((key) => store[key]);
    }


    __permuation(currentNode, valueForRecursion, arr) {

        if (currentNode !== null && currentNode.lookupChildren === null) {
            let permutate = valueForRecursion + currentNode.value;
            const hashCode = this.hashCode(permutate);
            arr[hashCode] = permutate;
            return;
        }
        valueForRecursion += currentNode.value;
        currentNode.lookupChildren.forEach((nextNode) => {
            if (nextNode !== null) {
                this.__permuation(nextNode, valueForRecursion, arr);
            }
        })

        return arr;
    }


    hashCode(str) {
        let hash = 0;
        if (str.length == 0) return hash;
        for (let i = 0; i < str.length; i++) {
            let char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }



    toString() {
        return JSON.stringify(value);
    }

}


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
