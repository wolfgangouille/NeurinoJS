module.exports =class eSyn {
	constructor(neuron){
		this.I=0;
		this.I0=0.9;
		this.tau=0.5;
		this.OutNeuron=neuron;
		this.update=function(dt){
			this.I=this.I*Math.exp(-dt/this.tau);
		};
		this.fire=function(){
			this.I+=this.I0;
		};
	}
}
