package virustracking;
import java.io.*;


public class main {
	public static void main(String[] args)
	{
	try {

		 StringBuilder sb = new StringBuilder();
		 FileReader fr=new FileReader("/Users/karimelmokattaf/Desktop/testing.txt"); //importing txt file
		 BufferedReader br = new BufferedReader(fr);  
		 StringBuffer data = new StringBuffer();   
		 FileWriter csvout = new FileWriter("trial12.csv"); //Saving the file in a CSV file to be used for the GUI
		 String line = "Country,Total Cases, New Cases, Total Deaths, Total Recovered, Active Cases, Population";  
		 String[] population = {", 328200000", ", 1380000000", ", 212600000", ", 145900000", ", 65270000",", 46750000",", 45200000"
		                        ,", 67890000", ", 50880000",", 128900000",", 32970000",", 60460000",", 59310000",", 83990000",", 83780000"
		                        ,", 37850000",", 19120000",", 40220000",", 11590000",", 43730000",", 273500000",", 164700000"
		                        ,", 17130000",", 109600000",", 84340000",", 34800000",", 220900000",", 86560000"
		                        ,", 19240000", ", 37740000", ", 36910000", ", 8654000", ", 29140000", ", 10200000"
		                        ,", 10100000", ", 900600", ", 5094000", ", 102300000", ", 9660000", ", 126500000"
		                        ,", 1439000000", ", 4937000", ", 43850000", ", 53770000", ", 5850000", ", 3989000", 
		                        ", 10420000", ", 25500000", ", 51270000", ", 69800000", ", 4822000", ", 16430000", 
		                        ", 23820000"}; //Data collected from https://www.worldometers.info/world-population/population-by-country/
		 									   //The collected data is the approximation values for the sake of simplicity
	 	 data.append(line);
		 data.append("\n");
		 int counter = 0;
		 
		 while((line=br.readLine())!=null)  
		 {  
			//Making sure that the quotations and unnecessary symbols are removed
			line = line.replace(",", "");
		 	line = line.replace("(", "");
		 	line = line.replace(")", "");
		 	line = line.replace("[", "");
		 	line = line.replace("]", ",");
		 	line = line.replace("{", "");
		 	line = line.replace("}", "");
		 	line = line.replace("\"", "");
		 	
		 	data.append(line.substring(0,(line.length())-1));
		 	data.append(population[counter]);
		 	data.append("\n");
		 	++counter;
		 }  
		 
		 csvout.append(data);//Appending the data string to the output file
		 csvout.flush();
		 csvout.close();
		 fr.close();    
		 System.out.println("Contents of File: ");  
		 System.out.println(data.toString());  
		 
		}  
		catch(IOException e)  
		{  
			e.printStackTrace();  
		} 
		
	 }
	
}



