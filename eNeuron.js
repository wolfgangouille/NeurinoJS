
const eSyn = require('./eSyn.js');

module.exports = class eNeuron {
	constructor(){
		this.V=0;
		this.Isyn=0;
		this.Vrest=0.5;
		this.Vreset=-1;
		this.Vthresh=1;
		this.C=0.5;
		this.R=1;
		this.type="LIF";
		this.OutSyns=[];
		this.InSyns=[];
		this.connectTo=function(neuron){
			this.OutSyns.push(new eSyn(neuron))
			neuron.InSyns.push(this.OutSyns[this.OutSyns.length-1])
		}

		this.update=function(Iext,dt){
			this.OutSyns.forEach((syn, i) => syn.update(dt));
			this.V+=((Iext+this.Isyn+((this.Vrest-this.V)/this.R))/this.C)*dt;
			if (this.V>this.Vthresh){
				this.V=this.Vreset;
				this.OutSyns.forEach((syn, i) => syn.fire());
				//console.log("fire !")
			}
		}
		this.computeIsyn=function(){
			this.Isyn=0;
			for (const syn of this.InSyns) { this.Isyn+=syn.I }
		}
	}
}
