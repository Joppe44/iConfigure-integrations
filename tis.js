/** @format */

function iConfigure(preConfig) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.media = "all";
    link.href = "https://web.iconfigure.nl/inject/style.css";
    document.head.appendChild(link);

    window.addEventListener("message", (event) => {
        console.log(event);
    });
    var div = document.createElement("div");
    div.id = "iConfigure";
    div.style.position = "sticky";
    div.style.height = "calc(100dvh)";
    div.style.width = "100vw";
    div.style.zIndex = "10000";
    div.style.pointerEvents = "auto";
    document.body.appendChild(div);

    const removeList = [
        ".grecaptcha-badge",
        "#trustbadge-container-98e3dadd90eb493088abdc5597a70810",
        'iframe[title="Weply chat"]',
        "footer",
        'iframe[title="reCAPTCHA"]',
    ];

    setTimeout(function () {
        for (const selector of removeList) {
            let items = document.querySelectorAll(selector);
            items.forEach((item) => item.remove());
        }
    }, 1500);

    var script = document.createElement("script");
    script.src = "https://web.iconfigure.nl/inject/inject.iife.js";
    script.crossOrigin = "anonymous";
    script.onload = function () {
        injectApp(preConfig);
    };
    document.head.appendChild(script);
}

document.addEventListener("DOMContentLoaded", (event) => {
    if (window.location.pathname === "/configurator" || window.location.pathname === "/configurator/") {
        let preConfig = {
            product: "95ba6ceb-4779-4424-9104-59fbe594d5d8",
            type: "type_taats",
            aantal_deuren: "1_deur",
            plaatsing_panelen: "geen",
            breedte_deur_calc: "90",
            hoogte_sparing: "260",
            breedte_sparing: "90",
            vlakverdeling: "1v",
            frame_profiel: "f_40mm",
            deur_profiel: "30mm",
            kleur_glas: "glas_helder",
            kleur_staal: "staal_9005",
            structuur: "structuur_structuur",
            handgreep: "hondla",
            verzending: "afhalen",
            active_step: "0",
        };

        iConfigure(preConfig);
    } else {
        console.log("Not on the configurator page");
    }
});

window.addEventListener("message", function (event) {
    if (event.data.name === "quotation") {
        window.location.href = "https://thuisinstaal.nl/bedankt-voor-uw-aanvraag";
    } else if (event.data.name === "help") {
        window.location.href = "https://thuisinstaal.nl/stalen-deuren-showroom";
    }
});
