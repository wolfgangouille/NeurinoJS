module.exports = class neuralNet {
	constructor(){
		this.IDgenerator=0;
		this.Neurons=[];
		this.addNeuron=function(neuron){
			this.Neurons.push(neuron);
			neuron.ID=this.IDgenerator;
			this.IDgenerator++;
		};

		this.deleteSynapse=function(lasynapse){
			for (let i=0;i<this.Neurons.length;i++){
				for (let j=0;j<this.Neurons[i].OutSyns.length;j++){ //for each out neuron
					if (this.Neurons[i].OutSyns[j]===lasynapse){ //remove all conections pointing to deleted neuron
						this.Neurons[i].OutSyns.splice(j,1);
					}
				}
				for (let j=0;j<this.Neurons[i].InSyns.length;j++){ //for each out neuron
					if (this.Neurons[i].InSyns[j]===lasynapse){ //remove all conections pointing to deleted neuron
						this.Neurons[i].InSyns.splice(j,1);
					}
				}
			}
				lasynapse.delete(); //probably no need to do that since no more reference
		}

		this.deleteNeuronByID=function(ID){
			for (let i=0;i<this.Neurons.length;i++){
				for (let j=0;j<this.Neurons[i].OutSyns.length;j++){ //for each out neuron
					if (this.Neurons[i].OutSyns[j].postNeuron.ID===ID){ //remove all conections pointing to deleted neuron
						this.Neurons[i].OutSyns[j].delete();
						this.Neurons[i].OutSyns.splice(j,1);
					}
				}
				for (let j=0;j<this.Neurons[i].InSyns.length;j++){
					if (this.Neurons[i].InSyns[j].preNeuron.ID===ID){ //remove all conections coming from  deleted neuron
						this.Neurons[i].InSyns[j].delete();
						this.Neurons[i].InSyns.splice(j,1);
					}
				}
			}

			for (let i=0;i<this.Neurons.length;i++){
				if (this.Neurons[i].ID===ID){
					this.Neurons[i].delete();
					this.Neurons.splice(i, 1);
				}
			}
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
