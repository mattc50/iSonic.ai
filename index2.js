var htmlString = `
  <div class="widget-header">
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
  <g opacity="0.9">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M25.5364 5.41093C26.4453 6.09158 26.6295 7.37905 25.9478 8.28659L19.1595 17.3244C16.6168 20.7096 19.0358 25.5405 23.2736 25.5405H24.3021C25.4382 25.5405 26.3592 26.4602 26.3592 27.5946C26.3592 28.729 25.4382 29.6486 24.3021 29.6486H23.2736C15.6456 29.6486 11.2914 20.953 15.8682 14.8595L22.6565 5.82174C23.3381 4.9142 24.6275 4.73028 25.5364 5.41093Z" fill="white"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M22.0394 42.5891C21.1305 41.9084 20.9463 40.6209 21.628 39.7134L28.4163 30.6756C30.959 27.2904 28.5399 22.4595 24.3021 22.4595H23.2736C22.1375 22.4595 21.2165 21.5398 21.2165 20.4054C21.2165 19.271 22.1375 18.3514 23.2736 18.3514H24.3021C31.9302 18.3514 36.2844 27.047 31.7076 33.1405L24.9193 42.1783C24.2376 43.0858 22.9482 43.2697 22.0394 42.5891Z" fill="white"/>
  </g>
</svg>
  </div>
`;
document.getElementById("iframe").src =
  "data:text/html;charset=utf-8," + escape(htmlString);

var cssLink = document.createElement("link");
cssLink.href = "styles.css";
cssLink.rel = "stylesheet";
cssLink.type = "text/css";
// frames["iframe"].document.head.appendChild(cssLink);
document.getElementById("iframe").contentDocument.head.appendChild(cssLink);
// console.log(document.getElementById("iframe").contentDocument.head);
document.appendChild(document.getElementById("iframe"));
