package model;

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
	private int id;
	private String NetName; //matches saved
	public List<Neuron> Neurons = new ArrayList<Neuron>();
	private List<Neuron> Selection = new ArrayList<Neuron>();

	
	public Network() {
		id=-1;
		NetName="Net0";
	}

	public Network(int lid) {
		id=lid;
		NetName="Net0";
	}


	public void addNeuron(Neuron leNeuron){
		Neurons.add(leNeuron);
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
			System.out.println("");


			for (int j = 0; j < Neurons.get(i).OutSynapses.size(); j++) {
				System.out.print("        Connected to index ");
				System.out.print(Neurons.indexOf(Neurons.get(i).OutSynapses.get(j).postNeur));
				System.out.print(" via ");
				Neurons.get(i).OutSynapses.get(j).printSynapse();
				System.out.println("");

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
		
	}

	public void duplicateSelection(){   //use selection instead of lenet.neurons
	} 
	
	public void connect(int lePre,int lePost,Synapse laSyn){
		Neurons.get(lePre).connectTo(Neurons.get(lePost),laSyn);
	}
	
	
	
	public void maj(double dt){
		
		for (int i = 0; i < Neurons.size(); i++) { 
			Neurons.get(i).maj(dt);  		  
		}
		for (int i = 0; i < Neurons.size(); i++) { 
			for (int j = 0; j < Neurons.get(i).OutSynapses.size(); j++) {
				Neurons.get(i).OutSynapses.get(j).maj(dt);		  	  
			}		  		  
		}	
	}
	
	

	
}