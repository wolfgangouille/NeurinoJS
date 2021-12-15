const eSyn = require('./eSyn.js');

module.exports = class eNeuron {
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
