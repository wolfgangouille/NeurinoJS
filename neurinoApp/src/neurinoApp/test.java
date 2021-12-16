package neurinoApp;

import java.io.IOException;

public class test
{
	public static void main(String[] args) throws ClassNotFoundException, IOException
			 {
		 
	
		 
		Network monNet = new Network("Net8");
		//Network monNet0 = new Network();

		//monNet.printNet();
		//monNet.importNet("Net4");
		//monNet.printNet();

		monNet.addNeuron(1,"a");    
		monNet.addNeuron(2,"b");
		monNet.addSynapse(0,1,new Synapse(0.8,"1"));
		
		//monNet.importNet("Net9");
		//monNet.importNet("Net9");

		//monNet.addSynapse(0,5,new Synapse(1.9,"2"));
		//monNet.addSynapse(5,0,new Synapse(1.9,"2"));

		//monNet.addToSelection(0);
		//monNet.duplicateSelection();
		
		monNet.printNet();
		//monNet.saveNet();
		
		//		monNet.saveNet();
		
		//Network monNet = new Network("Net1");
		
		
	//	monNet0.importNet("Net1.nio");

		//monNet0.addSynapse(6,4,new Synapse(0.7,"i"));
		//monNet0.addSynapse(7,5,new Synapse(0.8,"i"));
	//	monNet0.printNet();

		//monNet0.saveNet("Net1.nio");
		
	//	Network monNet1 = new Network(1);
	//	Network monNet2 = new Network(2);
	//	Network monNet3 = new Network(3);
	    
	   // monNet1.addNeuron(1,"a");    
	  //  monNet1.addNeuron(2,"b");
	  //  monNet1.addSynapse(0, 1, new Synapse(0.1));
      //  monNet1.printNet();
        
/*
	    monNet3.importNet(monNet1);
	    monNet3.importNet(monNet1);
	    monNet3.printNet();
	    
	    monNet3.addSynapse(0, 2, new Synapse(0.3));
	    monNet3.addSynapse(3, 1, new Synapse(0.4));
	    monNet3.printNet();

	    
	   // System.out.println(monNet3.Neurons.indexOf(monNet1.Neurons.get(1)));
	   // monNet2.Neurons.get(0).id=1000;
	    
	    monNet3.addToSelection(2);
	    monNet3.addToSelection(3);
	    monNet3.duplicateSelection();
	    monNet3.printNet();

 
	    
	    
	  
	    
	    monNet4.printNet();*/



	}
}
