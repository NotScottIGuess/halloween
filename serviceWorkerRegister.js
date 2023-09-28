if (!("serviceWorker" in navigator)) {
  alert("Service Worker not supported");
}

window.addEventListener("load", () => {
  navigator.serviceWorker
    .register("/halloween/serviceWorker.js")
    .then((reg) => console.log("SW Registered", reg))
    .catch(console.error);
});
