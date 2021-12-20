
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


module.exports = class eNeuron {
	constructor(){

		this.Isyn=0;
		this.Iext=0;

		this.type="eNeuron";

		this.Vccp=5; //V
		this.Vccm=-5; //V

		this.V=0; //V
		this.U=0; //V

		this.C_v=1e-6; //F
		this.C_u=1e-7; //F

		this.R_Na_leak=100e3; //Ohm
		this.R_K_leak=100e3; //Ohm

		this.R_Na_on=10e3; //Ohm
		this.R_K_on=20e3; //Ohm


		this.R_Na_thresh=90e3; //Ohm
		this.R_K_thresh=100e3; //Ohm

		this.V_thresh=(this.Vccp/this.R_Na_thresh+this.Vccm/this.R_K_thresh)/(1/this.R_Na_thresh+1/this.R_K_thresh); //V

		this.R_delay_up=10e3;  //Ohm
		this.R_delay_down=10e3; //Ohm

		this.i=0; //amp

		this.int1=1; //boolean
		this.int2=0;
		this.int3=0;
		this.int4=0;

		//v is controlled by 1, 2 and 3.
		//u is controlled by 4
		//2 and 4 are controlled by v.
		//1 and 3 are controlled by u.

		this.threshyst=0;

		this.OutSyns=[];
		this.InSyns=[];


		this.connectTo=function(neuron){
			this.OutSyns.push(new eSyn(neuron))
			neuron.InSyns.push(this.OutSyns[this.OutSyns.length-1])
		}

		this.update=function(dt){
			this.OutSyns.forEach((syn, i) => syn.update(dt));

			this.V+=((this.Iext+this.Isyn)/this.C_v)*dt;

			if (this.V>=this.V_thresh) {
				this.int2=1;
				this.int4=1;
				this.fire();
			}
			else {
				this.int2=0;
				this.int4=0;
			}

			if (this.U>0+(Math.sign(this.int1-0.5)*(this.threshyst))) { //Symmetrical hysteresis
				this.int1=0;
				this.int3=1;
			}
			else {
				this.int1=1;
				this.int3=0;
			}

			var g_v_plus=1/this.R_Na_leak+(this.int1*this.int2)/this.R_Na_on;
			var g_v_moins=1/this.R_K_leak+(this.int3)/this.R_K_on;

			var g_u_plus=this.int4/this.R_delay_up;
			var g_u_moins=(1-this.int4)/this.R_delay_down;

			//double vold=v;

			//v=v+(dt/C_v)*(g_v_plus*(Vccp-vold)+g_v_moins*(Vccm-vold));

			this.V=this.V+(this.Vccp-this.V)*(1-Math.exp(-dt*g_v_plus/this.C_v))+(this.Vccm-this.V)*(1-Math.exp(-dt*g_v_moins/this.C_v));

			//u=u+(dt/C_u)*(g_u_plus*(Vccp-u)+g_u_moins*(Vccm-u));
			this.U=this.U+(this.Vccp-this.U)*(1-Math.exp(-dt*g_u_plus/this.C_u))+(this.Vccm-this.U)*(1-Math.exp(-dt*g_u_moins/this.C_u));

		}


		this.computeIsyn=function(){
			this.Isyn=0;
			for (const syn of this.InSyns) { this.Isyn+=syn.I }
		}


		this.fire=function(){
			this.OutSyns.forEach((syn, i) => syn.fire());
			//this.OutSyns.forEach((syn, i) => syn.prefire=true;
			//this.InSyns.forEach((syn, i) => syn.postfire=true;
		}
	}
}
