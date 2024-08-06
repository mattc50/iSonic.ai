// document.style.height = window.innerHeight - 48 + "px";

let state = "menu";

let OPEN = false;

let DATE = new Date(Date.now());
let DAY = DATE.getDate();

const times = [
  { time: "9:00 AM", selected: false },
  { time: "10:00 AM", selected: false },
  { time: "11:00 AM", selected: true },
  { time: "12:00 PM", selected: false },
  { time: "1:00 PM", selected: false },
  { time: "2:00 PM", selected: false },
  { time: "3:00 PM", selected: false },
  { time: "4:00 PM", selected: false },
  { time: "5:00 PM", selected: false },
  { time: "6:00 PM", selected: false },
];

// const iframe = document.getElementById("iframe");

// const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

// const body = iframeDoc.body;


// const parentDocument = window.parent.document;
const parent = window.parent;
// const body = parent.body;
const body = document.body;
console.log(parent.innerHeight)
// body.style.height = parent.innerHeight + "px";
const iframe = parent.document.getElementById('iframe');

// parent.addEventListener("resize", () => body.style.height = parent.innerHeight + "px");

const toggleHTML = (open) => `
  <button class="toggle-widget${open ? " toggle-hide" : ""}" id="toggle-widget" onclick="openWidget()">
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
            <g opacity="0.9">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M25.5364 5.41093C26.4453 6.09158 26.6295 7.37905 25.9478 8.28659L19.1595 17.3244C16.6168 20.7096 19.0358 25.5405 23.2736 25.5405H24.3021C25.4382 25.5405 26.3592 26.4602 26.3592 27.5946C26.3592 28.729 25.4382 29.6486 24.3021 29.6486H23.2736C15.6456 29.6486 11.2914 20.953 15.8682 14.8595L22.6565 5.82174C23.3381 4.9142 24.6275 4.73028 25.5364 5.41093Z" fill="white"></path>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M22.0394 42.5891C21.1305 41.9084 20.9463 40.6209 21.628 39.7134L28.4163 30.6756C30.959 27.2904 28.5399 22.4595 24.3021 22.4595H23.2736C22.1375 22.4595 21.2165 21.5398 21.2165 20.4054C21.2165 19.271 22.1375 18.3514 23.2736 18.3514H24.3021C31.9302 18.3514 36.2844 27.047 31.7076 33.1405L24.9193 42.1783C24.2376 43.0858 22.9482 43.2697 22.0394 42.5891Z" fill="white"></path>
            </g>
        </svg>
  </button>
`

const menuHTML = `
  <div class="menu-content-container">
    <div class="widget-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
            <g opacity="0.9">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M25.5364 5.41093C26.4453 6.09158 26.6295 7.37905 25.9478 8.28659L19.1595 17.3244C16.6168 20.7096 19.0358 25.5405 23.2736 25.5405H24.3021C25.4382 25.5405 26.3592 26.4602 26.3592 27.5946C26.3592 28.729 25.4382 29.6486 24.3021 29.6486H23.2736C15.6456 29.6486 11.2914 20.953 15.8682 14.8595L22.6565 5.82174C23.3381 4.9142 24.6275 4.73028 25.5364 5.41093Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M22.0394 42.5891C21.1305 41.9084 20.9463 40.6209 21.628 39.7134L28.4163 30.6756C30.959 27.2904 28.5399 22.4595 24.3021 22.4595H23.2736C22.1375 22.4595 21.2165 21.5398 21.2165 20.4054C21.2165 19.271 22.1375 18.3514 23.2736 18.3514H24.3021C31.9302 18.3514 36.2844 27.047 31.7076 33.1405L24.9193 42.1783C24.2376 43.0858 22.9482 43.2697 22.0394 42.5891Z" fill="white"/>
            </g>
        </svg>
        <button class="icon-button" onclick="closeWidget()">
        <span class="icon material-icons">
            &#xE5CD;
        </span>
        </button>
    </div>

  
    <div class="widget-menu-container">
      <div class="widget-menu">
        <button id="chat-menu-item" class="menu-item" onclick="showChat()">
            <div class="menu-item-content">
            <div class="menu-item-header">
                <span class="icon small material-icons">
                &#xE0CA;
                </span>
                <p class="menu-item-title">Chat</p>
            </div>
            <p>Instant AI tips and advice, available 24/7.</p>
            </div>
            <span class="icon material-icons">
            &#xE5CC;
            </span>
        </button>
        <button id="consult-menu-item" class="menu-item" onclick="showConsult()">
            <div class="menu-item-content">
            <div class="menu-item-header">
                <span class="icon small material-icons">
                &#xE7FB;
                </span>
                <p class="menu-item-title">Consult</p>
            </div>
            <p>Book 1-on-1 sessions with experts for personalized advice.</p>
            </div>
            <span class="icon material-icons">
            &#xE5CC;
            </span>
        </button>
        <button id="message-menu-item" class="menu-item" onclick="showMessage()">
            <div class="menu-item-content">
            <div class="menu-item-header">
                <span class="icon small material-icons">
                &#xE8AF;
                </span>
                <p class="menu-item-title">Message</p>
            </div>
            <p>Submit questions for detailed expert responses at your convenience.</p>
            </div>
            <span class="icon material-icons">
            &#xE5CC;
            </span>
        </button>
      </div>
    </div>
  </div>
`;

