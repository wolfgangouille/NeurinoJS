module.exports = class eNeuron {
	constructor(){
		this.V=0;
		this.Vrest=0.5;
		this.Vreset=-1;
		this.Vthresh=1;
		this.C=0.5;
		this.R=1;
		this.type="LIF";
		this.update=function(I,dt){
			this.V+=((I+((this.Vrest-this.V)/this.R))/this.C)*dt;
			if (this.V>this.Vthresh){
				this.V=this.Vreset;
				//console.log("fire !")
			}
		};
	}
}


module.exports = class eSyn {
	constructor(){
		this.I=0;
		this.I0=0.5;
		this.tau=0.5;
		this.update=function(dt){
			this.I*=Math.exp(-dt/this.tau);
		};
		this.fire=function(){
			this.I+=this.I0;
		};
	}
}
