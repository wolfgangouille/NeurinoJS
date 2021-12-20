module.exports = class eSyn {
	constructor(neuron){
		this.I=0;
		this.I0=0.000001;
		this.tau=0.1;
		this.preFire = false;
		this.postFire = false;
		this.OutNeuron=neuron;

		this.VT=1.1; //mosfet threshold in Volt
		this.S1=5;  //positive for excitatory synapses
		this.S2=-5;

		this.VG=this.S1;
		this.U_stock=this.S2;
		this.R_w=200e3;
		this.C_stock=1e-9;
		this.R_replen=1;
		this.R_up=50e3;
		this.R_decay=100e3;
		this.C_speed=1e-7;




	this.update=function(dt){
		//this.I=this.I*Math.exp(-dt/this.tau);

		var VG_old=this.VG;


		if (this.preFire){
			this.VG=this.VG+(this.S1-this.VG)*(1-Math.exp(-dt/(this.C_speed*this.R_decay)))+(this.U_stock-this.VG)*(1-Math.exp(-dt/(this.C_speed*this.R_up)));
			this.U_stock=this.U_stock+(this.S2-this.U_stock)*(1-Math.exp(-dt/(this.C_stock*this.R_replen)))+(VG_old-this.U_stock)*(1-Math.exp(-dt/(this.C_stock*this.R_up)));;
		}
		else {
			this.VG=this.VG+(this.S1-this.VG)*(1-Math.exp(-dt/(this.C_speed*this.R_decay)));
			this.U_stock=this.U_stock+(this.S2-this.U_stock)*(1-Math.exp(-dt/(this.C_stock*this.R_replen)));
		}


		if (this.S1>0) {
			this.I=Math.max(this.S1-this.VG-this.VT,0)/this.R_w; //if S1 est +
		}
		else {
			this.I=Math.min(this.S1-this.VG-this.VT,0)/this.R_w; //if S1 est -
		}
		this.preFire=false;
		this.postFire=false;

	};


	this.fire=function(){
		this.I+=this.I0;
	};

	this.setPolarity=function(t) {
		switch(t) {
			case '+':
			this.S1=5;
			this.S2=-5;
			this.VT=1.1;
			break;

			case '-':
			this.S1=-5;
			this.S2=5;
			this.VT=-1.1;
			break;

			default:
			this.S1=5;
			this.S2=-5;
			this.VT=1.1;
		}
	}

	this.setType=function(t) {
		switch(t) {
			case 'A':
			this.C_stock=1e-9;
			this.R_replen=1;
			this.R_up=50e3;
			this.R_decay=100e3;
			this.C_speed=1e-7;
			break;

			case 'B':
			this.C_stock=1e-6;
			this.R_replen=500e3;
			this.R_up=50e3;
			this.R_decay=100e3;
			this.C_speed=1e-7;
			break;

			case 'C':
			this.C_stock=1e-9;
			this.R_replen=1;
			this.R_up=20e3;
			this.R_decay=100e3;
			this.C_speed=1e-6;
			break;

			case 'D':
			this.C_stock=1e-6;
			this.R_replen=500e3;
			this.R_up=10e3;
			this.R_decay=100e3;
			this.C_speed=1e-6;
			break;

			default:
			console.log("Invalid type, setting to A");
			this.C_stock=1e-9;
			this.R_replen=1;
			this.R_up=50e3;
			this.R_decay=100e3;
			this.C_speed=1e-7;

		}
	}
}
}
