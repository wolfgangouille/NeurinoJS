function mafonction(truc){
  document.getElementById('searchTxt').value=truc;
}


class eNeuron {
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

class eSyn {
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



function mafonction2(){
leI=parseFloat(document.getElementById('i').value);
document.getElementById('res').value="";

let letext="Time, V1, V2, I12, I21\n";

n1=new eNeuron();
n2=new eNeuron();

n1.connectTo(n2);
n2.connectTo(n1);
n2.OutSyns[0].I0=-0.02;
n2.OutSyns[0].tau=15;

console.log(n1.OutSyns);
let dt=0.02;
var t=0;

var startTime = performance.now()

for (i=0;i<20/dt;i++){
	t+=dt;
	n1.computeIsyn();
	n2.computeIsyn();
	n1.update(leI,dt);
	n2.update(0,dt);
	console.log(t+" "+n1.V+" "+n2.V+" "+n1.OutSyns[0].I+" "+n2.OutSyns[0].I);
  letext=letext+(Math.round(t * 100) / 100).toFixed(2)+" "+(Math.round(n1.V * 100) / 100).toFixed(2)+" "+(Math.round(n2.V * 100) / 100).toFixed(2)+" "+(Math.round(n1.OutSyns[0].I * 1000) / 1000).toFixed(3)+" "+(Math.round(n2.OutSyns[0].I * 1000) / 1000).toFixed(3)+"\n"
}

var endTime = performance.now()

console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)

console.log("Bondour")
document.getElementById('res').value=letext;
}
