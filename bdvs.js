/** @format */

let holder = document.getElementById("iConfigure");
// holder.style =
//     "position: sticky; height: calc(100dvh); width: 100vw; z-index: 1023 !important; pointer-events: auto; margin-left: 0px;";
const iframe = document.createElement("iframe");
iframe.style = "border:none;";
iframe.src =
    "https://web.iconfigure.nl/?product=b816a048-64af-418e-9216-6b3f6c3d5768&type=pivot&door_amount=double&panels=both&distribution=equal&opening_width=245&opening_height=260&breedte_1_paneel=61.3&breedte_1_deur=61.3&door_design=hengelo&door_thickness=30mm&color_glas=smoke&color_coating=eigen_ralkleur&handle=trekstang_vierkant&inmeten=zelf_inmeten&vloerverwarming=wel_vloerverwarming&active_step=1&";
const header = document.querySelectorAll("header")[0];
holder.appendChild(iframe);

iframe.style.width = "100vw";
iframe.style.position = "fixed";
iframe.style.left = "0";
function updateHeight() {
    let headerHeight = header.getBoundingClientRect().height + header.getBoundingClientRect().top
    iframe.style.top = headerHeight + "px";

    iframe.style.height = `calc(100vh - ${headerHeight}px)`;
    console.log(headerHeight)
}
updateHeight();
window.addEventListener("scroll", () => {
    updateHeight();
});

setInterval(updateHeight, 100);