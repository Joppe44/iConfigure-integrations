/** @format */

let holder = document.getElementById("iConfigure");
const iframe = document.createElement("iframe");
iframe.style = "border:none;";
iframe.src = "https://configurator.iconfigure.io/?product=b816a048-64af-418e-9216-6b3f6c3d5768";
const header = document.querySelectorAll("header")[0];
holder.appendChild(iframe);

iframe.style.width = "100vw";
iframe.style.position = "fixed";
iframe.style.left = "0";

let currentHeaderHeight = null;
let updateScheduled = false;

function updateHeight() {
    updateScheduled = false;
    const rect = header.getBoundingClientRect();
    const headerHeight = Math.round(rect.height + rect.top);
    if (headerHeight === currentHeaderHeight) return;
    currentHeaderHeight = headerHeight;
    iframe.style.top = headerHeight + "px";
    iframe.style.height = `calc(100svh - ${headerHeight}px)`;
}

function scheduleUpdate() {
    if (updateScheduled) return;
    updateScheduled = true;
    requestAnimationFrame(updateHeight);
}

updateHeight();
window.addEventListener("scroll", scheduleUpdate, { passive: true });
window.addEventListener("resize", scheduleUpdate);
new ResizeObserver(scheduleUpdate).observe(header);
