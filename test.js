const { performance } = require('perf_hooks');

class eNeuron {    
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

n1=new eNeuron();
let dt=0.02;
var t=0;

var startTime = performance.now()

for (i=0;i<10/dt;i++){
	t+=dt;
	n1.update(0,dt);
	//console.log(t+" "+n1.V+" "+n1.Vthresh+" "+n1.Vreset);
}
for (i=0;i<10/dt;i++){
	t+=dt;
	n1.update(-0.1,dt);
	//console.log(t+" "+n1.V+" "+n1.Vthresh+" "+n1.Vreset);
}
for (i=0;i<10/dt;i++){
	t+=dt;
	n1.update(0.7,dt);
	//console.log(t+" "+n1.V+" "+n1.Vthresh+" "+n1.Vreset);
}

var endTime = performance.now()

console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)

