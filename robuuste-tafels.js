/** @format */

(function () {
    var target = document.getElementById("iConfigure");
    if (!target) {
        target = document.createElement("div");
        target.id = "iConfigure";
        var container = document.querySelector(".tm-page") || document.body;
        container.appendChild(target);
    }
    target.setAttribute(
        "style",
        "background-color:#ffffff;height:100dvh !important;margin-bottom:-100vh;pointer-events:auto;position:sticky;scroll-behavior:auto;top:0;width:100vw !important;"
    );

    var spacer = document.getElementById("iConfigureSpacer");
    if (!spacer) {
        spacer = document.createElement("div");
        spacer.id = "iConfigureSpacer";
        target.insertAdjacentElement("afterend", spacer);
    }
    spacer.setAttribute("style", "height:200vh;background:transparent;");

    function unlockStickyScrolling() {
        document.body.style.setProperty("overflow", "visible", "important");
        document.documentElement.style.setProperty("overflow-x", "hidden", "important");
    }
    unlockStickyScrolling();
    window.addEventListener("load", unlockStickyScrolling);

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
