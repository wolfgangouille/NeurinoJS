package neurinoApp;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Neuron implements Serializable{
	private static final long serialVersionUID = 1L;  
	int id;
	int AncInd;
	String ntype;
	Network ori;
	boolean activ;
	List<Synapse> InSynapses = new ArrayList<Synapse>();
	List<Synapse> OutSynapses = new ArrayList<Synapse>();

	//Constructors :
	public Neuron() {
		ntype="default";
		id=-1;
		activ=true;
	}

	public Neuron(int lid,String lentype,Network lenet) {
		id=lid;
		ntype=lentype;
		ori=lenet;
		activ=true;
	}


	public Neuron(Neuron n1) {
		this.id=n1.id;
		this.ntype=n1.ntype;
		this.ori=n1.ori;
		this.AncInd=n1.AncInd;
		this.activ=n1.activ;
	}
	
	public void printNeuron() {
		 System.out.print("Neuron ");
		 System.out.print(this);
		 System.out.print(" (id=");
		 System.out.print(id);
		 System.out.print(", ntype=");
		 System.out.print(ntype);
		 System.out.print(", Origine=");
		 System.out.print(ori.NetName);
		 System.out.print(", Index ");
		 System.out.print(AncInd);
		 System.out.print(", Activ = ");
		 System.out.print(activ);
		 System.out.println(")");


	}
}
