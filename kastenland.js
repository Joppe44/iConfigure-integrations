/** @format */

console.log("iConfigure loaded from scripts.iconfigure.nl");
var baseUrl = "https://web.iconfigure.nl/?product=3139b1fc-842f-4742-9130-17272cc60fd3";

document.querySelector("footer").remove();
const holder = document.getElementById("MainContent");

let toparse = ["hoogte", "breedte", "diepte"];

function getIframeSRC() {
    let params = new URLSearchParams(document.location.search);
    for (const p of toparse) {
        let val = params.get(p);
        if (val) baseUrl = baseUrl + "&" + p + "=" + val;
    }
    console.log(baseUrl);
}

const iframe = document.createElement("iframe");

iframe.src = getIframeSRC();
holder.appendChild(iframe);
