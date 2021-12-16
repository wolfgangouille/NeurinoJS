package neurinoApp;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


public class Network implements Serializable{

	private static final long serialVersionUID = 1L;
	int id;
	String NetName; //matches saved
	List<Neuron> Neurons = new ArrayList<Neuron>();
	List<Neuron> Selection = new ArrayList<Neuron>();

	
	public Network() {
		id=-1;
		NetName="Net0";
	}

	public Network(int lid) {
		id=lid;
		NetName="Net0";
	}
	

	public Network(String inputFilename) 
			throws IOException, ClassNotFoundException
	{
		//check if file exists
		File tempFile = new File(inputFilename.concat(".nio"));
		boolean exists = tempFile.exists();
		if (exists) {
		FileInputStream fileInputStream
		= new FileInputStream(inputFilename.concat(".nio"));
		ObjectInputStream objectInputStream
		= new ObjectInputStream(fileInputStream);
		
		Network Net=(Network) objectInputStream.readObject();
		importNet(Net,false);
		id=Net.id;
		NetName=Net.NetName;
		objectInputStream.close(); 
		System.out.println("Network opened.");}
		else
		{
			id=-1;
			NetName=inputFilename;
			System.out.println("Network created.");
		}
	}

	public void addNeuron(){
		Neurons.add(new Neuron());
		Neurons.get(Neurons.size()-1).ori=this;
		Neurons.get(Neurons.size()-1).AncInd=Neurons.size()-1;  //when neuron added to network, AncInd is actual Ind

	}

	public void addNeuron(int neurid,String neurtype){
		Neurons.add(new Neuron(neurid,neurtype,this))  ;
		Neurons.get(Neurons.size()-1).AncInd=Neurons.size()-1;  //when neuron added to network, AncInd is actual Ind

	}

	public void addNeuron(Neuron leNeuron){
		Neurons.add(leNeuron);
		Neurons.get(Neurons.size()-1).ori=this;
		Neurons.get(Neurons.size()-1).AncInd=Neurons.size()-1; //when neuron added to network, AncInd is actual Ind

	}


	public void addToSelection(int nid){ //add neuron to selection
		Selection.add(Neurons.get(nid));	  
	}

	public void emptySelection(){ //clear selection
		Selection.clear();
	}

	public void printNet() {
		System.out.print("Network ");
		System.out.print(this);
		System.out.print(" (id=");
		System.out.print(id);
		System.out.print(", NetName=");
		System.out.print(NetName);
		System.out.println(") ");

		for (int i = 0; i < Neurons.size(); i++) { 
			System.out.print("    Index ");
			System.out.print(i);
			System.out.print(" : ");
			Neurons.get(i).printNeuron();


			for (int j = 0; j < Neurons.get(i).OutSynapses.size(); j++) {
				System.out.print("        Connected to index ");
				System.out.print(Neurons.indexOf(Neurons.get(i).OutSynapses.get(j).postNeur));
				System.out.print(" via ");
				Neurons.get(i).OutSynapses.get(j).printSynapse();

			}
		}
		System.out.println("");
	}

	public void saveNet()
			throws IOException, ClassNotFoundException
	{
		FileOutputStream fileOutputStream
		= new FileOutputStream(NetName.concat(".nio"));
		ObjectOutputStream objectOutputStream 
		= new ObjectOutputStream(fileOutputStream);
		objectOutputStream.writeObject(this);
		objectOutputStream.flush();
		objectOutputStream.close();

		System.out.print("Network ");
		System.out.print(this);
		System.out.println(" saved under ".concat(NetName).concat(".nio"));
		System.out.println("");
	}

	public void importNet(String inputFilename)
			throws IOException, ClassNotFoundException
	{
		FileInputStream fileInputStream
		= new FileInputStream(inputFilename.concat(".nio"));
		ObjectInputStream objectInputStream
		= new ObjectInputStream(fileInputStream);
		importNet((Network) objectInputStream.readObject(),true);
		objectInputStream.close(); 
	}



