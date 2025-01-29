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
// utm_source=facebook&utm_medium=cpc&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&utm_term={{adset.name}}
// fbclid=IwY2xjawHzRMhleHRuA2FlbQIxMAABHQ7EuVdmsl3uVH3Djjy-hVQPMUZ5_cc8i0ru8tIVIIsDLq2B0fDi7UmDXQ_aem_a5fBT4Setf1u2sYHqMZCsg
const utm_source = window.location.search.includes("utm_source") ? window.location.search.split("utm_source=")[1].split("&")[0] : "null";
const utm_medium = window.location.search.includes("utm_medium") ? window.location.search.split("utm_medium=")[1].split("&")[0] : "null";
const utm_campaign = window.location.search.includes("utm_campaign") ? window.location.search.split("utm_campaign=")[1].split("&")[0] : "null";
const utm_content = window.location.search.includes("utm_content") ? window.location.search.split("utm_content=")[1].split("&")[0] : "null";
const utm_term = window.location.search.includes("utm_term") ? window.location.search.split("utm_term=")[1].split("&")[0] : "null";
const fbclid = window.location.search.includes("fbclid") ? window.location.search.split("fbclid=")[1].split("&")[0] : "null";

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
    utm_source: utm_source,
    utm_medium: utm_medium,
    utm_campaign: utm_campaign,
    utm_content: utm_content,
    utm_term: utm_term,
    fbclid: fbclid,
};
injectApp(preConfig);
