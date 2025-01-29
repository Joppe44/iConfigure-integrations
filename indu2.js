/** @format */

setTimeout(function () {
    const footerSticky = document.querySelector("#block-footersticky");
    if (footerSticky) {
        footerSticky.remove();
    }
    const footer = document.querySelector("footer");
    if (footer) {
        footer.remove();
    }
}, 50);
let cnt = 0;
const mxAttempts = 10;
const iid = setInterval(function () {
    const round = document.getElementById("CookiebotWidget");
    if (round) {
        round.remove();
        clearInterval(iid); // Stop interval once the element is removed
    }
    cnt++;
    if (cnt === mxAttempts) {
        clearInterval(iid); // Stop interval after 10 attempts
    }
}, 1000);
window.addEventListener("message", function (event) {
    const iframeThanksPageUrl = "https://www.indudoors.nl/bedankt-voor-uw-offerte";
    if (event.data.state === "finished") {
        window.location.href = iframeThanksPageUrl;
    }
});
let preConfig = {
    product: "029bc7cc-e1a0-4b90-82e4-9cc1190d4643",
    aantal_deuren: "1_deur",
    type: "type_taats",
    hoogte_sparing: "224.7",
    breedte_sparing: "80",
    breedte_deuren_ghost: "1",
    hoogte_deuren_ghost: "224.7",
    breedte_paneel_ghost: "500",
    draairichting: "lbi",
    m2: "0",
    model: "rome",
    materiaal: "eiken",
    kleur: "eiken_behandeld",
    kleur_glas: "glas_helder",
    greep_taats: "brielle",
    maat_greep: "35cm",
    montage: "laten_monteren",
    active_step: "0",
    gclid: localStorage._gclid ? localStorage._gclid : "null",
};
injectApp(preConfig);
