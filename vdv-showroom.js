/** @format */

(function () {
  var scriptEl = document.currentScript;

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
      // Place the showroom where the embed snippet sits so the page content
      // above it stays in the normal flow and scrolls into the takeover.
      var anchor = scriptEl && scriptEl.parentElement;
      if (anchor) {
        anchor.appendChild(target);
      } else {
        var container =
          document.querySelector('[data-elementor-type="wp-page"]') ||
          document.body;
        container.appendChild(target);
      }
    }
    target.setAttribute(
      "style",
      "background-color:#ffffff;height:100dvh !important;margin-bottom:-100vh;pointer-events:auto;position:sticky;scroll-behavior:auto;top:0;width:100vw !important;z-index:100000;",
    );

    var spacer = document.getElementById("iConfigureSpacer");
    if (!spacer) {
      spacer = document.createElement("div");
      spacer.id = "iConfigureSpacer";
      target.insertAdjacentElement("afterend", spacer);
    }
    spacer.setAttribute("style", "height:140vh;background:transparent;");

    var css = document.createElement("style");
    css.textContent =
      "#iConfigure.icf-locked { pointer-events: auto !important; }" +
      "#iConfigure.icf-locked * { pointer-events: none !important; }" +
      // An Elementor sticky header would float over the takeover; hide it only
      // while the showroom is stuck instead of removing it from the page.
      "body.icf-stuck [data-elementor-type='header'] { display: none !important; }";
    document.head.appendChild(css);

    function updateStuckState() {
      var stuck =
        target.getBoundingClientRect().top <= window.innerHeight * 0.05;
      target.classList.toggle("icf-locked", !stuck);
      document.body.classList.toggle("icf-stuck", stuck);
    }
    updateStuckState();
    window.addEventListener("scroll", updateStuckState, { passive: true });
    window.addEventListener("resize", updateStuckState, { passive: true });

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

    var src = new URL("https://store.iconfigure.dev/");
    src.searchParams.set("showroom", "f68b0e03-3ef1-42b9-a83e-1f34b8b054d2");
    var params = new URLSearchParams(document.location.search);
    for (const [key, val] of params) {
      if (val && key !== "showroom") src.searchParams.set(key, val);
    }

    var iframe = document.createElement("iframe");
    iframe.src = src.toString();
    iframe.setAttribute("style", "border:none;height:100%;width:100%;");
    iframe.setAttribute("allow", "fullscreen");
    target.appendChild(iframe);

    const removeList = [
      '[data-elementor-type="footer"]',
      "#bot-iframe",
      "#futy-container",
      "#axeptio_overlay > div",
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
            !item.contains(target) &&
            !item.contains(spacer),
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
