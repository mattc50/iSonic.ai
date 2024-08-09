// dictates state of current page, & what content should be shown
let state = "menu";

// dictates open state of widget (true => open, false => closed)
let OPEN = false;

// initializes the date and current day for the Calendar content
let DATE = new Date(Date.now());
let DAY = DATE.getDate();

// sample data for available consult timeslots
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

// gets parent window of iframe (the page it is embedded in)
const parent = window.parent;

// gets the body of the iframe document (where content will be added)
const body = document.body;

// gets iframe element from parent document
const iframe = parent.document.getElementById('iframe');



/* code for toggle button (when widget is closed)
   open is passed as a prop, which determines whether the widget is open or
   not, and ensures that the toggle button is rendered properly.
*/
const toggleHTML = (open) => `
  <button class="toggle-widget${open ? " toggle-hide" : ""}" id="toggle-widget" onclick="openWidget()">
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
      <g opacity="0.9">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M25.5364 5.41093C26.4453 6.09158 26.6295 7.37905 25.9478 8.28659L19.1595 17.3244C16.6168 20.7096 19.0358 25.5405 23.2736 25.5405H24.3021C25.4382 25.5405 26.3592 26.4602 26.3592 27.5946C26.3592 28.729 25.4382 29.6486 24.3021 29.6486H23.2736C15.6456 29.6486 11.2914 20.953 15.8682 14.8595L22.6565 5.82174C23.3381 4.9142 24.6275 4.73028 25.5364 5.41093Z" fill="white"></path>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.0394 42.5891C21.1305 41.9084 20.9463 40.6209 21.628 39.7134L28.4163 30.6756C30.959 27.2904 28.5399 22.4595 24.3021 22.4595H23.2736C22.1375 22.4595 21.2165 21.5398 21.2165 20.4054C21.2165 19.271 22.1375 18.3514 23.2736 18.3514H24.3021C31.9302 18.3514 36.2844 27.047 31.7076 33.1405L24.9193 42.1783C24.2376 43.0858 22.9482 43.2697 22.0394 42.5891Z" fill="white"></path>
      </g>
    </svg>
    <!-- <img width="60" height="60" src="images/isonic_logo_colored.png" /> -->
  </button>
`

// code for menu (initial page) of widget
const menuHTML = `
  <div class="menu-content-container" id="menu-content-container">
    <div class="widget-header">
        <!-- <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
            <g opacity="0.9">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M25.5364 5.41093C26.4453 6.09158 26.6295 7.37905 25.9478 8.28659L19.1595 17.3244C16.6168 20.7096 19.0358 25.5405 23.2736 25.5405H24.3021C25.4382 25.5405 26.3592 26.4602 26.3592 27.5946C26.3592 28.729 25.4382 29.6486 24.3021 29.6486H23.2736C15.6456 29.6486 11.2914 20.953 15.8682 14.8595L22.6565 5.82174C23.3381 4.9142 24.6275 4.73028 25.5364 5.41093Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M22.0394 42.5891C21.1305 41.9084 20.9463 40.6209 21.628 39.7134L28.4163 30.6756C30.959 27.2904 28.5399 22.4595 24.3021 22.4595H23.2736C22.1375 22.4595 21.2165 21.5398 21.2165 20.4054C21.2165 19.271 22.1375 18.3514 23.2736 18.3514H24.3021C31.9302 18.3514 36.2844 27.047 31.7076 33.1405L24.9193 42.1783C24.2376 43.0858 22.9482 43.2697 22.0394 42.5891Z" fill="white"/>
            </g>
        </svg> -->
        <img width="48" height="48" src="images/isonic_logo_colored.png" />
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

// code for Chat page of widget
const chatHTML = `
  <div class="chat-content-container" id="chat-content-container">
      <div class="widget-header">
          <button class="icon-button" onclick="backToMenu()">
          <span class="icon material-icons">
              &#xE5C4;
          </span>
          </button>
          <div class="widget-header-title">
              <img src="images/isonic_logo_colored.png">
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
                      <p>Sure, here is an answer.</p>
                      <button class="sources-button">
                        <div class="source-indices">
                        <span class="source-index">1</span>
                        <span class="source-index">2</span>
                        </div>
                        Show Sources
                      </button>
                  </div>
              </div>
              <div class="chat-bubble-container user">
                  <div class="chat-bubble">
                      <p>Tell me more!</p>
                  </div>
              </div>
              <div class="chat-bubble-container system">
                  <div class="chat-bubble">
                      <div class="loading-response">
                          <lottie-player src="https://lottie.host/a97c305c-1f5a-4365-97cf-b957ad73d2ba/kzqHqUET4M.json" background="transparent" speed="1" style="width: 40px; height: 40px;" loop autoplay disableShadowDOM ></lottie-player>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div class="chat-input-container">
          <textarea placeholder="Write a message..." rows="4" class="chat-input" id="chat-input" onfocus="handleChatFocus()" onblur="handleChatBlur()"></textarea>
          <button class="icon-button query-submit">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
                      <mask x="0" y="0" id="query-submit-mask" width="100%" height="100%">
                          <rect width="100%" height="100%" fill="white" />
                          <!-- <circle cx="50%" cy="50%" r="50%" fill="white" /> -->
                          <path transform="translate(8, 7)" d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" fill="black"/>
                      </mask>
                      <circle cx="20" cy="20" r="20" fill="white" mask="url(#query-submit-mask)" />
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

