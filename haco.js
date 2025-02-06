
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
        topmatras: "topmatras_geen",
        stoftype: "leatherlook",
        stofgroep: "dicsover_me",
        stof: "dicsover_me_09",
        hoofdbord: "hoofdbord_stresa",
        voetenbord: "voetenbord_geen",
        active_step: "3",
    };

    injectApp(preConfig);
};
document.head.appendChild(script);

