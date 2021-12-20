module.exports = class eSyn {
	constructor(neuron){
		this.I=0;
		this.I0=0.000001;
		this.tau=0.1;


		this.VT=1.1; //mosfet threshold in Volt

		this.S1=5;  //positive for excitatory synapses
		this.S2=-5;
		this.VG=S1;
		this.U_stock=S2;
		this.R_w=1000e3;
		this.C_stock=1e-9;
		this.R_replen=1;
		this.R_up=50e3;
		this.R_decay=100e3;
		this.C_speed=1e-7;

		this.OutNeuron=neuron;

		this.update=function(dt){
			this.I=this.I*Math.exp(-dt/this.tau);
		};


		this.fire=function(){
			this.I+=this.I0;
		};
	}
}
