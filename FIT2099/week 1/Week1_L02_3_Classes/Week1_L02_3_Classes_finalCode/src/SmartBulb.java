public class SmartBulb {

    //private attributes
    private boolean status;
    private String colour;
    private double consumptionToday; //inWatts

    //constructor
    public SmartBulb() {
    }

    //construct overloading
    public SmartBulb(boolean _status, String _colour) {
        this.status=_status;
        this.colour=_colour;
    }

    //getters and setters
    public String getColour() {
        return colour;
    }

    public void setColour(String colour) {
        this.colour = colour;
    }

    public boolean getStatus() {
        return status;
    }

    public void turnOn() {
        this.status = true;
    }

    public void turnOff() {
        this.status = false;
    }

    public double getConsumptionToday() {
        return consumptionToday;
    }







}
