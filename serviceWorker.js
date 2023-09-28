/// <reference lib="webworker" />

const CACHE_NAME = "#13";

const resources = [
  "index.html",
  "serviceWorkerRegister.js",
  "assets/background.jpeg",
  "assets/cross.png",
  "assets/crossChecked.png",
  "assets/crossUnchecked.png",
  "assets/fill.png",
  "assets/fillChecked.png",
  "assets/fillUnchecked.png",
  "assets/font.otf",
  "assets/gallery.png",
  "assets/index-20c11962.js",
  "assets/index-fb790112.css",
  "assets/solutions/01.png",
  "assets/solutions/06.png",
  "assets/solutions/11.png",
  "assets/solutions/16.png",
  "assets/solutions/21.png",
  "assets/solutions/26.png",
  "assets/solutions/31.png",
  "assets/solutions/36.png",
  "assets/solutions/41.png",
  "assets/solutions/46.png",
  "assets/solutions/02.png",
  "assets/solutions/07.png",
  "assets/solutions/12.png",
  "assets/solutions/17.png",
  "assets/solutions/22.png",
  "assets/solutions/27.png",
  "assets/solutions/32.png",
  "assets/solutions/37.png",
  "assets/solutions/42.png",
  "assets/solutions/47.png",
  "assets/solutions/03.png",
  "assets/solutions/08.png",
  "assets/solutions/13.png",
  "assets/solutions/18.png",
  "assets/solutions/23.png",
  "assets/solutions/28.png",
  "assets/solutions/33.png",
  "assets/solutions/38.png",
  "assets/solutions/43.png",
  "assets/solutions/48.png",
  "assets/solutions/04.png",
  "assets/solutions/09.png",
  "assets/solutions/14.png",
  "assets/solutions/19.png",
  "assets/solutions/24.png",
  "assets/solutions/29.png",
  "assets/solutions/34.png",
  "assets/solutions/39.png",
  "assets/solutions/44.png",
  "assets/solutions/49.png",
  "assets/solutions/05.png",
  "assets/solutions/10.png",
  "assets/solutions/15.png",
  "assets/solutions/20.png",
  "assets/solutions/25.png",
  "assets/solutions/30.png",
  "assets/solutions/35.png",
  "assets/solutions/40.png",
  "assets/solutions/45.png",
  "assets/solutions/50.png",
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
