/** @format */

(function () {
  var mountPoint = document.currentScript;

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
      if (mountPoint && mountPoint.parentNode) {
        mountPoint.insertAdjacentElement("beforebegin", target);
      } else {
        var container = document.querySelector(".tm-page") || document.body;
        container.appendChild(target);
      }
    }
    target.setAttribute(
      "style",
      "background-color:#ffffff;display:block;height:min(775px, calc((100dvh - 120px) * 0.9));min-height:470px;position:relative;width:100%;",
    );

    var responsiveCss = document.createElement("style");
    responsiveCss.textContent =
      "@media (max-width: 900px) { #iConfigure { height: min(685px, calc((100dvh - 80px) * 0.9)) !important; } }";
    document.head.appendChild(responsiveCss);

    var src = new URL("https://configurator.iconfigure.io/");
    src.searchParams.set("product", "9c870513-f27b-4ed3-a577-fc005d912739");
    var params = new URLSearchParams(document.location.search);
    for (const [key, val] of params) {
      if (val && key !== "product") src.searchParams.set(key, val);
    }

    var iframe = document.createElement("iframe");
    iframe.src = src.toString();
    iframe.setAttribute("style", "border:none;display:block;height:100%;width:100%;");
    target.appendChild(iframe);
  }
})();