const chatHTML = `
  <div class="chat-content-container" id="chat-content-container">
      <div class="widget-header">
          <button class="icon-button" onclick="backToMenu()">
          <span class="icon material-icons">
              &#xE5C4;
          </span>
          </button>
          <div class="widget-header-title">
              <img src="images/isonic_logo.png">
              <p>Chat</p>
          </div>
          <div class="button-set">
            <button class="icon-button" onclick="showDialog()">
                <span class="icon material-icons-outlined">
                    &#xE55B;
                </span>
            </button>
            <button class="icon-button" onclick="closeWidget()">
                <span class="icon material-icons">
                    &#xE5CD;
                </span>
            </button>
          </div>
      </div>

      <div class="chat-thread-container">
          <div class="chat-thread">
              <div class="chat-bubble-container system">
                  <div class="chat-bubble">
                      <p>Hey! Can I help you with anything?</p>
                  </div>
              </div>
              <div class="chat-bubble-container user">
                  <div class="chat-bubble">
                      <p>What are some of the best things to do in Belfair?</p>
                  </div>
              </div>
              <div class="chat-bubble-container system">
                  <div class="chat-bubble">
                      <div class="loading-response">
                          <dotlottie-player src="https://lottie.host/5cb8aad3-852d-449a-ac20-242b4fe99895/VplikMz57D.json" background="transparent" speed="1" style="width: 40px; height: 40px;" loop autoplay></dotlottie-player>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div class="chat-input-container">
          <textarea placeholder="Write a message..." rows="4" class="chat-input"></textarea>
          <button class="icon-button query-submit">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
                      <mask x="0" y="0" id="query-submit-mask" width="100%" height="100%">
                          <rect width="100%" height="100%" fill="white" />
                          <path transform="translate(8, 7)" d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" fill="black"/>
                      </mask>
                      <circle cx="20" cy="20" r="20" fill="white" mask="url(#query-submit-mask)"
              </svg>
          </button>
      </div>
  </div>

  <dialog class="sources-dialog" id="sources-dialog">
    <div class="modal-content">
      <div class="widget-header modal-header">
        <button class="icon-button" onclick="closeDialog()">
          <span class="icon material-icons">
              &#xE5C4;
          </span>
        </button>
        <div class="widget-header-title">
            <p>Links</p>
        </div>
      </div>
      <div class="source-links">
        <a class="source-link" href="https://www.google.com" target="blank">Google</a>
        </div>
      </div>
    </div>
  </dialog>
`;

