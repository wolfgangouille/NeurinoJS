package neurinoApp;

import java.io.Serializable;

public class Synapse implements Serializable {
	private static final long serialVersionUID = 1L;  	
	double W;
	String Syntype;
	Neuron postNeur;
	Neuron preNeur;

	public Synapse() {	
		Syntype="e";
		W=0.00;
	}

	public Synapse(double leW){
		W=leW;
		Syntype="e";
	}
	
	public Synapse(double leW, String type){
		W=leW;
		Syntype=type;
	}
	
	public Synapse(Neuron lePreNeur, Neuron lePostNeur) {	
		Syntype="e";
		W=0.00;
		postNeur=lePostNeur;
		preNeur=lePreNeur;
	}

	public Synapse(Synapse laSyn,Neuron lePreNeur, Neuron lePostNeur) {	
		Syntype=laSyn.Syntype;
		W=laSyn.W;
		postNeur=lePostNeur;
		preNeur=lePreNeur;	}
	
	

	public void printSynapse() {
		 System.out.print("Synapse ");
		 System.out.print(this);
		 System.out.print(" (Syntype=");
		 System.out.print(Syntype);
		 System.out.print(", W=");
		 System.out.print(W);
		 System.out.print(", Target=");
		 System.out.print(postNeur);
		 System.out.println(") ");

	}
	
}
