/** @format */

window.addEventListener("DOMContentLoaded", function () {
    for (const i of [".header__inline-menu", ".call-button", ".topbar", "footer"]) {
        document.querySelector(i).remove();
    }
    var mainContent = document.getElementById("MainContent");
    mainContent.innerHTML = `<div style="padding: 10vw 10vw 4vw;"><h1>Welkom bij onze configurator</h1><p>Bij Kastenland geloven we in de kracht van ambachtelijk vakwerk en persoonlijke smaak. Jij bepaalt het ontwerp, wij brengen het tot leven.<hr></p></div>`;
    var div = document.createElement("div");
    div.id = "iConfigure";
    div.style.position = "sticky";
    div.style.height = "calc(100dvh)";
    div.style.width = "100vw";
    div.style.zIndex = "1023";
    div.style.pointerEvents = "auto";
    div.style.top = "0";
    mainContent.appendChild(div);

    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.media = "all";
    link.href = "https://web.iconfigure.nl/inject/style.css";
    document.head.appendChild(link);

    var script = document.createElement("script");
    script.src = "https://web.iconfigure.nl/inject/inject.iife.js";
    script.crossOrigin = "anonymous";
    script.onload = function () {
        let preConfig = {
            product: "3139b1fc-842f-4742-9130-17272cc60fd3",
        };

        let toparse = ["hoogte", "breedte", "diepte"];
        let params = new URLSearchParams(document.location.search);
        for (const p of toparse) {
            let val = params.get(p);
            if (val) preConfig[p] = val;
        }

        injectApp(preConfig);
    };

    document.head.appendChild(script);
});
