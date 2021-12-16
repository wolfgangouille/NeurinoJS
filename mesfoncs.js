const eNeuron = require('./eNeuron.js');
const eSyn = require('./eSyn.js');

function littleSim(){
  leI=parseFloat(document.getElementById('i').value);
  document.getElementById('res').value="";

  let letext="Time, V1, V2, I12, I21\n";

  n1=new eNeuron();
  n2=new eNeuron();

  n1.connectTo(n2);
  n2.connectTo(n1);
  n2.OutSyns[0].I0=-0.02;
  n2.OutSyns[0].tau=15;


  let dt=0.02;
  var t=0;

  var startTime = performance.now()

  for (i=0;i<20/dt;i++){
    t+=dt;
    n1.computeIsyn();
    n2.computeIsyn();
    n1.update(leI,dt);
    n2.update(0,dt);
    //console.log(t+" "+n1.V+" "+n2.V+" "+n1.OutSyns[0].I+" "+n2.OutSyns[0].I);
    letext=letext+(Math.round(t * 100) / 100).toFixed(2)+" "+(Math.round(n1.V * 100) / 100).toFixed(2)+" "+(Math.round(n2.V * 100) / 100).toFixed(2)+" "+(Math.round(n1.OutSyns[0].I * 1000) / 1000).toFixed(3)+" "+(Math.round(n2.OutSyns[0].I * 1000) / 1000).toFixed(3)+"\n"
  }

  var endTime = performance.now()

  console.log(`Simulation took ${endTime - startTime} milliseconds`)

  document.getElementById('res').value=letext;
  //console.log(window)
}
module.exports = { littleSim };
