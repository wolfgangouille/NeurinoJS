//const { performance } = require('perf_hooks');
//import { performance } from 'perf_hooks'
class eSyn {
	constructor(neuron){
		this.I=0;
		this.I0=0.5;
		this.tau=0.5;
		this.OutNeuron=neuron;
		this.updatose=function(dt){
			this.I*=Math.exp(-dt/this.tau);
		};
		this.fire=function(){
			this.I+=this.I0;
		};
	}
}

class eNeuron {
	constructor(){
		this.V=0;
		this.Vrest=0.5;
		this.Vreset=-1;
		this.Vthresh=1;
		this.C=0.5;
		this.R=1;
		this.type="LIF";
		this.OutSyns=[];
		this.connectTo=function(neuron){
			this.OutSyns.push(new eSyn(neuron))
		}
		this.update=function(I,dt){
			this.V+=((I+((this.Vrest-this.V)/this.R))/this.C)*dt;
			if (this.V>this.Vthresh){
				this.V=this.Vreset;
				//console.log("fire !")
			}
		};

	}
}

//const eNeuron = require('./eNeuron.js');
//const eSyn = require('./eSyn.js');

n1=new eNeuron();
n2=new eNeuron();

n1.connectTo(n2);
console.log(n1.OutSyns);
let dt=0.02;
var t=0;

//var startTime = performance.now()

for (i=0;i<10/dt;i++){
	t+=dt;
	n1.update(0.7,dt);
	n2.update(0,dt);
	console.log(t+" "+n1.V+" "+n1.Vthresh+" "+n1.Vreset);
}


var endTime = performance.now()

//console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)

console.log("Bondour")
