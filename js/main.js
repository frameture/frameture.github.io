/**
 * Does all the work.
 */
function start() {
  new Clock().main(); // Create and insert dogital clock.
  new MenuEventHandlers().main(); // Register menu event handlers.
  new ProgrammingLog().main(); // Draws programming log and adds right sub-menu.
}
