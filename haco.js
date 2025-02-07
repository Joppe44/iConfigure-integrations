/** @format */

document.getElementById("maincontent").style.paddingBottom = "0px";
var div = document.getElementById("iConfigure");
div.id = "iConfigure";
div.style.position = "sticky";
div.style.height = "calc(100dvh)";
div.style.width = "100vw";
div.style.zIndex = "1023";
div.style.pointerEvents = "auto";
div.style.top = "0";
var link = document.createElement("link");
link.rel = "stylesheet";
link.media = "all";
link.href = "https://web.iconfigure.nl/inject/style.css";
document.head.appendChild(link);

// window.addEventListener("message", function (event) {
//     const iframeThanksPageUrl = "";
// });
var script = document.createElement("script");
script.src = "https://web.iconfigure.nl/inject/inject.iife.js";
script.crossOrigin = "anonymous";
script.onload = function () {
    let preConfig = {
        product: "a14f99fd-1daf-4542-b37d-3b11051d1470",
        grootte: "2p",
        lengte: "210",
        breedte: "180",
        type_box: "type_geveerd",
        dikte_box: "dikte_box_20",
        poten: "zwart_l_hout",
        type_matras: "medium_comfort",
        dikte_matras: "dikte_matras_20",
        aantal_matrassen: "2_matrassen",
        stoftype: "leatherlook",
        topmatras: "topmatras_geen",
        stofgroep: "dicsover_me",
        stof: "dicsover_me_09",
        hoofdbord: "hoofdbord_stresa",
        voetenbord: "voetenbord_geen",
        active_step: "3",
    };
    injectApp(preConfig);
};
window.addEventListener("DOMContentLoaded", function () {
    document.querySelector("footer").remove();
});
document.head.appendChild(script);
// create a css style to set all label margins to 0
var style = document.createElement("style");
style.innerHTML = `
   label {
    margin: 0;
    }
    input[type="radio"], input[type="checkbox"] {
        min-width: 0px !important;
        min-height: 0px !important;
        padding: 0 !important;
        margin-top: 0 !important;
    }
        input[type="text"], input[type="number"] {
height: 22.5px !important;
        }
   .icon:not(:has(img))::before {
        display: none !important;
   }
        
`;
document.head.appendChild(style);
