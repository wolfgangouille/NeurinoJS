
const eSyn = require('./eSyn.js');



module.exports = class eNeuron {
	constructor(){
		this.IDgenerator=0;
		this.ID=0;

		this.Isyn=0;
		this.Iext=0.00001;

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
		this.R_delay_down=47e3; //Ohm

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
			this.OutSyns[this.OutSyns.length-1].ID=this.IDgenerator; //define synapse ID
			this.OutSyns[this.OutSyns.length-1].preNeuron=this;
			neuron.InSyns.push(this.OutSyns[this.OutSyns.length-1])
			this.IDgenerator++;
		}

		this.update=function(dt){
			this.OutSyns.forEach((syn, i) => syn.update(dt));

			this.V_thresh=(this.Vccp/this.R_Na_thresh+this.Vccm/this.R_K_thresh)/(1/this.R_Na_thresh+1/this.R_K_thresh); //V


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
			//this.OutSyns.forEach((syn, i) => syn.fire());
			this.OutSyns.forEach((syn, i) => syn.preFire=true);
			this.InSyns.forEach((syn, i) => syn.postFire=true);
		}

		this.delete=function(){
			this.OutSyns.length=0;
			Object.keys(this).forEach(key => delete this[key]);
		}

		this.serialize=function(){
			var OutSyns=[];
			var InSyns=[];
			for (let i=0;i<this.OutSyns.length;i++){
				OutSyns.push(this.OutSyns[i].serialize());
			}
			for (let i=0;i<this.InSyns.length;i++){
				InSyns.push(this.InSyns[i].serialize());
			}

			const obj={
				IDgenerator:this.IDgenerator,
				ID:this.ID,
				Isyn:this.Isyn,
				Iext:this.Iext,
				type:this.type,
				Vccp:this.Vccp, // need ID instead of pointer
				Vccm:this.Vccm,
				V:this.V, //mosfet threshold in Volt
				U:this.U,  //positive for excitatory synapses
				C_v:this.C_v,
				C_u:this.C_u,
				R_Na_leak:this.R_Na_leak,
				R_K_leak:this.R_K_leak,
				R_Na_on:this.R_Na_on,
				R_K_on:this.R_K_on,
				R_Na_thresh:this.R_Na_thresh,
				R_K_thresh:this.R_K_thresh,
				V_thresh:this.V_thresh,
				R_delay_up:this.R_delay_up,
				R_delay_down:this.R_delay_down,
				int1:this.int1,
				int2:this.int2,
				int3:this.int3,
				int4:this.int4,
				threshyst:this.threshyst,
				OutSyns:OutSyns,
				InSyns:InSyns,
			}
			return obj;
		}

		this.deserialize=function(obj){
			this.OutSyns=[];
			this.InSyns=[];


				this.IDgenerator=obj.IDgenerator;
				this.ID=obj.ID;
				this.Isyn=obj.Isyn;
				this.Iext=obj.Iext;
				this.type=obj.type;
				this.Vccp=obj.Vccp; // need ID instead of pointer
				this.Vccm=obj.Vccm;
			  this.V=obj.V; //mosfet threshold in Volt
				this.U=obj.U;  //positive for excitatory synapses
				this.C_v=obj.C_v;
				this.C_u=obj.C_u;
				this.R_Na_leak=obj.R_Na_leak;
				this.R_K_leak=obj.R_K_leak;
				this.R_Na_on=obj.R_Na_on;
				this.R_K_on=obj.R_K_on;
				this.R_Na_thresh=obj.R_Na_thresh;
				this.R_K_thresh=obj.R_K_thresh;
				this.V_thresh=obj.V_thresh;
				this.R_delay_up=obj.R_delay_up;
				this.R_delay_down=obj.R_delay_down;
				this.int1=obj.int1;
				this.int2=obj.int2;
				this.int3=obj.int3;
				this.int4=obj.int4;
				this.threshyst=obj.threshyst;


		}
	}
}


//this.OutSyns=[];
//this.InSyns=[];
