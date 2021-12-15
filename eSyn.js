module.exports = class eSyn {
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
