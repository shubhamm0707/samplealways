const customConv = document.getElementById("customConversion");
const revenueConv = document.getElementById("customConversion");
const customEvent = document.getElementById("customConversion");
const forceSample = document.getElementById("forceSample");
const sessionTime = document.getElementById("sessionTime");
const delayTrackTime = document.getElementById("delayTrackTime");
const delSs = document.getElementById("delSs");
const delLs = document.getElementById("delLs");

customConv.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    window.VWO.push(["track.goalConversion", Number(customConv.value)]);
  }
});

revenueConv.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    window.VWO.push(["track.revenueConversion", revenueConv.value]);
  }
});

customEvent.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    const [eventName, props] = customEvent.value.split(":");
    // Trigger the button element with a click
    window.VWO.event(eventName, JSON.parse(props));
  }
});

sessionTime.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    window.sessionStorage.setItem("sessionExpiryTime", sessionTime.value);
  }
});

delayTrackTime.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    window.sessionStorage.setItem("dtcTime", delayTrackTime.value);
  }
});

forceSample.onclick = window.__nls?.forceSampleAnalyze;
delLs.onclick = () => {
  window.localStorage.clear();
};
delSs.onclick = () => {
  window.sessionStorage.clear();
};

const interval = setInterval(() => {
  if (window.VWO) {
    try {
      window.VWO.TRACK_SESSION_COOKIE_EXPIRY_CUSTOM =
        (window.sessionStorage.getItem("sessionExpiryTime") || 1800) /
        (60 * 60 * 24);
      window.VWO._.allSettings.dataStore.plugins.DACDNCONFIG.DT.DELAYAFTERTRIGGER =
        (window.sessionStorage.getItem("dtcTime") || 1) * 1000;
    } catch (e) {
      console.log(e);
    }
    clearInterval(interval);
  }
}, 100);