const consultHTML = `
  <div class="consult-content-container">
    <div class="widget-header">
        <button class="icon-button" onclick="backToMenu()">
        <span class="icon material-icons">
            &#xE5C4;
        </span>
        </button>
        <div class="widget-header-title">
            <img src="images/isonic_logo.png">
            <p>Consult</p>
        </div>
        <button class="icon-button" onclick="closeWidget()">
        <span class="icon material-icons">
            &#xE5CD;
        </span>
        </button>
    </div>

    <div class="field-group">
        <div class="input-field">
            <label class="widget-label" for="name">Name</label>
            <input class="widget-input" id="name"/>
        </div>
        <div class="input-field">
            <label class="widget-label" for="email">Email</label>
            <input class="widget-input" id="email"/>
        </div>
    </div>

    <button class="full-button" onclick="goToCalendar()">Next</button>
    </div>

`;

const calendarHTML = `
  <div class="calendar-content-container">
    <div class="widget-header">
      <button class="icon-button" onclick="backToMenu()">
          <span class="icon material-icons">
              &#xE5C4;
          </span>
      </button>
      <div class="widget-header-title">
          <img src="images/isonic_logo.png">
          <p>Consult</p>
      </div>
      <button class="icon-button" onclick="closeWidget()">
        <span class="icon material-icons">
            &#xE5CD;
        </span>
      </button>
    </div>

    <button class="back-step-button" onclick="showConsult()">
      <span class="material-icons">
        &#xE5CB;
      </span>
      <p>Back to name & email</p>
    </button>
    <div class="calendar-content">
        <div class="calendar-controls">
          <button class="icon-button" onclick="dateBack()">
            <span class="icon material-icons">
              &#xE5CB;
            </span>
          </button>
          <p id="calendar-date-display"></p>
          <button class="icon-button" onclick="dateForward()">
            <span class="icon material-icons">
              &#xE5CC;
            </span>
          </button>
      </div>
    
      <div class="calendar">
        <div class="calendar-row calendar-labels">
          <small>Sun</small>
          <small>Mon</small>
          <small>Tue</small>
          <small>Wed</small>
          <small>Thu</small>
          <small>Fri</small>
          <small>Sat</small>
        </div>
        <div class="calendar-row" id="calendar-row-1"></div>
        <div class="calendar-row" id="calendar-row-2"></div>
        <div class="calendar-row" id="calendar-row-3"></div>
        <div class="calendar-row" id="calendar-row-4"></div>
        <div class="calendar-row" id="calendar-row-5"></div>
        <div class="calendar-row" id="calendar-row-6"></div>
      </div>

      <div class="meeting-date-container">
        <div class="meeting-date-details">
          <p id="meeting-date-text"></p>
          <p>Time zone: US & Canada</p>
        </div>
        <div class="duration-container">
          <label class="widget-label" for="duration">Duration</label>
          <select class="widget-select" id="duration" name="duration">
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
          </select>
        </div>
        <div class="meeting-times-container">
          <div class="meeting-times" id="meeting-times"></div>
        </div>
      </div>
    </div>
    <button class="full-button">Next</button>
  </div>
`;

const messageHTML = `
  <div class="message-content-container">
    <div class="widget-header">
        <button class="icon-button" onclick="backToMenu()">
            <span class="icon material-icons">
                &#xE5C4;
            </span>
        </button>
        <div class="widget-header-title">
            <img src="images/isonic_logo.png">
            <p>Message</p>
        </div>
        <button class="icon-button" onclick="closeWidget()">
            <span class="icon material-icons">
                &#xE5CD;
            </span>
        </button>
    </div>
    <div class="field-group">
        <div class="input-field">
            <label class="widget-label" for="name">Name</label>
            <input class="widget-input" id="name"/>
        </div>
        <div class="input-field">
            <label class="widget-label" for="email">Email</label>
            <input class="widget-input" id="email"/>
        </div>
        <div class="input-field">
            <label class="widget-label" for="message">Message</label>
            <textarea placeholder="Write a message..." rows="4" class="widget-multiline"></textarea>
        </div>

    </div>

    <button class="full-button" onclick="goToCalendar()">Next</button>
  </div>
`;

