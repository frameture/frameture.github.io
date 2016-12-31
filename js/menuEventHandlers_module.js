/* Module for menu event handling. */
function MenuEventHandlers() {
  /**
   * Function provides the interface for the external world to start 
   * the process of registering menu event handlers. 
   **/
  this.main = function() {
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
    $(".menu-close").click(function(e) { hideMenu(); });
    $(".menu-open").click(function(e) {
      e.stopPropagation();
      if ( $(".menu-main").css("left") === "0px" )
        hideMenu();
      else {
        $(".menu-main").animate( { left: "0" }, 200); // show main-menu
        $(".menu-open").animate( { opacity: ".5" }, 100);
      }
    });
    $(".sub-menu-close").click(function(e) {
      e.stopPropagation();
      hideSubMenu();
    });
    /* clicking the menu area will stop event propagation; this is needed
       in order to prevent the body's click listener to hide sub-menu. */
    $(".menu").click(function(e) {  e.stopPropagation(); });
  }

  /**
   * Function registers listeners to the menu items.
   */
  function registerMenuItemsListeners() {
    $(".menu-main").find("li").click(function(e) {
      e.stopPropagation();
      var $subMenuP = $(".sub-menu-left").find("p");
      var $subMenuContent = $(".sub-menu-left").find(".sub-menu-content"); // menu item content
      if ( $(".sub-menu-left").css("left") > "0px" ) {   
        if ( $(this).html() === $subMenuP.html() ) // if menu item clicked again - hide
          hideSubMenu();
        setProperContent(this, $subMenuP, $subMenuContent); // set the text
      } else {
        setProperContent(this, $subMenuP, $subMenuContent);
        $(".sub-menu-left").animate( { left: "6.9em" }, 200); // show sub-menu
      }     
    });
  }

  /**
   * Set content of sub-menu depending on clicked menu item.
   */ 
  function setProperContent(object, $subMenuP, $subMenuContent) {
    $subMenuP.html($(object).html()); // set title 
    $subMenuContent.html(getListItemText($(object))); // set content
  }

  /** 
   * Hide menu, and depending on current state also sub-menu.
   */
  function hideMenu() {
    hideSubMenu()
    $(".menu-main").animate( { left: "-10em" }, 200); // hide menu
    $(".menu-open").animate( { opacity: "1" }, 100);
  }
  
  function hideSubMenu() {
    if ( $(".sub-menu-left").css("left") > "0px") // if sub-menu is visible
      $(".sub-menu-left").animate( { left: "-14em" }, 200);
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
    switch ($listItem.html()) {
      case "About":   return menuItemsText[0];
      case "Help":    return menuItemsText[1];
      case "Contact": return menuItemsText[2];
      case "Content": return menuItemsText[3];
      default:
        console.log("Error in event-handling getListItemText()");
        return "An error occured. Sorry.";
    }
  }
}
