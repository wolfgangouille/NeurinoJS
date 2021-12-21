const eNeuron = require('./eNeuron.js');
const eSyn = require('./eSyn.js');
const neuralNet = require('./neuralNet.js');

function runGlobalNet(){
  applyneurchanges()
  xdata=[];
  simuldata=[]; //fix bug here to have unlimited neurons
  for (let i=0;i<globalnet.Neurons.length;i++){
    simuldata.push([]);
  }

  console.log("Starting simulation")
  //leI=parseFloat(document.getElementById('i').value);

  document.getElementById('res').value="";
  let letext="";

  let dt=0.00025;
  var t=0;

  var startTime = performance.now()

  for (let k=0;k<3/dt;k++){
    t+=dt;
    letext=letext+(Math.round(t * 100000) / 100000).toFixed(5)+" ";
    xdata.push(t);
    //simuldata[0].push(globalnet.Neurons[0].V);
    //simuldata[1].push(globalnet.Neurons[1].V);
    //simuldata[2].push(globalnet.Neurons[1].V);
    globalnet.update(dt);
    for (let i=0;i<globalnet.Neurons.length;i++){
      letext=letext+(Math.round(globalnet.Neurons[i].V * 10000) / 10000).toFixed(4)+" ";
      simuldata[i].push(globalnet.Neurons[i].V);
    }
    //letext=letext+(Math.round(globalnet.Neurons[0].OutSyns[0].I * 1000000000) /1000).toFixed(3)+ " ";
    letext=letext+"\n"


  }

  var endTime = performance.now()

  console.log(`Simulation took ${endTime - startTime} milliseconds`)

  document.getElementById('res').value=letext;
  console.log(window)
  drawGraph();
}







function addtoglobnet(){
  globalnet.addNeuron(new eNeuron());
  var selectBox1=document.getElementById('listn1');
  var selectBox2=document.getElementById('listn2');
  console.log(globalnet);
  let newOption1 = new Option("Neuron "+(globalnet.Neurons.length-1).toString(),globalnet.Neurons[globalnet.Neurons.length-1]);
  selectBox1.add(newOption1,undefined);
  let newOption2 = new Option("Neuron "+(globalnet.Neurons.length-1).toString(),globalnet.Neurons[globalnet.Neurons.length-1]);
  selectBox2.add(newOption2,undefined);
  displayNeuron()
}

function addSynapse(){
  var n1=globalnet.Neurons[(document.getElementById('listn1').selectedIndex)];
  var n2=globalnet.Neurons[(document.getElementById('listn2').selectedIndex)];
  n1.connectTo(n2);

  console.log(globalnet);
  displayNeuron()
  document.getElementById('synapses').selectedIndex=document.getElementById('synapses').length-1;
  //document.getElementById('synapses').selectedIndex=n1.OutSyns.length-1;
  //  document.getElementById('synapses').value=n1.OutSyns[n1.OutSyns.length-1];
}

module.exports = { addtoglobnet, runGlobalNet,addSynapse};