const showContent = (page) => {
  if (page === "menu") {
    //   iframe.onload = () => {

    body.innerHTML = `
      <div class="main-container${OPEN ? " iframe-show" : ""}" id="main-container">
        ${menuHTML}
      </div>
      ${toggleHTML(OPEN)}
    `
    // body.innerHTML = menuHTML;

    //   document.src = "about:blank";
    //   };
  }

  if (page === "chat") {
    body.innerHTML = `
      <div class="main-container${OPEN ? " iframe-show" : ""}" id="main-container">
        ${chatHTML}
      </div>
      ${toggleHTML(OPEN)}
    `
  }

  if (page === "consult") {
    body.innerHTML = `
      <div class="main-container${OPEN ? " iframe-show" : ""}" id="main-container">
        ${consultHTML}
      </div>
      ${toggleHTML(OPEN)}
    `
  }

  if (page === "calendar") {
    body.innerHTML = `
      <div class="main-container${OPEN ? " iframe-show" : ""}" id="main-container">
        ${calendarHTML}
      </div>
      ${toggleHTML(OPEN)}
    `
  }

  if (page === "message") {
    body.innerHTML = `
      <div class="main-container${OPEN ? " iframe-show" : ""}" id="main-container">
        ${messageHTML}
      </div>
      ${toggleHTML(OPEN)}
    `
  }
};

const openWidget = () => {
  const mainContainer = document.getElementById("main-container");
  if (!mainContainer.classList.contains('iframe-show')) mainContainer.classList.add("iframe-show");
  const toggle = document.getElementById("toggle-widget");
  toggle.classList.add("toggle-hide");
  // iframe.style.height = parent.innerHeight - 84 + "px"
  // iframe.style.width = "390px"
  // iframe.style.maxHeight = "784px"
  OPEN = true;
  iframe.classList.add("iframe-show")
}

const closeWidget = () => {
  const mainContainer = document.getElementById("main-container");
  const style = window.getComputedStyle(mainContainer);
  const scaleStatus = style.getPropertyValue('scale');
  if (scaleStatus == 'none') {
    mainContainer.classList.add("iframe-show");
    // iframe.classList.add("main-container-show");

    // iframe.classList.toggle("iframe-show");
  }

  // const newStatus = scaleStatus == 1 ? 1 : window.getComputedStyle(iframe).getPropertyValue('scale');


  // if (scaleStatus == 1) {
  mainContainer.classList.remove("iframe-show");
  // iframe.classList.remove("main-container-show");
  // }
  const toggle = document.getElementById("toggle-widget");
  toggle.classList.remove("toggle-hide");
  // iframe.style.height = "60px";
  // iframe.style.width = "60px";
  // iframe.style.maxHeight = "60px";
  OPEN = false;
  iframe.classList.remove("iframe-show")
}

const showDialog = () => {
  const chatContent = document.getElementById("chat-content-container");
  const dialog = document.getElementById("sources-dialog");
  chatContent.style.display = "none";
  dialog.showModal();
}

const closeDialog = () => {
  const chatContent = document.getElementById("chat-content-container");
  const dialog = document.getElementById("sources-dialog");
  chatContent.style.display = "flex";
  dialog.close();
}

const showChat = () => {
  //   console.log("show chat");
  state = "chat";
  showContent("chat");
};

const showConsult = () => {
  state = "consult";
  showContent("consult");
};

const showMessage = () => {
  state = "message";
  showContent("message");
};

const getNulls = () => {
  const month = DATE.getMonth();
  const year = DATE.getFullYear();
  const day = new Date(year, month, 0).getDay();
  return day + 1;
};

const getDays = () => {
  const month = DATE.getMonth();
  const year = DATE.getFullYear();
  return new Date(year, month, 0).getDate();
};

