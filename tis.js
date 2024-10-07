/** @format */
document.addEventListener("DOMContentLoaded", function () {
window.scrollBy(0, 100);
document.body.style.overflow = "hidden";

const iCiframe = document.createElement("iframe");
iCiframe.src =
    "https://web.iconfigure.nl/?product=95ba6ceb-4779-4424-9104-59fbe594d5d8&type=type_taats&aantal_deuren=1_deur&plaatsing_panelen=paneel_beide&hoogte_sparing=201&breedte_sparing=260&verdeling_panelen=verdeling_gelijk&vlakverdeling=1v&frame_profiel=f_40mm&deur_profiel=40mm&kleur_glas=glas_helder&kleur_staal=staal_9005&structuur=structuur_structuur&handgreep=hondla&active_step=0";
iCiframe.style.width = "100vw";
iCiframe.style.left = "0";
iCiframe.style.position = "fixed";
iCiframe.style.border = "none";
iCiframe.style.zIndex = "9999";

if (window.innerWidth <= 768) {
    iCiframe.style.top = "90px";
    iCiframe.style.height = "calc(100vh - 205px)";
    iCiframe.style.bottom = "110px";
} else {
    iCiframe.style.top = "80px";
    iCiframe.style.height = "calc(100vh - 80px)";
    iCiframe.style.bottom = "0px";
}
console.log(document.body);
document.body.appendChild(iCiframe);

setTimeout(() => {
    var item = document.querySelector('iframe[title="Weply chat"]');
    console.log(item);
    item.remove();
    item = document.querySelector('iframe[title="reCAPTCHA"]');
    console.log(item);
    item.remove();
}, 100);
});
function redirect(to) {
    const icLink = document.createElement("a");
    icLink.href = to;
    document.body.appendChild(icLink);
    icLink.click();
}
window.addEventListener("message", (event) => {
    console.log(event);
    if (event.data.name === "quotation") {
        redirect("/bedankt-voor-uw-aanvraag");
    } else if (event.data.name === "help") {
        redirect("/stalen-deuren-showroom");
    }
});
