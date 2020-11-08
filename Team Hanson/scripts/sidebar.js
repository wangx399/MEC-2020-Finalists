// Toggle delay (ms)
const toggleSpeed = 200;

// If sidebar is shown in mobile site
var sidebarShown = false;

/**
 * Bind events control the sidebar
 */
function bindEvents() {
  /**
   * Toggle sidebar when click on the button
   */
  $('#sidebar-toggle').click(() => {
    $('#sidebar').toggle(toggleSpeed);
    sidebarShown = !sidebarShown;
  });

  /**
   * Toggle sidebar when the window is resized
   * If screen is small and previously the user didn't show the sidebar, hide it
   */
  $(window).resize(() => {
    if (!window.matchMedia('(max-width: 768px)').matches) {
      $('#sidebar').show(toggleSpeed);
    } else {
      if (!sidebarShown) {
        $('#sidebar').hide(toggleSpeed);
      }
    }
  });

  /**
   * Hide sidebar if the screen is small and the user click on the screen
   */
  $('#content').click(() => {
    if (window.matchMedia('(max-width: 768px)').matches) {
      $('#sidebar').hide(toggleSpeed);
      sidebarShown = false;
    }
  });

  /**
   * Show sidebar if the screen is large
   */
  if (!window.matchMedia('(max-width: 768px)').matches) {
    $('#sidebar').show(toggleSpeed);
  }
}