/** @format */

window.scrollBy(0, 100);

// Disable scrolling on the main document
document.body.style.overflow = "hidden";

// Create div holder and iframe
const holder = document.createElement("div");
const iframe = document.createElement("iframe");

// Set iframe source
iframe.src =
    "https://web.iconfigure.nl/?product=95ba6ceb-4779-4424-9104-59fbe594d5d8&type=type_taats&aantal_deuren=1_deur&plaatsing_panelen=paneel_beide&hoogte_sparing=201&breedte_sparing=260&verdeling_panelen=verdeling_gelijk&vlakverdeling=1v&frame_profiel=f_40mm&deur_profiel=40mm&kleur_glas=glas_helder&kleur_staal=staal_9005&structuur=structuur_structuur&handgreep=hondla&active_step=0";

// Set iframe styling for full-screen view
iframe.style.width = "100vw";
iframe.style.left = "0";
iframe.style.position = "fixed";
iframe.style.border = "none";
iframe.style.zIndex = "9999";
iframe.style.overflow = "auto"; // Ensure iframe content can scroll internally

// Set holder styling
holder.style.width = "100vw";
holder.style.height = "100vh";
holder.style.left = "0";
holder.style.top = "0";
holder.style.position = "fixed";
holder.style.backgroundColor = "#ffffff";
holder.style.zIndex = "5";
holder.style.pointerEvents = "none";

// Responsive behavior based on window width
if (window.innerWidth <= 768) {
    iframe.style.top = "90px";
    iframe.style.height = "calc(100vh - 205px)";
    iframe.style.bottom = "110px";
} else {
    iframe.style.top = "80px";
    iframe.style.height = "calc(100vh - 80px)";
    iframe.style.bottom = "0px";
}

// Append iframe to holder and holder to body

document.body.appendChild(iframe);

// Remove unwanted iframes after a delay
setTimeout(() => {
    var item = document.querySelector('iframe[title="Weply chat"]');
    console.log(item);
    if (item) item.remove();
    
    item = document.querySelector('iframe[title="reCAPTCHA"]');
    console.log(item);
    if (item) item.remove();
}, 100);
