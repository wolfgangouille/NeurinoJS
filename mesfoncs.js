const eNeuron = require('./eNeuron.js');
const eSyn = require('./eSyn.js');
const neuralNet = require('./neuralNet.js');

function runGlobalNet(){
  applyneurchanges()
  xdata=[0];
  simuldata=[[0],[0],[0],[0],[0],[0]]; //fix bug here to have unlimited neurons
  console.log("Starting simulation")
  //leI=parseFloat(document.getElementById('i').value);

  document.getElementById('res').value="";
  let letext="";

  let dt=0.02;
  var t=0;

  var startTime = performance.now()

  for (let k=0;k<20/dt;k++){
    t+=dt;
    letext=letext+(Math.round(t * 100) / 100).toFixed(2)+" ";
    xdata.push(t);
    //simuldata[0].push(globalnet.Neurons[0].V);
    //simuldata[1].push(globalnet.Neurons[1].V);
    //simuldata[2].push(globalnet.Neurons[1].V);
    globalnet.update(dt);
    for (let i=0;i<globalnet.Neurons.length;i++){
      letext=letext+(Math.round(globalnet.Neurons[i].V * 100) / 100).toFixed(2)+" ";
      simuldata[i].push(globalnet.Neurons[i].V);
    }
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
  let newOption1 = new Option("Neuron "+globalnet.Neurons.length.toString(),globalnet.Neurons[globalnet.Neurons.length-1]);
  selectBox1.add(newOption1,undefined);
  let newOption2 = new Option("Neuron "+globalnet.Neurons.length.toString(),globalnet.Neurons[globalnet.Neurons.length-1]);
  selectBox2.add(newOption2,undefined);
  displayNeuron()
}

function addSynapse(){
  var n1=globalnet.Neurons[(document.getElementById('listn1').selectedIndex)];
  var n2=globalnet.Neurons[(document.getElementById('listn2').selectedIndex)];
  n1.connectTo(n2);
  console.log(globalnet);
  displayNeuron()
}

module.exports = { addtoglobnet, runGlobalNet,addSynapse};
