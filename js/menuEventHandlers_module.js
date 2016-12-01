/* Module for menu event handling. */
function MenuEventHandlers() {
  /**
   * Function provides the interface for the external world to start 
   * the process of registering menu event handlers. 
   **/
  this.main = () => {
    registerBodyListeners();
    registerMenuButtonsListeners();
    registerMenuItemsListeners();
  }
  
   /**
   * Function registers click and scroll event listeners to the document.
   * It provides the ability to close the opened sub-menu after the body is
   * clicked or the document scrolled. 
   */
  function registerBodyListeners() {
    $("body").click(hideSubMenu);
    addEventListener("scroll", hideSubMenu);
  }
  
  /**
   * Function registers event handlers to menu buttons.
   */ 
  function registerMenuButtonsListeners() {
    // clicking the menu-close element
    $(".menu-close").click((e) => { hideMenu(); });
    // clicking the menu-open button --- show menu-main
    $(".menu-open").click((e) => {
      e.stopPropagation(); // stop event propagation
      // user clicks the button again --- hide menu 
      if ( $(".menu-main").css("left") === "0px" )
        hideMenu();
      else {
        $(".menu-main").animate( { left: "0" }, 200);     // show main-menu
        $(".menu-open").animate( { opacity: ".5" }, 100); // change menu-open opacity
      }
    });
    // clicking sub-menu-close button --- hide sub-menu
    $(".sub-menu-close").click((e) => {
      e.stopPropagation(); // stop event propagation
      hideSubMenu();       // hide sub-menu
    });
    /* clicking the menu area will stop event propagation; this is needed
       in order to prevent the body's click listener to hide sub-menu. */
    $(".menu").click((e) => {  e.stopPropagation(); });
  }

  /**
   * Function registers listeners to the menu items.
   */
  function registerMenuItemsListeners() {
    $(".menu-main").find("li").click(function(e) {
      e.stopPropagation(); // stop event propagation
      var $subMenuP = $(".sub-menu").find("p");                       // menu item title
      var $subMenuContent = $(".sub-menu").find(".sub-menu-content"); // menu item content
      if ( $(".sub-menu").css("left") === "165.6px" ) {     // TODO: convert em to px!
        if ( $(this).html() === $subMenuP.html() )          // if menu item clicked again - hide
          hideSubMenu();
        setProperContent(this, $subMenuP, $subMenuContent); // set the text
      } else {
        setProperContent(this, $subMenuP, $subMenuContent);
        $(".sub-menu").animate( { left: "6.9em" }, 200);    // show sub-menu
      }     
    });
  }

  /**
   * Helper function to set content of sub-menu depending on clicked menu item.
   */ 
  function setProperContent(object, $subMenuP, $subMenuContent) {
    $subMenuP.html($(object).html());                 // set title to be the one clicked
    $subMenuContent.html(getListItemText($(object))); // and set content to be proper text
  }

  /** 
   * Helper function to hide menu, and depending on current state also sub-menu.
   */
  function hideMenu() {
    hideSubMenu() // hide sub-menu if visible 
    $(".menu-main").animate(  { left: "-10em" }, 200); // hide menu
    $(".menu-open").animate(  { opacity: "1" }, 100);  // make the menu button fully opaque
  }
  
  /**
   * Helper function to hide sub-menu.
   */ 
  function hideSubMenu() {
    if ( $(".sub-menu").css("left") === "165.6px")
      $(".sub-menu").animate( { left: "-14em" }, 200);
  }

  /**
  * Getting text content for menu items. Function is called in event handlers.
  * @listItem jQuery object containing menu item title.
  **/
  function getListItemText($listItem) {
      var menuItemsText = [ "This is 'about me' webpage representing my skills in Web Development",
                            "If you got here by accident, go <a href='http://google.com'>here</a>",
                            "If you feel like you want to contact, feel free to get in touch. email:      <strong>frameture@gmail.com</strong>", 
                            "Structure defined in HTML, style given with CSS, digital clock powered by JavaScript and menu tab written in jQuery / JavaScript" ];
    // return proper text-content 
    switch ($listItem.html()) {
      case "About":   return menuItemsText[0];
      case "Help":    return menuItemsText[1];
      case "Contact": return menuItemsText[2];
      case "Content": return menuItemsText[3];
      default:
        console.log("Error in event-handling getListItemText method");
        return "An error occured. Sorry.";
    }
  }
}
