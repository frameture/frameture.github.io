/**
 * Does all the work.
 * It creates and adds the digital clock and registers event handlers.
 */
function start() {
  new Clock().main();             // create and insert dogital clock
  new MenuEventHandlers().main(); // register menu event handlers
  var axis = new Axis();
  
  axis.addLog("1: 11/14 to 5/15", new Date(2014, 10), new Date(2015, 4));
  axis.addLog("2: 12/14 to 1/15", new Date(2014, 11), new Date(2015, 0));
  axis.addLog("3: 1/15 to 2/15", new Date(2015, 0), new Date(2015, 1));
  axis.addLog("4: 3/15 to 6/15", new Date(2015, 2), new Date(2015, 5));
  axis.addLog("5: 10/15 to 12/15", new Date(2015, 9), new Date(2015, 11));
  axis.addLog("6: 3/16 to current", new Date(2016, 2));
  axis.addLog("7: 12/16 to current", new Date(2016, 11));
  axis.draw();
}
