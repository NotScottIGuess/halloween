/// <reference lib="webworker" />

const CACHE_NAME = "#17";

const resources = [
  "/halloween/index.html",
  "/halloween/serviceWorkerRegister.js",
  "/halloween/assets/background.jpeg",
  "/halloween/assets/cross.png",
  "/halloween/assets/crossChecked.png",
  "/halloween/assets/crossUnchecked.png",
  "/halloween/assets/fill.png",
  "/halloween/assets/fillChecked.png",
  "/halloween/assets/fillUnchecked.png",
  "/halloween/assets/font.otf",
  "/halloween/assets/gallery.png",
  "/halloween/assets/index-4d41ce65.js",
  "/halloween/assets/index-fb790112.css",
  "/halloween/assets/solutions/01.png",
  "/halloween/assets/solutions/06.png",
  "/halloween/assets/solutions/11.png",
  "/halloween/assets/solutions/16.png",
  "/halloween/assets/solutions/21.png",
  "/halloween/assets/solutions/26.png",
  "/halloween/assets/solutions/31.png",
  "/halloween/assets/solutions/36.png",
  "/halloween/assets/solutions/41.png",
  "/halloween/assets/solutions/46.png",
  "/halloween/assets/solutions/02.png",
  "/halloween/assets/solutions/07.png",
  "/halloween/assets/solutions/12.png",
  "/halloween/assets/solutions/17.png",
  "/halloween/assets/solutions/22.png",
  "/halloween/assets/solutions/27.png",
  "/halloween/assets/solutions/32.png",
  "/halloween/assets/solutions/37.png",
  "/halloween/assets/solutions/42.png",
  "/halloween/assets/solutions/47.png",
  "/halloween/assets/solutions/03.png",
  "/halloween/assets/solutions/08.png",
  "/halloween/assets/solutions/13.png",
  "/halloween/assets/solutions/18.png",
  "/halloween/assets/solutions/23.png",
  "/halloween/assets/solutions/28.png",
  "/halloween/assets/solutions/33.png",
  "/halloween/assets/solutions/38.png",
  "/halloween/assets/solutions/43.png",
  "/halloween/assets/solutions/48.png",
  "/halloween/assets/solutions/04.png",
  "/halloween/assets/solutions/09.png",
  "/halloween/assets/solutions/14.png",
  "/halloween/assets/solutions/19.png",
  "/halloween/assets/solutions/24.png",
  "/halloween/assets/solutions/29.png",
  "/halloween/assets/solutions/34.png",
  "/halloween/assets/solutions/39.png",
  "/halloween/assets/solutions/44.png",
  "/halloween/assets/solutions/49.png",
  "/halloween/assets/solutions/05.png",
  "/halloween/assets/solutions/10.png",
  "/halloween/assets/solutions/15.png",
  "/halloween/assets/solutions/20.png",
  "/halloween/assets/solutions/25.png",
  "/halloween/assets/solutions/30.png",
  "/halloween/assets/solutions/35.png",
  "/halloween/assets/solutions/40.png",
  "/halloween/assets/solutions/45.png",
  "/halloween/assets/solutions/50.png",
];

self.addEventListener("install", (e) => {
  console.log("SW Install");

  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("SW Caching Files");
        for (const res of resources) {
          cache
            .add(res)
            .then(() => console.log(`  - Passed: ${res}`))
            .catch((e) => console.error(`  - Failed: ${res}`, e));
        }
      })
      .then(() => self.skipWaiting())
      .catch((e) => {
        console.error("SW Failure: ", e);
      })
  );
});

self.addEventListener("activate", (e) => {
  console.log("SW Activate");
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("SW Clearing Old Cache " + cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (e) => {
  console.log(`SW Fetch: [${e.request.method}] ${e.request.url}`);
  e.respondWith(
    caches.match(e.request)
    // .then(() => console.log("  - From Cache: ", e.request))
    // .catch(() => {
    //   fetch(e.request)
    //     .then(() => console.log("  - From Server", e.request))
    //     .catch((e) => console.error("  - FAILED: ", e.request));
    // })
  );
});

console.log(`%cCODE RUNNING ${CACHE_NAME}`, "font-size: 20pt; color: hotpink");
