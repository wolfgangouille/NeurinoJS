const eNeuron = require('./eNeuron.js');
const eSyn = require('./eSyn.js');
const neuralNet = require('./neuralNet.js');

function runGlobalNet(){
  applyChanges()
  xdata=[];
  simuldata=[]; //fix bug here to have unlimited neurons
  for (let i=0;i<globalnet.Neurons.length;i++){
    simuldata.push([]);
  }

  console.log("Starting simulation")
  //leI=parseFloat(document.getElementById('i').value);

  document.getElementById('res').value="";
  let letext="";

  let dt=0.0001;
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
  console.log(globalnet);
  updateSelectors()
  document.getElementById('listn1').selectedIndex=document.getElementById('listn1').length-1;
  document.getElementById('listn2').selectedIndex=-1;
  displayNeuron()
}



function addSynapse(){
  var n1=globalnet.Neurons[(document.getElementById('listn1').selectedIndex)];
  var n2=globalnet.Neurons[(document.getElementById('listn2').selectedIndex)];
  n1.connectTo(n2);
  console.log(globalnet);
  displayNeuron()
  document.getElementById('synapses').selectedIndex=document.getElementById('synapses').length-1;
  displaySynapse()
  //document.getElementById('synapses').selectedIndex=n1.OutSyns.length-1;
  //  document.getElementById('synapses').value=n1.OutSyns[n1.OutSyns.length-1];
}

function deleteNeuron(){
  if (document.getElementById('listn1').selectedIndex>=0){
    var neur=globalnet.Neurons[(document.getElementById('listn1').selectedIndex)];
    globalnet.deleteNeuronByID(neur.ID);
    updateSelectors();

    document.getElementById('listn1').selectedIndex=-1;
    document.getElementById('listn2').selectedIndex=-1;

    displayNeuron();
  }
}


function deleteSynapse(){
  if (document.getElementById('synapses').selectedIndex>=0){
    var neur=globalnet.Neurons[(document.getElementById('listn1').selectedIndex)];
    var syn=neur.OutSyns[(document.getElementById('synapses').selectedIndex)];
    globalnet.deleteSynapse(syn);
    updateSelectors();
    displayNeuron();
    document.getElementById('synapses').selectedIndex=-1;
  }
}

function downloadNet(){
  var name=prompt("Please enter a name for your network","Net0.nio");
  if (name!=null){
    var blob = new Blob([JSON.stringify(globalnet.serialize())],{ type: "text/plain;charset=utf-8" });
    saveAs(blob, name);
    localStorage.setItem('/'+name, JSON.stringify(globalnet.serialize()));
    //console.log(JSON.stringify(globalnet.serialize()))
  }
}

function uploadNet(){
  var input = document.createElement('input');
  input.type = 'file';
  input.onchange = e => {
    // getting a hold of the file reference
    var file = e.target.files[0];
    // setting up the reader
    var reader = new FileReader();
    reader.readAsText(file,'UTF-8');
    // here we tell the reader what to do when it's done reading...
    reader.onload = readerEvent => {
      var content = readerEvent.target.result; // this is the content!
      var object=JSON.parse(content)
      console.log( object );
      globalnet.deserialize(object);
      updateSelectors()
      displayNeuron();
      //do something with the content -> convert the string to an actual network
    }
  }
  input.click();
}



module.exports = { addtoglobnet, runGlobalNet,addSynapse, downloadNet,uploadNet, deleteNeuron,deleteSynapse};
