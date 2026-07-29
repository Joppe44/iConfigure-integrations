/** @format */

(function () {
    var target = document.getElementById("iConfigure");
    if (!target) {
        target = document.createElement("div");
        target.id = "iConfigure";
        var container = document.getElementById("MainContent") || document.body;
        container.appendChild(target);
    }
    target.setAttribute(
        "style",
        "background-color:#ffffff;height:100dvh !important;margin-bottom:-100vh;pointer-events:auto;position:sticky;scroll-behavior:auto;top:0;width:100vw !important;z-index:1000;"
    );

    var intro = document.getElementById("iConfigureIntro");
    if (!intro) {
        intro = document.createElement("div");
        intro.id = "iConfigureIntro";
        intro.setAttribute("style", "padding:10vw 10vw 4vw;");
        target.insertAdjacentElement("beforebegin", intro);
    }

    var spacer = document.getElementById("iConfigureSpacer");
    if (!spacer) {
        spacer = document.createElement("div");
        spacer.id = "iConfigureSpacer";
        target.insertAdjacentElement("afterend", spacer);
    }
    spacer.setAttribute("style", "height:140vh;background:transparent;");

    var mobileCss = document.createElement("style");
    mobileCss.textContent =
        "#iConfigure.icf-locked, #iConfigure.icf-locked * { pointer-events: none !important; }" +
        "#iConfigure.icf-3d-locked iframe { pointer-events: none !important; }";
    document.head.appendChild(mobileCss);

    function updatePointerEvents() {
        var stuck = target.getBoundingClientRect().top <= window.innerHeight * 0.05;
        var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
        target.classList.toggle("icf-locked", !stuck);
        target.classList.toggle("icf-3d-locked", !atBottom);
    }
    updatePointerEvents();
    window.addEventListener("scroll", updatePointerEvents, { passive: true });

    function unlockStickyScrolling() {
        document.body.style.setProperty("overflow", "visible", "important");
        document.documentElement.style.setProperty("overflow-x", "hidden", "important");
    }
    unlockStickyScrolling();
    window.addEventListener("load", unlockStickyScrolling);

    var preConfig = {
        product: "c9018a98-f48b-407f-bd38-732b5acc0adc",
    };

    var toparse = ["breedte", "lengte", "hoogte", "diepte"];
    var params = new URLSearchParams(document.location.search);
    for (const p of toparse) {
        var val = params.get(p);
        if (val) preConfig[p] = val;
    }

    var s = document.createElement("script");
    s.src = "https://configurator.iconfigure.io/inject.iife.js";
    s.crossOrigin = "anonymous";
    s.onload = function () {
        window.injectApp(preConfig);
    };
    document.head.appendChild(s);

    const removeList = [".header__inline-menu", ".call-button", ".topbar", "footer"];

    var removedSelectors = new Set();
    var cnt = 0;
    var mxAttempts = 10;
    var iid = setInterval(function () {
        for (const selector of removeList) {
            let items = document.querySelectorAll(selector);
            items = [...items].filter(
                (item) =>
                    item !== target &&
                    item !== spacer &&
                    item !== intro &&
                    !item.contains(target) &&
                    !item.contains(spacer) &&
                    !item.contains(intro)
            );
            if (items.length > 0) {
                items.forEach((item) => item.remove());
                removedSelectors.add(selector);
            }
        }
        if (removedSelectors.size === removeList.length) {
            clearInterval(iid);
        }
        cnt++;
        if (cnt === mxAttempts) {
            clearInterval(iid);
        }
    }, 1000);
})();
