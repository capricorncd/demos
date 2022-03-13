/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/13 12:17:42 (GMT+0900)
 *
 * performance
 */

window.addEventListener("load", function () {
  setTimeout(function () {
    const performance = window.performance;
    if (performance) {
      let t = performance.getEntriesByType("navigation")[0]
      let navigationStart = 0
      if (!t) {
        t = performance.timing
        navigationStart = t.navigationStart
      }

      const n = [
        {
          key: "Redirect",
          desc: "Time-consuming to redirect",
          value: t.redirectEnd - t.redirectStart
        },
        {
          key: "AppCache",
          desc: "Time-consuming to check local cache",
          value: t.domainLookupStart - t.fetchStart
        },
        {
          key: "DNS",
          desc: "Time-consuming DNS lookup",
          value: t.domainLookupEnd - t.domainLookupStart
        },
        {
          key: "TCP",
          desc: "Time-consuming TCP connection",
          value: t.connectEnd - t.connectStart
        }, {
          key: "Waiting(TTFB)",
          desc: "The time-consuming from when the client initiates the request to when the response is received / Time To First Byte",
          value: t.responseStart - t.requestStart
        },
        {
          key: "Content Download",
          desc: "The time to download the data returned by the server",
          value: t.responseEnd - t.responseStart
        },
        {
          key: "HTTP Total Time",
          desc: "Total time spent on http requests",
          value: t.responseEnd - t.requestStart
        },
        {
          key: "DOMContentLoaded",
          desc: "time when the dom is loaded",
          value: t.domContentLoadedEventEnd - navigationStart
        },
        {
          key: "Loaded",
          desc: "The total time taken to load the page",
          value: t.loadEventEnd - navigationStart
        }
      ];

      if (Math.random() > .75) {
        const location = window.location
        const href = location.href
        const pathname = location.pathname
        const userAgent = navigator.userAgent
        const url = href.split("?")[0]
        console.log(location, href, pathname, userAgent, url)
        // o.a.post("https://api.xxx.com", {
        //   app: "shakespeare-performance",
        //   url: url,
        //   ua: userAgent,
        //   path: pathname,
        //   stats_ttfb: t.responseStart - t.requestStart,
        //   stats_domLoaded: t.domContentLoadedEventEnd - navigationStart,
        //   stats_loaded: t.loadEventEnd - navigationStart
        // }).then(a.a).catch(a.a)
      }
      console && console.log && console.log(n)
    }
  }, 0)
})
