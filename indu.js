/** @format */
const a = document.createElement("a");
a.id = "homebtn";
a.innerHTML = "terug";
a.href="/"

document.body.appendChild(a);

// Create and append the configuration target div to the body
const configurationTargetDiv = document.createElement("div");

configurationTargetDiv.id = "configurationTarget";
document.body.appendChild(configurationTargetDiv);

// Create and append the style block to the body
const styleElement = document.createElement("style");
styleElement.innerHTML = `
    .configurator-frame {
    height: calc(100vh - 115px) !important;
    width: 100vw !important;
    scrollbar-width: none;
    overflow-y: hidden;
    position: fixed;
    left: 0;
    top: 115px;
    right: 0;
    bottom: 0px;
    z-index: 1003;
}
/* Media query for mobile devices */
@media only screen and (max-width: 768px) {
    .configurator-frame {
        height: 100 !important;

        top: 0px;
        bottom: 115px;
    }
    #homebtn {
        z-index: 1005 !important;
        opacity: 1 !important;
    }
}

#homebtn {
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    margin: 12px;
    z-index: 1000;
    background-color: #a88669;
    border-radius: 28px;
    border: 1px solid #a88669;
    display: inline-block;
    cursor: pointer;
    color: #ffffff;
    padding: 4px 12px;
    font-weight: 100;

    text-decoration: none;
    text-shadow: 0px 1px 0px #a88669;

}
#homebtn:hover {
    background-color: #000000;
}

`;
document.body.appendChild(styleElement);
const cf = document.createElement("iframe");
const p = {
    product: "029bc7cc-e1a0-4b90-82e4-9cc1190d4643",
    aantal_deuren: "1_deur",
    type: "type_taats",
    hoogte_sparing: "224.7",
    breedte_sparing: "87.8",
    model: "rome",
    kleur: "eiken_behandeld",
    kleur_glas: "glas_helder",
    greep_taats: "breda",
    draairichting: "lbi",
    greep_verkropt: "ja",
    maat_greep: "35cm",
    montage: "laten_monteren",
    active_step: "1",
};
const qs = new URLSearchParams(p).toString();
cf.src = `https://web.iconfigure.nl/indu.html?${qs}`;
cf.classList.add("configurator-frame");
configurationTargetDiv.appendChild(cf);
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
    if (event.origin !== "https://web.iconfigure.nl") {
        console.warn(`Wrong origin: '${event.origin}', not handling message.`, event);
        return;
    }
    const iframeThanksPageUrl = "https://www.indudoors.nl/bedankt-voor-uw-offerte";
    if (event.data.state === "finished") {
        window.location.href = iframeThanksPageUrl;
    }
});
