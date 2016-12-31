/**
 * Does all the work.
 * It creates and adds the digital clock and registers event handlers.
 */
function start() {
  new Clock().main();             // create and insert dogital clock
  new MenuEventHandlers().main(); // register menu event handlers
  var axis = new Axis();
  
  var firstJump = "I have gone through the " + 
        "'Creative, Serious and Playful Science of Android Apps' course by " + 
        "University of Illinois. It was measurably difficult to fathom the concepts of " +
        " Android app development without prior programming and Java knowledge - I felt the lack of it.";
  var mql = "As I got some programming skills, I have learnt some " +  
            "<a href='https://docs.mql4.com/'>MQL4 language</a> and let my computer " + 
            "help me and test my trading strategies automatically. I have been writing " + 
            "trading robots only in procedural paradigm, which helped me to set my mindset " + 
            "into 'step-by-step' mode.";
  var java = "December 2015 to June 2016"; 
  
  axis.addLog("First Jump Into Programming <br> August 2015 - October 2015", firstJump ,new Date(2015,7), new Date(2015, 9));
  axis.addLog("Automated Trading <br> October 2015 - January 2016", mql, new Date(2015, 9), new Date(2016, 0));
  axis.addLog("Java", java, new Date(2015, 11), new Date(2016, 5));
  axis.addLog("ANDROID", "6/16 to 9/16", new Date(2016, 5), new Date(2016, 8));
  axis.addLog("RE-JAVA", "8/16 to 12/16", new Date(2016, 7), new Date(2016, 11));
  axis.addLog("EJS", "10/16 to 12/16", new Date(2016, 9), new Date(2016, 11));
  axis.addLog("HTML CSS", "9/16 to 10/16", new Date(2016, 8), new Date(2016, 9));
  axis.draw();
}
