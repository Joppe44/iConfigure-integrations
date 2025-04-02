/** @format */

function iConfigure(preConfig) {
    // Check if we're on the '/configurator' page
    // if (window.location.pathname === "/configurator") return;
    // Load the CSS file
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.media = "all";
    link.href = "https://web.iconfigure.nl/inject/style.css";
    document.head.appendChild(link);
    window.addEventListener("message", function (event) {
        const iframeThanksPageUrl = "https://staalo.nl/bedankt";
        if (event.data.state === "finished") {
            window.location.href = iframeThanksPageUrl;
        }
    });
    // Create the div with id 'iConfigure' and apply styles
    var div = document.createElement("div");
    div.id = "iConfigure";
    div.style.position = "sticky";
    div.style.height = "calc(100dvh)";
    div.style.width = "100vw";
    div.style.zIndex = "10000";
    div.style.pointerEvents = "auto";
    document.body.appendChild(div);

    // List of elements to remove
    const removeList = [
        ".grecaptcha-badge",

        "#trustbadge-container-98e3dadd90eb493088abdc5597a70810",
        'iframe[title="Weply chat"]',
        "footer",
    ];
    // "#CookiebotWidget",
    // Function to remove unwanted elements after a delay
    setTimeout(function () {
        for (const selector of removeList) {
            let items = document.querySelectorAll(selector);
            items.forEach((item) => item.remove());
        }
    }, 1500);

    // Load the JS file and execute the code after it's loaded
    var script = document.createElement("script");
    script.src = "https://web.iconfigure.nl/inject/inject.iife.js";
    script.crossOrigin = "anonymous";
    script.onload = function () {
        // Your configuration object

        // Initialize the application with your configuration
        injectApp(preConfig);
    };
    document.head.appendChild(script);
}

document.addEventListener("DOMContentLoaded", (event) => {
    if (window.location.pathname === "/configurator" || window.location.pathname === "/configurator/") {
        let preConfig = {
            dealer: "dffd2dd4-f7d6-410e-8c89-efa688c94045",

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
