//const { performance } = require('perf_hooks'); //apparently no need to import it ?
//const fs = require('fs');

const eNeuron = require('./eNeuron.js');
const eSyn = require('./eSyn.js');
const neuralNet = require('./neuralNet.js');
const mesfoncs = require('./mesfoncs.js');

addtoglobnet=mesfoncs.addtoglobnet;
runGlobalNet=mesfoncs.runGlobalNet;
addSynapse=mesfoncs.addSynapse;
downloadNet=mesfoncs.downloadNet;
uploadNet=mesfoncs.uploadNet;
deleteNeuron=mesfoncs.deleteNeuron;
deleteSynapse=mesfoncs.deleteSynapse;

//mafonc();
globalnet=new neuralNet();

console.log(window)
//console.log(n1);
//console.log(n2);
xdata=[];
simuldata=[];
myChart=null;
colors=["red","green","blue","magenta","yellow","cyan","black"]
