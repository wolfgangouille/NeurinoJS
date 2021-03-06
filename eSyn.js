module.exports = class eSyn {
	constructor(neuron){
		this.ID=0;
		this.I=0;
		this.preFire = false;
		this.postFire = false;
		this.postNeuron=neuron;
		this.preNeuron=0;
		this.VT=1.1; //mosfet threshold in Volt
		this.S1=5;  //positive for excitatory synapses
		this.S2=-5;

		this.VG=this.S1;
		this.U_stock=this.S2;

		this.R_w=20e3;
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

		this.setType=function(t) {
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
				console.log("Invalid type, setting to excitatory A");
				this.S1=5;
				this.S2=-5;
				this.VT=1.1;

				this.C_stock=1e-9;
				this.R_replen=1;
				this.R_up=50e3;
				this.R_decay=100e3;
				this.C_speed=1e-7;

			}
		}

		this.delete=function(){

			//cant delete neuron now
			var keys=Object.keys(this)
			console.log(keys)

			for (let i=0;i<keys.length;i++){
				if (keys[i]!='delete' && keys[i]!='preNeuron' && keys[i]!='postNeuron'){
					//console.log(keys[i])
					//
					delete this[keys[i]];
				}
			}
			//check how to properly delete this without deleting the neuron which causes error
			//maybe use a tag to remove them.
		}

		this.serialize=function(){
			const obj={
				ID:this.ID,
				I:this.I,
				preFire:this.preFire,
				postFire:this.postFire,
				postNeuronID:this.postNeuron.ID, // need ID instead of pointer
				preNeuronID:this.preNeuron.ID,
				VT:this.VT, //mosfet threshold in Volt
				S1:this.S1,  //positive for excitatory synapses
				S2:this.S2,
				VG:this.VG,
				U_stock:this.U_stock,
				R_w:this.R_w,
				C_stock:this.C_stock,
				R_replen:this.R_replen,
				R_up:this.R_up,
				R_decay:this.R_decay,
				C_speed:this.C_speed
			};
			return obj;
		}

		this.deserialize=function(obj){

				this.ID=obj.ID;
			  this.I=obj.I;
				this.preFire=obj.preFire;
				this.postFire=obj.postFire;
				//this.postNeuron=obj.; // handle in network class (a synapse without network makes no sense)
				//this.preNeuron=obj.;
				this.VT=obj.VT; //mosfet threshold in Volt
				this.S1=obj.S1;  //positive for excitatory synapses
				this.S2=obj.S2;
				this.VG=obj.VG;
				this.U_stock=obj.U_stock;
				this.R_w=obj.R_w;
				this.C_stock=obj.C_stock;
			  this.R_replen=obj.R_replen;
				this.R_up=obj.R_up;
				this.R_decay=obj.R_decay;
				this.C_speed=obj.C_speed;
		}
	}
}
