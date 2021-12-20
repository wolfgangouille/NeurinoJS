package model;

public class eSynapse extends Synapse {

	private double S1;
	private double S2;
	private double R_decay;
	private double R_up;
	private double R_replen;
	private double C_stock;
	private double C_speed;
	private double VG;
	private double U_stock;
	private double R_w;
	private double VT;

	eSynapse() {
		// TODO Auto-generated constructor stub
		super();
		VT=1.1; //mosfet threshold in Volt

		S1=5;  //positive for excitatory synapses
		S2=-5;

		setType('A');

		VG=S1;
		U_stock=S2;
		R_w=1000e3;
	}


	public void setType(char t) {
		switch(t) {
		case 'A':
			C_stock=1e-9;
			R_replen=1;
			R_up=50e3;
			R_decay=100e3;
			C_speed=1e-7;
			break;

		case 'B':
			C_stock=1e-6;
			R_replen=500e3;
			R_up=50e3;
			R_decay=100e3;
			C_speed=1e-7;
			break;

		case 'C':
			C_stock=1e-9;
			R_replen=1;
			R_up=20e3;
			R_decay=100e3;
			C_speed=1e-6;
			break;

		case 'D':
			C_stock=1e-6;
			R_replen=500e3;
			R_up=10e3;
			R_decay=100e3;
			C_speed=1e-6;
			break;
		default:
			    System.out.println("Invalid type, setting to A");
				C_stock=1e-9;
				R_replen=1;
				R_up=50e3;
				R_decay=100e3;
				C_speed=1e-7;

		}


	}

	@Override
	public void maj(double dt) {

		double VG_old=VG;

		
		if (preFire){
			VG=VG+(S1-VG)*(1-Math.exp(-dt/(C_speed*R_decay)))+(U_stock-VG)*(1-Math.exp(-dt/(C_speed*R_up)));
			U_stock=U_stock+(S2-U_stock)*(1-Math.exp(-dt/(C_stock*R_replen)))+(VG_old-U_stock)*(1-Math.exp(-dt/(C_stock*R_up)));;
		}
		else {
			VG=VG+(S1-VG)*(1-Math.exp(-dt/(C_speed*R_decay)));
			U_stock=U_stock+(S2-U_stock)*(1-Math.exp(-dt/(C_stock*R_replen)));
		}



		if (S1>0) {
			I=Math.max(S1-VG-VT,0)/R_w; //if S1 est +
		}
		else {
			I=Math.min(S1-VG-VT,0)/R_w; //if S1 est -

		}

		preFire=false;
		postFire=false;
	}


	public double getR_w() {
		return R_w;
	}


	public void setR_w(double r_w) {
		R_w = r_w;
	}

	@Override
	public void printSynapse() {
		System.out.print(this);

	}

}
