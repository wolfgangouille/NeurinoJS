module.exports = class neuralNet {
	constructor(){
		this.Neurons=[];
		this.addNeuron=function(neuron){
			this.Neurons.push(neuron);
		};
		this.update=function(dt){
			for (let i=0;i<this.Neurons.length;i++){
				this.Neurons[i].computeIsyn();
				this.Neurons[i].update(dt);
				//console.log(t+" "+n1.V+" "+n2.V+" "+n1.OutSyns[0].I+" "+n2.OutSyns[0].I);

			}

		};
	}
}
