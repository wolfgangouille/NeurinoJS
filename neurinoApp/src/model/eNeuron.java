package model;

public class eNeuron extends Neuron {
	private static final long serialVersionUID = 1L;


	private double Vccp; //V
	private double Vccm; //V
	private double v; //V
	private double u; //V    

	private double C_v; //F
	private double C_u; //F

	private double R_Na_leak; //Ohm
	private double R_K_leak; //Ohm

	private double R_Na_on; //Ohm
	private double R_K_on; //Ohm   

	private double R_Na_thresh; //Ohm
	private double R_K_thresh; //Ohm

	private double v_thresh; //V

	private double R_delay_up; //Ohm
	private double R_delay_down; //Ohm

	private double i; // incoming current 

	private int int1; // different fet states
	private int int2;
	private int int3;
	private int int4;


	private double threshyst;


	public eNeuron() {
		super();

		subClass="eNeuron";
		
		Vccp=5; //V
		Vccm=-5; //V

		v=0; //V
		u=0; //V

		C_v=1e-6; //F
		C_u=1e-7; //F

		R_Na_leak=100e3; //Ohm
		R_K_leak=100e3; //Ohm

		R_Na_on=10e3; //Ohm
		R_K_on=20e3; //Ohm


		R_Na_thresh=90e3; //Ohm
		R_K_thresh=100e3; //Ohm

		v_thresh=(Vccp/R_Na_thresh+Vccm/R_K_thresh)/(1/R_Na_thresh+1/R_K_thresh); //V

		R_delay_up=10e3;  //Ohm
		R_delay_down=10e3; //Ohm

		i=0; //amp

		int1=1; //boolean
		int2=0;
		int3=0;
		int4=0;

		//v is controlled by 1, 2 and 3.
		//u is controlled by 4
		//2 and 4 are controlled by v.
		//1 and 3 are controlled by u. 

		threshyst=0;

	}

	
	
	@Override
	public void maj(double dt) {
		// TODO Auto-generated method stub

		double I_syn=collectI();
		v=v+(dt/C_v)*I_syn; //i synapse

		v=v+(dt/C_v)*i; //i external

		if (v>=v_thresh) {
			int2=1;
			int4=1;
			fire();
		}
		else {
			int2=0;
			int4=0;
		}

		if (u>0+(Math.signum(int1-0.5)*(threshyst))) { //Symmetrical hysteresis
			int1=0;
			int3=1;
		}
		else {
			int1=1;
			int3=0;
		}



		double g_v_plus=1/R_Na_leak+(int1*int2)/R_Na_on;
		double g_v_moins=1/R_K_leak+(int3)/R_K_on;

		double g_u_plus=int4/R_delay_up;
		double g_u_moins=(1-int4)/R_delay_down;

		//double vold=v;

		//v=v+(dt/C_v)*(g_v_plus*(Vccp-vold)+g_v_moins*(Vccm-vold));

		v=v+(Vccp-v)*(1-Math.exp(-dt*g_v_plus/C_v))+(Vccm-v)*(1-Math.exp(-dt*g_v_moins/C_v));
		
		
		//u=u+(dt/C_u)*(g_u_plus*(Vccp-u)+g_u_moins*(Vccm-u));
		u=u+(Vccp-u)*(1-Math.exp(-dt*g_u_plus/C_u))+(Vccm-u)*(1-Math.exp(-dt*g_u_moins/C_u));


	}


	//generate function to set neurons with predefined parameters
	//getters and setters for i

	public double getI() {
		return i;
	}

	public void setI(double i) {
		this.i = i;
	}


	public double getV() {
		return v;
	}

	@Override
	public void printNeuron() {
		System.out.print(this);		
	}

}
