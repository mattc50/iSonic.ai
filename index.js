// gets the iframe element
const iframe = document.getElementById("iframe")

// gets the button which triggers the widget opening from the main page.
const tryButton = document.getElementById("try-button");

/* eventually assigned to the toggle-widget element inside the iframe, but
   is initialized as nothing in order to prevent a value from being
   assigned before the iframe content is loaded.
*/
let toggleButton;

/* simulates a click on the toggle-widget elemeht (toggleButton) when
   clicked, which opens the widget.
*/
const openIframe = () => {
  toggleButton.click();
}

/* waits for iframe content to load before assigning variables and element
   properties to those iframe contents.
   this is to prevent load-race conditions where assignments are made
   before the content is actually rendered.
*/
iframe.onload = () => {
  toggleButton = iframe.contentWindow.document.getElementById("toggle-widget");
  tryButton.onclick = openIframe;
}