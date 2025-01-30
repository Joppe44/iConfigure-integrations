// /** @format */

// setTimeout(function () {
//     const footerSticky = document.querySelector("#block-footersticky");
//     if (footerSticky) {
//         footerSticky.remove();
//     }
//     const footer = document.querySelector("footer");
//     if (footer) {
//         footer.remove();
//     }
// }, 50);
// let cnt = 0;
// const mxAttempts = 10;
// const iid = setInterval(function () {
//     const round = document.getElementById("CookiebotWidget");
//     if (round) {
//         round.remove();
//         clearInterval(iid); // Stop interval once the element is removed
//     }
//     cnt++;
//     if (cnt === mxAttempts) {
//         clearInterval(iid); // Stop interval after 10 attempts
//     }
// }, 1000);
window.addEventListener("message", function (event) {
    const iframeThanksPageUrl = "";
   
});

let preConfig = {
    product: "57aba837-0435-44a1-b6e5-cbda74b010ca",
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
