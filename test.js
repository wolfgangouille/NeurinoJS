//const { performance } = require('perf_hooks'); //apparently no need to import it ?


const eNeuron = require('./eNeuron.js');
const eSyn = require('./eSyn.js');
simpleSimul(0.9);

function simpleSimul(leI){
n1=new eNeuron();
n2=new eNeuron();

n1.connectTo(n2);
n2.connectTo(n1);
n2.OutSyns[0].I0=-0.02;
n2.OutSyns[0].tau=15;

console.log(n1.OutSyns);
let dt=0.02;
var t=0;

var startTime = performance.now()

for (i=0;i<20/dt;i++){
	t+=dt;
	n1.computeIsyn();
	n2.computeIsyn();
	n1.update(leI,dt);
	n2.update(0,dt);
	console.log(t+" "+n1.V+" "+n2.V+" "+n1.OutSyns[0].I+" "+n2.OutSyns[0].I);
}


var endTime = performance.now()

console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)

console.log("Bondour")
}
//console.log(n1);
//console.log(n2);
