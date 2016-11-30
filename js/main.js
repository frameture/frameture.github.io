/**
 * Function that does all the work.
 * It creates and adds nodes that represent the digital clock by using clock_module,
 * also registers event handlers by using menuEventHandlers_module.
**/
function start() {
  new Clock().main();             // create and insert dogital clock
  new MenuEventHandlers().main(); // register menu event handlers 
}
