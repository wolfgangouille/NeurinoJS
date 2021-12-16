package model;

import java.io.Serializable;
import java.util.ArrayList;

public abstract class Neuron implements Serializable {
	protected static final long serialVersionUID = 1L;
	protected float x, y, z;
	protected int UUID=0;
	protected ArrayList<Synapse> InSynapses;
	protected ArrayList<Synapse> OutSynapses;
	protected String subClass;
	//private Network parentNetwork;
	
	public Neuron() {
		x=(float) 0.0;
		y=(float) 0.0;
		z=(float) 0.0;
		subClass="";
		InSynapses = new ArrayList<Synapse>();
		OutSynapses = new ArrayList<Synapse>();
	}
	
	public abstract void maj(double dt); //this must be implemented in each subtype;
	
	
	public abstract void printNeuron(); //this must be implemented in each subtype;

	
	public void connectTo(Neuron neuron, Synapse syn) {
		OutSynapses.add(syn);
		neuron.InSynapses.add(syn);
		syn.postNeur=neuron;
		//add synapse in synapse lists of both neurons.
	}
	
	public void fire() {
		for (int i=0; i<OutSynapses.size(); i++) {
			OutSynapses.get(i).setPreFire(true);
		}
		for (int i=0; i<InSynapses.size(); i++) {
			InSynapses.get(i).setPostFire(true);
		}
	}
	
	public double collectI() {
		double I=0.0;
		for (int i=0;i<InSynapses.size();i++) {
			I=I+InSynapses.get(i).getI();
		}
		return I;
	}

	
	public float getX() {
		return x;
	}

	public void setX(float x) {
		this.x = x;
	}

	public float getY() {
		return y;
	}

	public void setY(float y) {
		this.y = y;
	}

	public float getZ() {
		return z;
	}

	public void setZ(float z) {
		this.z = z;
	}

	public int getUUID() {
		return UUID;
	}

	public void setUUID(int uUID) {
		UUID = uUID;
	}

	protected abstract void setI(double d);

	protected abstract double getV();

	
	
	

}
