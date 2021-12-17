//const { performance } = require('perf_hooks'); //apparently no need to import it ?


const eNeuron = require('./eNeuron.js');
const eSyn = require('./eSyn.js');
const neuralNet = require('./neuralNet.js');
const mesfoncs = require('./mesfoncs.js');

addtoglobnet=mesfoncs.addtoglobnet;
runGlobalNet=mesfoncs.runGlobalNet;
addSynapse=mesfoncs.addSynapse;
//mafonc();
globalnet=new neuralNet();

console.log(window)
//console.log(n1);
//console.log(n2);
