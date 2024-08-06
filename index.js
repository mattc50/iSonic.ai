// let iframeOpen = false;
const iframe = document.getElementById("iframe")
console.log(iframe)
const tryButton = document.getElementById("try-button");
// console.log(iframe.contentWindow.document.body)

let toggleButton;

const openIframe = () => {
  // iframe.style.scale = 1;

  // iframe.classList.toggle("iframe-show");
  // iframeOpen = true;
  toggleButton.click();
}

const closeIframe = () => {
  // iframe.style.scale = 0;

  // iframe.classList.toggle("iframe-show");
  // iframeOpen = false;
}

iframe.onload = () => {
  toggleButton = iframe.contentWindow.document.getElementById("toggle-widget");
  tryButton.onclick = openIframe;
}
// const toggleButton = document.getElementById("toggle-button");

// const style = window.getComputedStyle(iframe)
// const scaleStatus = style.getPropertyValue('scale');

// toggleButton.onclick = scaleStatus == 1 ? closeIframe : openIframe;