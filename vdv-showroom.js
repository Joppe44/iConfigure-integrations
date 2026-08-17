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
      document.body.appendChild(target);
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

    var lockCss = document.createElement("style");
    lockCss.textContent =
      "#iConfigure.icf-locked { pointer-events: auto !important; }" +
      "#iConfigure.icf-locked * { pointer-events: none !important; }";
    document.head.appendChild(lockCss);

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

    var src = new URL("https://store.iconfigure.io/");
    src.searchParams.set("showroom", "4bd9dd46-00a3-4634-9976-a7c2c3628eb5");
    var params = new URLSearchParams(document.location.search);
    for (const [key, val] of params) {
      if (val && key !== "showroom") src.searchParams.set(key, val);
    }

    var iframe = document.createElement("iframe");
    iframe.src = src.toString();
    iframe.setAttribute("style", "border:none;height:100%;width:100%;");
    iframe.setAttribute("allow", "fullscreen");
    target.appendChild(iframe);
  }
})();
