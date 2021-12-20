
const eSyn = require('./eSyn.js');

/*Vccp=5; //V
Vccm=-5; //V

v=0; //V
u=0; //V

C_v=1e-6; //F
C_u=1e-7; //F

R_Na_leak=100e3; //Ohm
R_K_leak=100e3; //Ohm

R_Na_on=10e3; //Ohm
R_K_on=20e3; //Ohm


R_Na_thresh=90e3; //Ohm
R_K_thresh=100e3; //Ohm

v_thresh=(Vccp/R_Na_thresh+Vccm/R_K_thresh)/(1/R_Na_thresh+1/R_K_thresh); //V

R_delay_up=10e3;  //Ohm
R_delay_down=10e3; //Ohm

i=0; //amp

int1=1; //boolean
int2=0;
int3=0;
int4=0;

//v is controlled by 1, 2 and 3.
//u is controlled by 4
//2 and 4 are controlled by v.
//1 and 3 are controlled by u.

threshyst=0;*/


module.exports = class LIF extends neuron{
	constructor(){
		this.V=0;
		this.Isyn=0;
		this.Iext=0;
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

		this.update=function(dt){
			this.OutSyns.forEach((syn, i) => syn.update(dt));
			this.V+=((this.Iext+this.Isyn+((this.Vrest-this.V)/this.R))/this.C)*dt;
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
