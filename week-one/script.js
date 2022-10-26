'use strict';

const _ = require('lodash');
// never use 'var'
// const or let is preferred

// Ex. 1
console.log('Hello world, I\'m Node');

// EX. 2
let output = 'Just testing nodemon, using lodast to conve' + 
                'this camel case';
console.log(output);
output = _.camelCase(output);
console.log(output);