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
      var container = document.getElementById("MainContent") || document.body;
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
      intro.innerHTML =
        "<h1>Jouw kast, helemaal op maat</h1>" +
        "<p>Ontwerp stap voor stap een kast die past bij jouw ruimte, stijl en wensen. Kies de afmetingen, indeling en afwerking en bekijk direct het resultaat.</p><hr>";
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
      "#iConfigure.icf-locked, #iConfigure.icf-locked * { pointer-events: none !important; }";
    document.head.appendChild(mobileCss);

    function updatePointerEvents() {
      var stuck =
        target.getBoundingClientRect().top <= window.innerHeight * 0.05;
      target.classList.toggle("icf-locked", !stuck);
    }
    updatePointerEvents();
    window.addEventListener("scroll", updatePointerEvents, { passive: true });

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

    var src = new URL("https://configurator.iconfigure.dev/");
    src.searchParams.set("product", "c9018a98-f48b-407f-bd38-732b5acc0adc");
    var renames = {
      breedte: "kast_breedte",
      hoogte: "kast_hoogte",
      diepte: "kast_diepte",
      lengte: "kast_lengte",
    };
    var params = new URLSearchParams(document.location.search);
    for (const [key, val] of params) {
      if (val && key !== "product") src.searchParams.set(renames[key] || key, val);
    }

    var iframe = document.createElement("iframe");
    iframe.src = src.toString();
    iframe.setAttribute("style", "border:none;height:100%;width:100%;");
    target.appendChild(iframe);

    const removeList = [".mobile-bottom-menu", "footer"];

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