const assembleDays = () => {
  const days = [];
  const zeros = getNulls();
  const daysInMonth = getDays();
  //   console.log(zeros, daysInMonth);
  for (let zStart = 0; zStart < zeros; zStart++) {
    days.push(0);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }
  const trailingZeros = 42 - days.length;
  for (let zEnd = 0; zEnd < trailingZeros; zEnd++) {
    days.push(0);
  }
  //   return days;

  const weeks = [];

  const day = DATE.getDate();
  // console.log(day);

  const firstWeek = days.slice(0, 7);
  const checkFirstWeek = firstWeek => firstWeek.every(el => el === 0);
  const emptyFirstWeek = checkFirstWeek(firstWeek);
  // console.log(emptyFirstWeek)
  const firstWeekEl = document.getElementById("calendar-row-1");
  firstWeekEl.style.display = emptyFirstWeek ? "none" : "flex";

  for (let cols = 0; cols < 6; cols++) {
    const week = [];
    const weekEl = document.getElementById(`calendar-row-${cols + 1}`);
    weekEl.innerHTML = '';
    // console.log(weekEl);
    for (let rows = 0; rows < 7; rows++) {
      week.push(days[cols * 7 + rows]);
      if (days[cols * 7 + rows] !== 0) {
        const el = document.createElement("button");
        el.className = `calendar-day${DAY === days[cols * 7 + rows] ? " selected" : ""
          }`;
        el.onclick = () => setDay(days[cols * 7 + rows]);
        el.innerHTML = `<span>${days[cols * 7 + rows]}</span>`;
        weekEl.appendChild(el);
      } else {
        const el = document.createElement("div");
        el.className = "calendar-day";
        weekEl.appendChild(el);
      }
    }
    weeks.push(week);
  }

  //   console.log(weeks)
};

// console.log(assembleDays());

const showTimes = () => {
  const timesDisplay = document.getElementById("meeting-times");
  timesDisplay.innerHTML = '';
  for (let time of times) {
    const el = document.createElement("button");
    el.className = `time-button ${time.selected && "selected"}`;
    el.innerHTML = `<span>${time.time}</span>`;
    timesDisplay.appendChild(el);
  }
};

const renderDay = () => {
  const eventDisplay = document.getElementById("meeting-date-text");
  const month = DATE.toLocaleString("default", { month: "long" });
  const year = DATE.getFullYear();
  const day = DATE.toLocaleDateString("default", { weekday: "long" });
  eventDisplay.innerHTML = `${day}, ${month} ${DAY}, ${year}`;
}

const setCalendar = () => {
  const dateDisplay = document.getElementById("calendar-date-display");
  const month = DATE.toLocaleString("default", { month: "long" });
  const year = DATE.getFullYear();
  const day = DATE.toLocaleDateString("default", { weekday: "long" });
  // const date = DATE.getDate();
  dateDisplay.innerHTML = `${month} ${year}`;
  renderDay();
}

const setDay = (day) => {
  // console.log("running")
  DAY = day;
  assembleDays();
  showTimes();
  renderDay();
}

const goToCalendar = () => {
  //   console.log("show chat");
  state = "calendar";
  showContent("calendar");
  setCalendar();
  assembleDays();
  showTimes();
};

const dateBack = () => {
  // const currMonth = date.getMonth();
  // const prevMonth = currMonth === 0 ? 11 : currMonth - 1;
  // const newDate = date.setMonth(date.getMonth() - 1);
  // return newDate;
  // DATE = newDate;
  DATE.setMonth(DATE.getMonth() - 1);
  setCalendar();
  assembleDays();
  showTimes();

}

const dateForward = () => {
  // const newDate = date.setMonth(date.getMonth() + 1);
  // return newDate;
  // DATE = newDate;
  DATE.setMonth(DATE.getMonth() + 1);
  setCalendar();
  assembleDays();
  showTimes();
}

const backToMenu = () => {
  // console.log("show chat");
  state = "menu";
  showContent("menu");
};

showContent(state);
