/**
 * Does all the work.
 * It creates and adds the digital clock and registers event handlers.
 */
function start() {
  new Clock().main();             // create and insert dogital clock
  new MenuEventHandlers().main(); // register menu event handlers
  var axis = new Axis();
  
  axis.addLog("first android: 8/15 to 10/15", new Date(2015,7), new Date(2015, 9));
  axis.addLog("MQL: 10/15 to 2/16", new Date(2015, 9), new Date(2016, 1));
  axis.addLog("JAVA: 1/16 to 6/16", new Date(2016, 0), new Date(2016, 5));
  axis.addLog("ANDROID: 6/16 to 9/16", new Date(2016, 5), new Date(2016, 8));
  axis.addLog("RE-JAVA: 8/16 to 12/16", new Date(2016, 7), new Date(2016, 11));
  axis.addLog("HTML CSS: 9/16 to 11/16", new Date(2016, 8), new Date(2016, 10));
  axis.addLog("EJS: 9/16 to 12/16", new Date(2016, 8), new Date(2016, 11));
  axis.draw();
}
