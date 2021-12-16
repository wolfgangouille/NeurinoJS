package model;

import java.io.Serializable;

public abstract class Synapse implements Serializable {
	//the synapse is neuron independent.
	// no pointer to the neurons.
	//it is the neurons that access the synapses
	//Pre and post Synaptic change the preFire and postFire boolean of their synapses from neuron class.
	
	protected static final long serialVersionUID = 1L;
	protected int UUID;
	protected boolean preFire;
	protected boolean postFire;
	protected double I;
	public Neuron postNeur;
	//boolean updated;
	
	public Synapse() {
		setUUID(0);
		I=0.0;
		preFire = false;
		postFire = false;
		postNeur=null;
		//updated=false;
	}
	
	
	
	
	public abstract void maj(double dt); //update function, depends on synapse subclass

	
	
	public double getI() {
		return I;
	}




	public void setI(double i) {
		I = i;
	}




	public boolean isPreFire() {
		return preFire;
	}

	public void setPreFire(boolean preFire) {
		this.preFire = preFire;
	}

	public boolean isPostFire() {
		return postFire;
	}

	public void setPostFire(boolean postFire) {
		this.postFire = postFire;
	}

	public int getUUID() {
		return UUID;
	}

	public void setUUID(int uUID) {
		UUID = uUID;
	}




	protected abstract void printSynapse();
	
	
	
	
}
