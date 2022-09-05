public class SmartHomeDriver {

    public static void main(String[] args) {

        System.out.println("Welcome to the Smart Home system");

        SmartBulb bulb1=new SmartBulb();
        bulb1.turnOn();
        bulb1.setColour("red");


        SmartBulb bulb2=new SmartBulb(false,"yellow");

        SmartBulb bulbArray[]=new SmartBulb[2];
        bulbArray[0]=bulb1;
        bulbArray[1]=bulb2;

        // Displaying bulb data
        System.out.println("Bulb 1 is on: " + bulbArray[0].getStatus());
        System.out.println("Bulb 2 is on: " + bulbArray[1].getStatus());


        for (int i = 0; i < bulbArray.length; i++) {

            System.out.println("Bulb " + (i+1) + " is on: " + bulbArray[i].getStatus());
        }



    }
}
