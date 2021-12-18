const synapse = require('./synapse.js');


module.exports = class neuron {
  constructor(){
    this.x=0;
    this.y=0;
    this.z=0;
    this.InSyns=[];
    this.OutSyns=[];
    this.type="";

    this.update=function(dt){}; //implemented in extended neuron classes

    this.printNeuron=function(){}; //implemented in extended neuron classes

    this.connectTo=function(neuron,synapse){  //specify synapseseparately because it could be one of different subclasses.
			this.OutSyns.push(synapse)
			neuron.InSyns.push(synapse)
      synapse.postNeuron=neuron;
		};

    this.computeIsyn=function(){
      this.Isyn=0;
      for (const syn of this.InSyns) { this.Isyn+=syn.I }
    };

    this.fire=function(){
      this.OutSyns.forEach((syn, i) => syn.prefire=true;
      this.InSyns.forEach((syn, i) => syn.postfire=true;
      }
    };

  }



}
