/** @format */

// Embed loader for Indu Doors — .nl (v1) configurator (swap-back target).
// Drupal body keeps the intro text + an empty mount div + this script:
//   <div id="iConfigure" style="..."></div>
//   <script src="https://scripts.iconfigure.nl/indu2.js"></script>
// (The div must live in the body markup; Drupal relocates <script> tags to
//  <head>, so the mount cannot be created relative to the script itself.)
// Reproduces the old live behavior: v1 loader + stylesheet + loose handler.
(function () {
    // Use the mount div from the page; create one as a last-resort fallback.
    var target = document.getElementById("iConfigure");
    if (!target) {
        target = document.createElement("div");
        target.id = "iConfigure";
        target.setAttribute(
            "style",
            "height:100dvh !important;margin-bottom:-100vh;pointer-events:auto;position:sticky;scroll-behavior:auto;top:0;width:100vw !important;"
        );
        document.body.appendChild(target);
    }

    // ?utm_source=ic_test_utm_source&utm_medium=ic_test_utm_medium&utm_campaign=ic_test_utm_campaign&utm_content=ic_test_utm_content&utm_term=ic_test_utm_term&fbclid=ic_test_fbclid
    var utm_source = window.location.search.includes("utm_source") ? window.location.search.split("utm_source=")[1].split("&")[0] : "null";
    var utm_medium = window.location.search.includes("utm_medium") ? window.location.search.split("utm_medium=")[1].split("&")[0] : "null";
    var utm_campaign = window.location.search.includes("utm_campaign") ? window.location.search.split("utm_campaign=")[1].split("&")[0] : "null";
    var utm_content = window.location.search.includes("utm_content") ? window.location.search.split("utm_content=")[1].split("&")[0] : "null";
    var utm_term = window.location.search.includes("utm_term") ? window.location.search.split("utm_term=")[1].split("&")[0] : "null";
    var fbclid = window.location.search.includes("fbclid") ? window.location.search.split("fbclid=")[1].split("&")[0] : "null";

    var preConfig = {
        product: "029bc7cc-e1a0-4b90-82e4-9cc1190d4643",
        aantal_deuren: "1_deur",
        type: "type_taats",
        hoogte_sparing: "224.7",
        breedte_sparing: "80",
        breedte_deuren_ghost: "1",
        hoogte_deuren_ghost: "224.7",
        breedte_paneel_ghost: "500",
        draairichting: "lbi",
        m2: "0",
        model: "rome",
        materiaal: "eiken",
        kleur: "eiken_behandeld",
        kleur_glas: "glas_helder",
        greep_taats: "brielle",
        maat_greep: "35cm",
        montage: "laten_monteren",
        active_step: "0",
        gclid: localStorage._gclid ? localStorage._gclid : "null",
        utm_source: utm_source,
        utm_medium: utm_medium,
        utm_campaign: utm_campaign,
        utm_content: utm_content,
        utm_term: utm_term,
        fbclid: fbclid,
    };

    // v1 does NOT inline CSS, so its stylesheet must be injected too.
    var css = document.createElement("link");
    css.rel = "stylesheet";
    css.media = "all";
    css.href = "https://web.iconfigure.nl/inject/style.css";
    document.head.appendChild(css);

    var s = document.createElement("script");
    s.src = "https://web.iconfigure.nl/inject/inject.iife.js";
    s.crossOrigin = "anonymous";
    s.onload = function () {
        window.injectApp(preConfig);
    };
    document.head.appendChild(s);

    setTimeout(function () {
        var footerSticky = document.querySelector("#block-footersticky");
        if (footerSticky) {
            footerSticky.remove();
        }
        var footer = document.querySelector("footer");
        if (footer) {
            footer.remove();
        }
    }, 50);
    var cnt = 0;
    var mxAttempts = 10;
    var iid = setInterval(function () {
        var round = document.getElementById("CookiebotWidget");
        if (round) {
            round.remove();
            clearInterval(iid);
        }
        cnt++;
        if (cnt === mxAttempts) {
            clearInterval(iid);
        }
    }, 1000);

    // Preserve the original loose v1 handler.
    window.addEventListener("message", function (event) {
        var iframeThanksPageUrl = "https://www.indudoors.nl/bedankt-voor-uw-offerte";
        if (event.data.state === "finished") {
            window.location.href = iframeThanksPageUrl;
        }
    });
})();
