/** @format */

(function () {
    var target = document.getElementById("iConfigure");
    if (!target) {
        target = document.createElement("div");
        target.id = "iConfigure";
        document.body.appendChild(target);
    }
    target.setAttribute(
        "style",
        "background-color:#ffffff;height:100dvh !important;pointer-events:none;position:sticky;scroll-behavior:auto;top:0;width:100vw !important;z-index:1000;"
    );

    var spacer = document.createElement("div");
    spacer.id = "iConfigureSpacer";
    spacer.setAttribute("style", "height:140vh;background:transparent;");
    target.insertAdjacentElement("afterend", spacer);

    function unlockStickyScrolling() {
        document.body.style.setProperty("overflow", "visible", "important");
        document.documentElement.style.setProperty("overflow-x", "hidden", "important");
    }
    unlockStickyScrolling();
    window.addEventListener("load", unlockStickyScrolling);

    function updatePointerEvents() {
        var stuck = target.getBoundingClientRect().top <= 1;
        target.style.pointerEvents = stuck ? "auto" : "none";
    }
    updatePointerEvents();
    window.addEventListener("scroll", updatePointerEvents, { passive: true });

    function bodyAtBottom() {
        return window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    }

    target.addEventListener("wheel", function (e) {
        if (!bodyAtBottom()) {
            e.preventDefault();
            e.stopPropagation();
            window.scrollBy(0, e.deltaY);
        }
    }, { capture: true, passive: false });

    var lastTouchY = null;
    target.addEventListener("touchstart", function (e) {
        lastTouchY = e.touches.length === 1 ? e.touches[0].clientY : null;
    }, { capture: true, passive: true });
    target.addEventListener("touchmove", function (e) {
        if (lastTouchY === null || e.touches.length !== 1) return;
        var y = e.touches[0].clientY;
        var delta = lastTouchY - y;
        lastTouchY = y;
        if (!bodyAtBottom()) {
            e.preventDefault();
            e.stopPropagation();
            window.scrollBy(0, delta);
        }
    }, { capture: true, passive: false });
    target.addEventListener("touchend", function () {
        lastTouchY = null;
    }, { capture: true, passive: true });

    var preConfig = {
        product: "9c870513-f27b-4ed3-a577-fc005d912739",
    };

    var s = document.createElement("script");
    s.src = "https://configurator.iconfigure.io/inject.iife.js";
    s.crossOrigin = "anonymous";
    s.onload = function () {
        window.injectApp(preConfig);
    };
    document.head.appendChild(s);

    const removeList = [
        "#builderwidget-4\\#20",
        "#builderwidget-4\\#19",
        "body > div.tm-page > div:nth-child(5)",
        "body > div.tm-page > div.uk-section-default.uk-section",
        "body > div.custom_chat_button.purechat-button-expand"
    ];

    var removedSelectors = new Set();
    var cnt = 0;
    var mxAttempts = 10;
    var iid = setInterval(function () {
        for (const selector of removeList) {
            let items = document.querySelectorAll(selector);
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