	public void importNet(Network leNet,boolean renum){
		int startsize=Neurons.size();
		//System.out.println(startsize);

		for (int counter = 0; counter < leNet.Neurons.size(); counter++) { 	
			Neurons.add(new Neuron(leNet.Neurons.get(counter)));	//add a Copy, nt neuron itself	
			if (renum) {
				Neurons.get(startsize+counter).ori=leNet;//except change origine to one level deep
				Neurons.get(startsize+counter).AncInd=counter;//except change origine to one level deep
			}
		}
		//System.out.println(Neurons.size());

		//check for each neuron in leNet(original being copied and added) what is the index of incoming synapse
		for (int i = 0; i < leNet.Neurons.size(); i++) { 
			for (int j = 0; j < leNet.Neurons.get(i).OutSynapses.size(); j++) {
				//index of presynaptic neuron is i

				int postind=leNet.Neurons.indexOf(leNet.Neurons.get(i).OutSynapses.get(j).postNeur);
				//if doesnt find outgoing synapse in leNet, returns -1
				//connect to the SAME neuron(not the copy)
				if(postind==-1) {
					addSynapse(Neurons.get(startsize+i),leNet.Neurons.get(i).OutSynapses.get(j).postNeur,leNet.Neurons.get(i).OutSynapses.get(j));
				}
				else		  
				{	    
					// System.out.println(Neurons.get(startsize+i));
					//  System.out.println(Neurons.get(startsize+postind));

					addSynapse(Neurons.get(startsize+i),Neurons.get(startsize+postind),leNet.Neurons.get(i).OutSynapses.get(j));  
				}				  	  
			}		  		  

		}
	}

	public void duplicateSelection(){   //use selection instead of lenet.neurons
		int startsize=Neurons.size();
		for (int counter = 0; counter < Selection.size(); counter++) { 	
			Neurons.add(new Neuron(Selection.get(counter)));	//add a Copy, not neuron itself		 
		}
		//check for each neuron in the full net
		for (int i = 0; i < startsize; i++) { 
			for (int j = 0; j < Neurons.get(i).OutSynapses.size(); j++) {
				//index of presynaptic neuron is i
				int preind=Selection.indexOf(Neurons.get(i));//is presynaptic neuron in selection ?
				int postind=Selection.indexOf(Neurons.get(i).OutSynapses.get(j).postNeur);//is postsynaptic neuron in the selection ???
				// System.out.print(i);
				// System.out.print(" ");
				// System.out.print(preind);
				// System.out.print(" ");
				// System.out.println(startsize+postind);

				if (preind==-1) {//if preneur is not in the selection
					if(postind==-1) {//and postneur either,
						//do nothing			  
					}
					else {//if postneur  is in the selection
						//connect old to newly added
						//   System.out.println(Neurons.get(i));
						//   System.out.println(Neurons.get(startsize+postind));

						addSynapse(Neurons.get(i),Neurons.get(startsize+postind),Neurons.get(i).OutSynapses.get(j)); //copy the original synapse
					}


				}

				else { //if preind is in selection
					if(postind==-1) { //if postind is not in the selection so it is in the rest
						addSynapse(Neurons.get(startsize+preind),Neurons.get(i).OutSynapses.get(j).postNeur,Neurons.get(i).OutSynapses.get(j));
					}

					else		  //and postind too
					{	  
						//conection within freshky added neurons
						addSynapse(Neurons.get(startsize+preind),Neurons.get(startsize+postind),Neurons.get(i).OutSynapses.get(j));  
					}	
				}
			}		  		  

		}
	} 
	
	public void addSynapse(Neuron lePre,Neuron lePost,Synapse laSyn){
		lePre.OutSynapses.add(new Synapse(laSyn, lePre, lePost));
		lePost.InSynapses.add( lePre.OutSynapses.get(lePre.OutSynapses.size()-1)   );
	}

	public void addSynapse(int lePreInd,int lePostInd,Synapse laSyn){

		Neurons.get(lePreInd).OutSynapses.add(new Synapse(laSyn, Neurons.get(lePreInd), Neurons.get(lePostInd)));
		Neurons.get(lePostInd).InSynapses.add( Neurons.get(lePreInd).OutSynapses.get(Neurons.get(lePreInd).OutSynapses.size()-1)   );



	}
}