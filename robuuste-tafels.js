/** @format */

(function () {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  function init() {
    var target = document.getElementById("iConfigure");
    if (!target) {
      target = document.createElement("div");
      target.id = "iConfigure";
      var container = document.querySelector(".tm-page") || document.body;
      container.appendChild(target);
    }
    target.setAttribute(
      "style",
      "background-color:#ffffff;height:100dvh !important;margin-bottom:-100vh;pointer-events:auto;position:sticky;scroll-behavior:auto;top:0;width:100vw !important;z-index:1000;",
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
      "@media (max-width: 900px) { span[class*='Teaser'], div[class*='Teaser'] { display: none !important; } }" +
      "#iConfigure.icf-locked { pointer-events: auto !important; }" +
      "#iConfigure.icf-locked * { pointer-events: none !important; }";
    document.head.appendChild(mobileCss);

    function updatePointerEvents() {
      var stuck =
        target.getBoundingClientRect().top <= window.innerHeight * 0.05;
      target.classList.toggle("icf-locked", !stuck);
    }
    updatePointerEvents();
    window.addEventListener("scroll", updatePointerEvents, { passive: true });

    target.addEventListener("click", function () {
      if (target.classList.contains("icf-locked")) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    function unlockStickyScrolling() {
      document.body.style.setProperty("overflow", "visible", "important");
      document.documentElement.style.setProperty(
        "overflow-x",
        "hidden",
        "important",
      );
    }
    unlockStickyScrolling();
    window.addEventListener("load", unlockStickyScrolling);

    var src = new URL("https://configurator.iconfigure.io/");
    src.searchParams.set("product", "9c870513-f27b-4ed3-a577-fc005d912739");
    var params = new URLSearchParams(document.location.search);
    for (const [key, val] of params) {
      if (val && key !== "product") src.searchParams.set(key, val);
    }

    var iframe = document.createElement("iframe");
    iframe.src = src.toString();
    iframe.setAttribute("style", "border:none;height:100%;width:100%;");
    target.appendChild(iframe);

    const removeList = [
      "#builderwidget-4\\#20",
      "#builderwidget-4\\#19",
      "body > div.tm-page > div:nth-child(5)",
      "body > div.tm-page > div.uk-section-default.uk-section",
      "body > div.custom_chat_button.purechat-button-expand",
    ];

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
            !item.contains(intro),
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
  }
})();