// code for Name & Email entry page of Consult flow
const consultHTML = `
  <div class="consult-content-container" id="consult-content-container">
    <div class="widget-header">
        <button class="icon-button" onclick="backToMenu()">
        <span class="icon material-icons">
            &#xE5C4;
        </span>
        </button>
        <div class="widget-header-title">
            <img src="images/isonic_logo_colored.png">
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

// code for Calendar page of Consult flow
const calendarHTML = `
  <div class="calendar-content-container" id="calendar-content-container">
    <div class="widget-header">
      <button class="icon-button" onclick="backToMenu()">
          <span class="icon material-icons">
              &#xE5C4;
          </span>
      </button>
      <div class="widget-header-title">
          <img src="images/isonic_logo_colored.png">
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

// code for Message page of widget
const messageHTML = `
  <div class="message-content-container" id="message-content-container">
    <div class="widget-header">
        <button class="icon-button" onclick="backToMenu()">
            <span class="icon material-icons">
                &#xE5C4;
            </span>
        </button>
        <div class="widget-header-title">
            <img src="images/isonic_logo_colored.png">
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

/* this is run inside the show functions for each page, which are triggered
   when the navigation buttons for each page are clicked on.
   OPEN is used to render the main-container and toggle button properly.
*/
const showContent = (page) => {
  if (page === "menu") {
    body.innerHTML = `
      <div class="main-container${OPEN ? " iframe-show" : ""}" id="main-container">
        ${menuHTML}
      </div>
      ${toggleHTML(OPEN)}
    `
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

const handleChatFocus = () => {
  const chatContainer = document.getElementById("chat-content-container");
  chatContainer.style.height = parent.visualViewport.height;
}

const handleChatBlur = () => {
  const chatContainer = document.getElementById("chat-content-container");
  chatContainer.style.height = "";
}

/* opens widget.
   style classes are checked and added/removed if needed to ensure that if
   manipulated on the frontend, functionality won't change.
*/
const openWidget = () => {
  const mainContainer = document.getElementById("main-container");
  if (!mainContainer.classList.contains('iframe-show')) mainContainer.classList.add("iframe-show");

  const toggle = document.getElementById("toggle-widget");
  toggle.classList.add("toggle-hide");
  OPEN = true;
  iframe.classList.add("iframe-show")
  trapFocus(mainContainer)
}

// closes widget.
// style classes are checked and added/removed if needed to ensure that if
// manipulated on the frontend, functionality won't change.
const closeWidget = () => {
  const mainContainer = document.getElementById("main-container");
  const style = window.getComputedStyle(mainContainer);
  const scaleStatus = style.getPropertyValue('scale');
  if (scaleStatus == 'none') {
    mainContainer.classList.add("iframe-show");
  }
  mainContainer.classList.remove("iframe-show");

  const toggle = document.getElementById("toggle-widget");
  toggle.classList.remove("toggle-hide");
  OPEN = false;
  iframe.classList.remove("iframe-show")
}

// shows (opens) Links dialog on the Chat page.
const showDialog = () => {
  const chatContent = document.getElementById("chat-content-container");
  const dialog = document.getElementById("sources-dialog");
  chatContent.style.display = "none";
  dialog.showModal();
  const container = document.getElementById("sources-dialog");
  trapFocus(container)
}

// hides (closes) Links dialog on the Chat page.
const closeDialog = () => {
  const chatContent = document.getElementById("chat-content-container");
  const dialog = document.getElementById("sources-dialog");
  chatContent.style.display = "flex";
  dialog.close();
}

/* these functions are called when the buttons that navigate to them are
   clicked on.
*/
const showChat = () => {
  state = "chat";
  showContent("chat");
  const container = document.getElementById("chat-content-container");
  trapFocus(container)

};
const showConsult = () => {
  state = "consult";
  showContent("consult");
  const container = document.getElementById("consult-content-container");
  trapFocus(container)

};
const showMessage = () => {
  state = "message";
  showContent("message");
  const container = document.getElementById("message-content-container");
  trapFocus(container)

};

/* Calendar function
   gets the number of empty days to add to the beginning of a given month.
*/
const getNulls = () => {
  const month = DATE.getMonth();
  const year = DATE.getFullYear();
  const day = new Date(year, month, 0).getDay();
  return day + 1;
};

/* Calendar function
   gets the number of days of a given month.
*/
const getDays = () => {
  const month = DATE.getMonth();
  const year = DATE.getFullYear();
  return new Date(year, month, 0).getDate();
};

/* Calendar function
   assembles the Calendar.
   first, getNulls and getDays are called to assemble the start of the
   Calendar array.
   second, zeros are added to the end of the Calendar array depending on
   how many days are left out of 42 (7 days * 6 maximum weeks).
   third, there is a check to see if the first Calendar row (the first 7
   digits of the Calendar array) are 0. If this is the case, the first
   Calendar row is hidden.
   last, the Calendar is assembled by adding days to their corresponding
   rows.
*/
const assembleDays = () => {
  const days = [];
  const zeros = getNulls();
  const daysInMonth = getDays();
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

  const weeks = [];

  const firstWeek = days.slice(0, 7);
  const checkFirstWeek = firstWeek => firstWeek.every(el => el === 0);
  const emptyFirstWeek = checkFirstWeek(firstWeek);
  const firstWeekEl = document.getElementById("calendar-row-1");
  firstWeekEl.style.display = emptyFirstWeek ? "none" : "flex";

  for (let cols = 0; cols < 6; cols++) {
    const week = [];
    const weekEl = document.getElementById(`calendar-row-${cols + 1}`);
    weekEl.innerHTML = '';
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
};

/* shows the available times for a given day.
   utilizes times as the source data from which to render available times.
*/
const showTimes = () => {
  const timesDisplay = document.getElementById("meeting-times");
  timesDisplay.innerHTML = '';
  for (let time of times) {
    const el = document.createElement("button");
    el.className = `time-button${time.selected ? " selected" : ""}`;
    el.innerHTML = `<span>${time.time}</span>`;
    timesDisplay.appendChild(el);
  }
};

/* renders the selected day and appends it to the HTML.
   it is called when the Calendar page is entered as well as every time 
   the month is changed in order to display the correct day (day name, 
   month, day number, year).
*/
const renderDay = () => {
  const eventDisplay = document.getElementById("meeting-date-text");
  const month = DATE.toLocaleString("default", { month: "long" });
  const year = DATE.getFullYear();
  const day = DATE.toLocaleDateString("default", { weekday: "long" });
  eventDisplay.innerHTML = `${day}, ${month} ${DAY}, ${year}`;
}

/* sets the correct month and year for the Calendar controls, which is
   based on which month/year is actively being displayed.
   it is called when the Calendar page is entered as well as every time 
   the month is changed in order to display the correct date.
   last, renderDay is called to ensure that the correct date is displayed
   in other areas of the interface.
*/
const setCalendar = () => {
  const dateDisplay = document.getElementById("calendar-date-display");
  const month = DATE.toLocaleString("default", { month: "long" });
  const year = DATE.getFullYear();
  dateDisplay.innerHTML = `${month} ${year}`;
  renderDay();
}

/* sets the day state to reflect the selected day.
   when it is called, the following functions are called with the following
   purposes:
   - assembleDays: re-render the days so that proper styling can be applied
     to the selected day.
   - showTimes: re-render the times so that the ones which apply to the
     newly-selected day are shown.
   - renderDay: re-render the element which displays the selected day for
     which times are shown.
*/
const setDay = (day) => {
  DAY = day;
  assembleDays();
  showTimes();
  renderDay();
}

// renders all the Calendar elements when the Calendar page is entered.
const goToCalendar = () => {
  state = "calendar";
  showContent("calendar");
  setCalendar();
  assembleDays();
  showTimes();
  const container = document.getElementById("calendar-content-container");
  trapFocus(container)
};

// navigates 1 month backwards and re-renders elements as needed.
const dateBack = () => {
  DATE.setMonth(DATE.getMonth() - 1);
  setCalendar();
  assembleDays();
  showTimes();

}

// navigates 1 month forwards and re-renders elements as needed.
const dateForward = () => {
  DATE.setMonth(DATE.getMonth() + 1);
  setCalendar();
  assembleDays();
  showTimes();
}

// navigates back to the Menu page and shows its content.
const backToMenu = () => {
  state = "menu";
  showContent("menu");
  const container = document.getElementById("menu-content-container");
  trapFocus(container);
};

function trapFocus(element) {
  var focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
  var firstFocusableEl = focusableEls[0];
  var lastFocusableEl = focusableEls[focusableEls.length - 1];
  var KEYCODE_TAB = 9;

  element.addEventListener('keydown', function (e) {
    var isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);

    if (!isTabPressed) {
      return;
    }

    if (e.shiftKey) /* shift + tab */ {
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
        e.preventDefault();
      }
    } else /* tab */ {
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus();
        e.preventDefault();
      }
    }
  });
}

showContent(state);