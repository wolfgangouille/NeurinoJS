package model;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.util.ArrayList;

import org.jfree.chart.ChartFactory;
import org.jfree.chart.ChartPanel;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.plot.PlotOrientation;
import org.jfree.data.xy.XYSeries;
import org.jfree.data.xy.XYSeriesCollection;
import org.jfree.ui.ApplicationFrame;
import org.jfree.ui.RefineryUtilities;




public class test extends ApplicationFrame {

	public test(final String title, ArrayList<XYSeries> xyseries) {

		super(title);

		final XYSeriesCollection data = new XYSeriesCollection();

		for (int i=0;i<xyseries.size();i++) {
			data.addSeries(xyseries.get(i));
		}

		final JFreeChart chart = ChartFactory.createXYLineChart(
				"XY Series Demo",
				"Time (s)", 
				"Voltage/Current", 
				data,
				PlotOrientation.VERTICAL,
				true,
				true,
				false
				);

		final ChartPanel chartPanel = new ChartPanel(chart);
		chartPanel.setPreferredSize(new java.awt.Dimension(500, 270));
		setContentPane(chartPanel);

	}





	public static void main(String[] args) throws ClassNotFoundException, IOException {
		// TODO Auto-generated method stub

		double dt=0.001;
		double let=0;


		Network monNet = loadNetwork("Net0");
		//

		

 		//Network monNet= new Network();
  	
		//monNet.addNeuron(new eNeuron());
		//monNet.addNeuron(new eNeuron());

		//monNet.Neurons.get(0).setI(0.00002);
	//	monNet.connect(0,1, new eSynapse());
//		((eSynapse)n1.OutSynapses.get(0)).setR_w(100e3);


//		monNet.saveNet();
		
		monNet.printNet();
		
		//monNet.saveNet();

		final XYSeries series = new XYSeries("V1");
		final XYSeries series2 = new XYSeries("V2");
		final XYSeries series3 = new XYSeries("I");

		ArrayList<XYSeries> xyseries=  new ArrayList<XYSeries>();

		while (let<1) {
			let+=dt;
			monNet.maj(dt);

			//	System.out.println(let+" "+n1.getV()+" "+n1.OutSynapses.get(0).getI()+" "+n2.getV());
			series.add(let, monNet.Neurons.get(0).getV());
			series2.add(let, monNet.Neurons.get(1).getV());
			series3.add(let, monNet.Neurons.get(0).OutSynapses.get(0).getI());


		}

		xyseries.add(series);
		xyseries.add(series2);
		xyseries.add(series3);

		final test demo = new test("XY Series Demo",xyseries);
		demo.pack();
		RefineryUtilities.centerFrameOnScreen(demo);
		demo.setVisible(true);


	}


	public static Network loadNetwork(String inputFilename) 
			throws IOException, ClassNotFoundException
	{
		//check if file exists
		File tempFile = new File(inputFilename.concat(".nio"));
		boolean exists = tempFile.exists();
		if (exists) {
			FileInputStream fileInputStream = new FileInputStream(inputFilename.concat(".nio"));
			ObjectInputStream objectInputStream = new ObjectInputStream(fileInputStream);
			Network Net= (Network)objectInputStream.readObject();
			objectInputStream.close(); 
			return Net;
		}

		else
			return new Network();
	}

}


