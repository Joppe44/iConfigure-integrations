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
      var container =
        document.querySelector('[data-elementor-type="wp-page"]') ||
        document.body;
      container.appendChild(target);
    }
    target.setAttribute(
      "style",
      "background-color:#ffffff;height:100dvh;left:0;position:fixed;top:0;width:100vw;z-index:100000;",
    );

    var css = document.createElement("style");
    css.textContent =
      "html, body { overflow: hidden !important; height: 100dvh !important; }";
    document.head.appendChild(css);

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

    var removeList = [
      '[data-elementor-type="header"]',
      '[data-elementor-type="footer"]',
      '[data-elementor-type="wp-page"] > *',
      "body > *:not(script):not(style):not(#iConfigure)",
    ];

    var cnt = 0;
    var mxAttempts = 10;
    var iid = setInterval(function () {
      for (const selector of removeList) {
        let items = document.querySelectorAll(selector);
        items = [...items].filter(
          (item) => item !== target && !item.contains(target),
        );
        items.forEach((item) => item.remove());
      }
      cnt++;
      if (cnt === mxAttempts) {
        clearInterval(iid);
      }
    }, 1000);
  }
})();
