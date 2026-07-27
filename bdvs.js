/** @format */

let holder = document.getElementById("iConfigure");
// holder.style =
//     "position: sticky; height: calc(100dvh); width: 100vw; z-index: 1023 !important; pointer-events: auto; margin-left: 0px;";
const iframe = document.createElement("iframe");
iframe.style = "border:none;";
iframe.src = "https://configurator.iconfigure.io/?product=b816a048-64af-418e-9216-6b3f6c3d5768";
const header = document.querySelectorAll("header")[0];
holder.appendChild(iframe);

iframe.style.width = "100vw";
iframe.style.position = "fixed";
iframe.style.left = "0";
function updateHeight() {
    let headerHeight = header.getBoundingClientRect().height + header.getBoundingClientRect().top;
    iframe.style.top = headerHeight + "px";

    iframe.style.height = `calc(100dvh - ${headerHeight}px)`;
    console.log(headerHeight);
}
updateHeight();
window.addEventListener("scroll", () => {
    updateHeight();
});

setInterval(updateHeight, 100);
