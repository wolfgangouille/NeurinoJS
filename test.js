const { performance } = require('perf_hooks');
//import { performance } from 'perf_hooks'

const eNeuron = require('./eNeuron.js');
const eSyn = require('./eSyn.js');

n1=new eNeuron();
n2=new eNeuron();

n1.connectTo(n2);
console.log(n1.OutSyns);
let dt=0.02;
var t=0;

var startTime = performance.now()

for (i=0;i<10/dt;i++){
	t+=dt;
	n1.update(0.7,dt);
	n2.update(0,dt);
	//console.log(t+" "+n1.V+" "+n1.Vthresh+" "+n1.Vreset);
}


var endTime = performance.now()

console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)

console.log("Bondour")
