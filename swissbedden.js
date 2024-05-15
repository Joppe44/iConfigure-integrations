var configVisible = false;
console.log("iconfigure")
setTimeout(() => {
    var iframe = document.getElementById("iconfigure");
    console.log(iframe);
    if (iframe) {
        exec(iframe);
    } else {
        setTimeout(() => {
            iframe = document.getElementById("iconfigure");
            if (iframe) {
                exec(iframe);
            } else {
                setTimeout(() => {
                    iframe = document.getElementById("iconfigure");

                    if (iframe) {
                        exec(iframe);
                    } else {
                        setTimeout(() => {
                            iframe = document.getElementById("iconfigure");

                            if (iframe) {
                                exec(iframe);
                            } 
                        }, 200);
                
                    }
                }, 200);
        
            }
        }, 200);

    }
}, 200);

function exec(iframe) {
    var btn = document.querySelector(".new-order-btn");
    console.log(btn);
    if (btn === null) {
        btn = document.querySelector("#content-bp > form > div > div > div > div.form-product > p.submit > button")
        if (btn === null) {
            btn = document.querySelector(".link-cart.woo")
            if (btn === null) {
                btn = document.querySelector("#content-bp > form > div > div > div > div.form-product > p.submit > button")
            }   
        }   
    }
    console.log(btn);
    // clone element and remove submit
    var clone = btn.cloneNode(true);

    // add new button
    clone.removeAttribute("type");
    clone.style = "background-color: #000000; margin-top: 10px;";
    clone.innerHTML = "Bekijk in 3D";
    console.log(clone);
    let par = btn.parentNode;
    par.style = "display: flex; justify-content: space-between; flex-direction: column; ";
    iframe.style =
        "display: none; width: 100%; height: calc(100vh - 60px); position: fixed; top: 60px; left: 0; z-index: 1000000";
    document.querySelector("#root").style.display = "none; !important";
    // move  iframe to the end of the body
    document.body.appendChild(iframe);
    par.appendChild(clone);
    let rootHider = document.createElement("div");
    rootHider.style.display = "none";
    let root = document.querySelector("#root");
    let header = document.createElement("header");
    header.style =
        "display:none; flex-direction: row-reverse; position: fixed; top: 0; left: 0; width: 100%; height: 60px; background-color: #000000; z-index: 2000;  ";

    var close = document.createElement("a");
    close.classList.add = "new-orderclose btn";
    // header.appendChild(close);
    header.innerHTML = `<a id="closeConfiguration" class="new-orderclose btn" style="margin: 12px !important"></a>`;
    document.body.appendChild(header);
    clone.addEventListener("click", () => {
        updateVisibility(iframe, rootHider, root, header);
    });
    document.querySelector("#closeConfiguration").addEventListener("click", () => {
        updateVisibility(iframe, rootHider, root, header);
    });

    function updateVisibility(iframe, rootHider, root, header) {
        if (!configVisible) {
            iframe.style =
                "display: block; width: 100%; height: calc(100vh - 60px); position: fixed; top: 60px; left: 0; z-index: 1000000";
            rootHider.appendChild(root);
            header.style.display = "flex";
            configVisible = true;
        } else {
            iframe.style =
                "display: none; width: 100%; height: calc(100vh - 60px); position: fixed; top: 60px; left: 0; z-index: 1000000";
            configVisible = false;
            document.body.insertBefore(root, document.body.firstChild);
            header.style.display = "none";
        }
    }

    window.addEventListener("message", (event) => {
        console.log(event.data);
        // check if event has property called URLparameters
        if (!event.data.hasOwnProperty("URLparameters")) {
            return;
        }
        sendDataToShop(event);
    });

    if (window.location.href === 'https://www.swissbedden.nl/2-persoons-boxspring-samenstelling.html' || window.location.href === 'https://www.swissbedden.nl/1-persoons-boxspring-samenstelling.html'){

        updateVisibility(iframe, rootHider, root, header)
    }
}

function sendDataToShop(event) {
    var url = "https://www.swissbedden.nl/cart/add/292070749/?quantity=1";
    var items = {};
    for (let key of Object.keys(event.data.items)) {
        let item = event.data.items[key];
        items[event.data.items[key].ID] = item;
        if (
            item.ID === "lengte" ||
            item.ID === "breedte_2p" ||
            item.ID === "breedte_1p" ||
            item.ID === "breedte_basel" ||
            item.ID === "topmatras"
        ) {
            continue;
        }
        url = url + values[item.subID] + "+";
    }
    console.log(items);

    // MATEN
    if (items.model.subID === "model_basel") {
        url = url + values[`basel${items.breedte_basel.value}x200`] + "+";
    } else if (items.grootte.subID === "1p") {
        let num = parseFloat(items.breedte_1p.subID.replace(/[^0-9.]/g, ""));
        url = url + values[`maat${num}x${items.lengte.value}`] + "+";
    } else if (items.grootte.subID === "2p") {
        url = url + values[`maat${items.breedte_2p.value}x${items.lengte.value}`] + "+";
    }

    // TOPMATRAS
    if (items.topmatras.subID === "topmatras_ks6") {
        if (
            items.model.subID === "model_chesterfield" ||
            items.model.subID === "model_chesterfield_met_voetenbord" ||
            items.model.subID === "model_boxspring_arosa_velvet" ||
            items.model.subID === "model_davos" ||
            items.model.subID === "model_davos_met_voetenbord" ||
            items.model.subID === "model_swiss" ||
            items.model.subID === "model_swiss_met_voetenbord" ||
            items.model.subID === "model_lavaux" ||
            items.model.subID === "model_boxspring_boucle" ||
            items.model.subID === "modern_luzern"
        ) {
            url = url + values.topmatras_ks6_gratis + "+";
        } else {
            url = url + values.topmatras_ks6 + "+";
        }
    } else {
        url = url + values[items.topmatras.subID] + "+";
    }

    console.log(url);
    var a = document.createElement("a");
    a.href = url;
    document.body.appendChild(a);
    a.click();
}

function removeLinksByText(text) {
    const links = Array.from(document.querySelectorAll("a"));
    const filteredLinks = links.filter((link) => link.textContent.trim() === text);

    filteredLinks.forEach((link) => {
        link.classList.add("removed");
        link.removeAttribute("href");
        const ulElement = link.parentElement.parentElement.nextSibling.nextSibling;
        console.log(ulElement);
        const liElements = Array.from(ulElement.querySelectorAll("li"));

        liElements.forEach((li) => {
            li.innerHTML = li.innerHTML.split('(+')[0].trim();
            // Your logic for each li element goes here
        });
    });
    const styleElement = document.createElement("style");
    styleElement.textContent = `
    a.removed {
      cursor: default !important;
    }

    a.removed:hover {
      text-decoration: none !important;
    }
  `;

    document.head.appendChild(styleElement);

    return filteredLinks.length > 0;
}
setTimeout(() => {
    // Usage example:
    removeLinksByText("Samenstelling");
}, 200);

const values = {
    model_alle_opties:"&",
    model_1persoons_opberg_boxspring_lenk: "&custom%5B8146472%5D=70264314",
    model_opbergboxspring_chur: "&custom%5B8146472%5D=70264315",
    model_1persoons_brienz: "&custom%5B8146472%5D=70264316",
    model_boxspring_st_moritz_met_tv_lift: "&custom%5B8146472%5D=70264317",
    voetenbord_tv: "&custom%5B8146472%5D=70264318",
    model_boxspring_geneve: "&custom%5B8146472%5D=70264319",
    model_swiss: "&custom%5B8146472%5D=70264320",
    model_davos: "&custom%5B8146472%5D=70264321",
    model_chesterfield: "&custom%5B8146472%5D=70264322",
    modern_luzern: "&custom%5B8146472%5D=70264323",
    model_basel: "&custom%5B8146472%5D=70264324",
    model_opbergboxspring_thun_velvet: "&custom%5B8146472%5D=70264325",
    model_davos_met_voetenbord: "&custom%5B8146472%5D=70264326",
    model_kinderboxspring_xl: "&custom%5B8146472%5D=70264327",
    model_boxspring_vevey: "&custom%5B8146472%5D=70264328",
    model_1persoons_boxspring_verbier: "&custom%5B8146472%5D=70264329",
    model_elektrische_boxspring_chesterfield_met_voetenbord: "&custom%5B8146472%5D=70264330",
    model_boxspring_lausanne: "&custom%5B8146472%5D=70264331",
    model_elektrische_boxspring_chesterfield: "&custom%5B8146472%5D=70264332",
    model_boxspring_lugano: "&custom%5B8146472%5D=70264333",
    model_boxspring_arosa_velvet: "&custom%5B8146472%5D=70264334",
    model_chesterfield_met_voetenbord: "&custom%5B8146472%5D=70264335",
    model_swiss_met_voetenbord: "&custom%5B8146472%5D=70264336",
    model_boxspring_ascona: "&custom%5B8146472%5D=70264337",
    model_kinderboxspring: "&custom%5B8146472%5D=70264338",
    model_boxspring_teddy: "&custom%5B8146472%5D=70264339",
    model_boxspring_boucle: "&custom%5B8146472%5D=70264340",
    model_lavaux: "&custom%5B8146472%5D=70264341",
    model_montreux: "&custom%5B8146472%5D=70264342",
    "2_matrassen": "&custom%5B8146489%5D=70264399",
    "1_matras": "&custom%5B8146489%5D=70264400",
    voetenbord_geen: "&custom%5B8146195%5D=70263434",
    voetenbord_met_stiknaad_lausanne: "&custom%5B8146195%5D=70263435",
    voetenbord_vlak_met_stiknaad_montreux: "&custom%5B8146195%5D=70263436",
    voetenbord_golvend_swiss: "&custom%5B8146195%5D=70263437",
    voetenbord_gestikt_chesterfield: "&custom%5B8146195%5D=70263438",
    voetenbord_3_vlakken_verticaal: "&custom%5B8146195%5D=70263439",
    voetenbord_3_vlakken_horizontaal: "&custom%5B8146195%5D=70263440",
    voetenbord_geknoopt: "&custom%5B8146195%5D=70263441",
    voetenbord_12_vlakken: "&custom%5B8146195%5D=70263442",
    voetenbord_10_vlakken: "&custom%5B8146195%5D=70263443",
    voetenbord_8_vlakken: "&custom%5B8146195%5D=70263444",
    voetenbord_4_vlakken: "&custom%5B8146195%5D=70263445",
    voetenbord_vlak: "&custom%5B8146195%5D=70263446",
    voetenbord_tv: "&custom%5B8146195%5D=70264281",
    hoofdbord_met_stiknaad_lausanne: "&custom%5B8146169%5D=70263322",
    hoofdbord_vlak_met_stiknaad_montreux: "&custom%5B8146169%5D=70263323",
    hoofdbord_met_bies_luzern: "&custom%5B8146169%5D=70263324",
    hoofdbord_vlak_45_cm_uitstekend_lavaux: "&custom%5B8146169%5D=70263325",
    hoofdbord_vlak_30_cm_uistekend: "&custom%5B8146169%5D=70263326",
    hoofdbord_vlak_20_cm_uitskened: "&custom%5B8146169%5D=70263327",
    hoofdbord_vlak_10_cm_uitstekend: "&custom%5B8146169%5D=70263328",
    hoofdbord_golvend_swiss: "&custom%5B8146169%5D=70263329",
    hoofdbord_gestikt_chesterfield: "&custom%5B8146169%5D=70263330",
    hoofdbord_3_vlakken_verticaal: "&custom%5B8146169%5D=70263331",
    hoofdbord_3_vlakken_horizontaal: "&custom%5B8146169%5D=70263332",
    hoofdbord_geknoopt: "&custom%5B8146169%5D=70263333",
    hoofdbord_12_vlakken: "&custom%5B8146169%5D=70263334",
    hoofdbord_10_vlakken: "&custom%5B8146169%5D=70263335",
    hoofdbord_8_vlakken: "&custom%5B8146169%5D=70263336",
    hoofdbord_4_vlakken: "&custom%5B8146169%5D=70263337",
    hoofdbord_vlak: "&custom%5B8146169%5D=70263338",
    hoofdbord_vlak_met_bies: "&custom%5B8146169%5D=70263348",
    hoofdbord_geen: "&custom%5B8146169%5D=70263347",
    hoofdbord_geen_standaard: "&custom%5B8146169%5D=70263369",
    open_hoekpoot: "&custom%5B8146167%5D=70263310",
    zwart_afgebogen: "&custom%5B8146167%5D=70263311",
    chrome_u: "&custom%5B8146167%5D=70263312",
    zwart_u: "&custom%5B8146167%5D=70263313",
    zilver_vierkant: "&custom%5B8146167%5D=70263314",
    zwart_rond: "&custom%5B8146167%5D=70263315",
    zwart_l_hout: "&custom%5B8146167%5D=70263316",
    chroom_set_zwart: "&custom%5B8146167%5D=70263317",
    chroom_set: "&custom%5B8146167%5D=70263318",
    zilver_l_kunststof: "&custom%5B8146167%5D=70263319",
    zwart_l_kunststof: "&custom%5B8146167%5D=70263320",
    taps_toelopend_chroom: "&custom%5B8146167%5D=70263372",
    taps_toelopend_zwart: "&custom%5B8146167%5D=70263374",
    leatherlook_wit: "&custom%5B8146135%5D=70263139",
    leatherlook_zwart: "&custom%5B8146135%5D=70263140",
    torre_9_donkergoud: "&custom%5B8146135%5D=70263141",
    torre_7_kastanje: "&custom%5B8146135%5D=70263142",
    torre_2_ecru: "&custom%5B8146135%5D=70263143",
    torre_4_zand: "&custom%5B8146135%5D=70263144",
    icon_79_blauw: "&custom%5B8146135%5D=70263145",
    icon_06_zand: "&custom%5B8146135%5D=70263146",
    icon_02_creme: "&custom%5B8146135%5D=70263147",
    icon_56_bruin: "&custom%5B8146135%5D=70263148",
    icon_99_zwart: "&custom%5B8146135%5D=70263149",
    icon_95_donkergrijs: "&custom%5B8146135%5D=70263150",
    icon_81_grijs: "&custom%5B8146135%5D=70263151",
    terra_99_zwart: "&custom%5B8146135%5D=70263152",
    terra_79_donkerblauw: "&custom%5B8146135%5D=70263153",
    terra_63_oudroze: "&custom%5B8146135%5D=70263154",
    terra_39_donkergroen: "&custom%5B8146135%5D=70263155",
    terra_33_agaatgroen: "&custom%5B8146135%5D=70263156",
    terra_28_antraciet: "&custom%5B8146135%5D=70263157",
    terra_13_zand: "&custom%5B8146135%5D=70263158",
    terra_06_lichtgrijs: "&custom%5B8146135%5D=70263159",
    velvet_mosgroen_38: "&custom%5B8146135%5D=70263160",
    velvet_creme_04: "&custom%5B8146135%5D=70263161",
    velvet_grijs_92: "&custom%5B8146135%5D=70263162",
    velvet_donkerblauw_79: "&custom%5B8146135%5D=70263163",
    velvet_taupe_15: "&custom%5B8146135%5D=70263164",
    velvet_antraciet_95: "&custom%5B8146135%5D=70263165",
    now_or_never_18_bruin: "&custom%5B8146135%5D=70263166",
    now_or_never_3_creme: "&custom%5B8146135%5D=70263167",
    grace_11_creme: "&custom%5B8146135%5D=70263168",
    grace_38_donkergrijs: "&custom%5B8146135%5D=70263169",
    grace_94_antraciet: "&custom%5B8146135%5D=70263170",
    grace_70_grijs: "&custom%5B8146135%5D=70263171",
    grace_99_zwart: "&custom%5B8146135%5D=70263172",
    grace_01_wit: "&custom%5B8146135%5D=70263173",
    malmo_83_lichtgrijs: "&custom%5B8146135%5D=70263174",
    malmo_41_okergeel: "&custom%5B8146135%5D=70263175",
    malmo_37_donkergroen: "&custom%5B8146135%5D=70263176",
    malmo_05_creme: "&custom%5B8146135%5D=70263177",
    malmo_95_donkergrijs: "&custom%5B8146135%5D=70263178",
    malmo_96_antraciet: "&custom%5B8146135%5D=70263179",
    riviera_34_mintgroen: "&custom%5B8146135%5D=70263180",
    riviera_38_donkergroen: "&custom%5B8146135%5D=70263181",
    riviera_21_creme: "&custom%5B8146135%5D=70263182",
    riviera_87_petrol: "&custom%5B8146135%5D=70263183",
    riviera_100_zwart: "&custom%5B8146135%5D=70263184",
    riviera_95_donkergrijs: "&custom%5B8146135%5D=70263185",
    riviera_91_grijs: "&custom%5B8146135%5D=70263186",
    preston_100_zwart: "&custom%5B8146135%5D=70263187",
    preston_21_zand: "&custom%5B8146135%5D=70263188",
    preston_96_antraciet: "&custom%5B8146135%5D=70263189",
    preston_32_grijs: "&custom%5B8146135%5D=70263190",
    preston_24_cognac: "&custom%5B8146135%5D=70263191",
    inari_blauw: "&custom%5B8146135%5D=70263192",
    inari_roze: "&custom%5B8146135%5D=70263193",
    inari_olijfgroen: "&custom%5B8146135%5D=70263194",
    inari_hemelsblauw: "&custom%5B8146135%5D=70263195",
    inari_antraciet: "&custom%5B8146135%5D=70263196",
    inari_creme: "&custom%5B8146135%5D=70263197",
    inari_grijs: "&custom%5B8146135%5D=70263198",
    inari_zwart: "&custom%5B8146135%5D=70263199",
    type_opberg: "&custom%5B8146143%5D=70263220",
    type_elektrisch: "&custom%5B8146143%5D=70263221",
    type_geveerd: "&custom%5B8146143%5D=70263222",
    type_comfort: "&custom%5B8146143%5D=70263223",
    dikte_matras_30: "&custom%5B8146141%5D=70263216",
    dikte_matras_20: "&custom%5B8146141%5D=70263216",
    dikte_matras_25: "&custom%5B8146141%5D=70264421",
    dikte_box_30: "&custom%5B8146138%5D=70263203",
    dikte_box_20: "&custom%5B8146138%5D=70263202",
    elektrisch_bedraad: "&custom%5B8146190%5D=70263421",
    elektrisch_draadloos: "&custom%5B8146190%5D=70263422",
    montage: "&custom%5B8146190%5D=70263423",
    montage_elektrisch: "&custom%5B8146190%5D=70263424",
    topmatras_csks10: "&custom%5B8146164%5D=70263286",
    topmatras_csts10: "&custom%5B8146164%5D=70263287",
    topmatras_ts9: "&custom%5B8146164%5D=70263288",
    topmatras_ts6: "&custom%5B8146164%5D=70263289",
    topmatras_ks8: "&custom%5B8146164%5D=70263290",
    topmatras_ks6: "&custom%5B8146164%5D=70263291",
    topmatras_ks3: "&custom%5B8146164%5D=70263292",
    topmatras_csks10s: "&custom%5B8146164%5D=70263293",
    topmatras_csts10s: "&custom%5B8146164%5D=70263294",
    topmatras_ts9s: "&custom%5B8146164%5D=70263295",
    topmatras_ts6s: "&custom%5B8146164%5D=70263296",
    topmatras_ks8s: "&custom%5B8146164%5D=70263297",
    topmatras_ks6s: "&custom%5B8146164%5D=70263298",
    topmatras_ks3s: "&custom%5B8146164%5D=70263299",
    topmatras_geen: "&custom%5B8146164%5D=70264113",
    topmatras_ks6_gratis: "&custom%5B8146164%5D=70263300",
    maat80x200: "&custom%5B8146292%5D=70263724",
    maat90x200: "&custom%5B8146292%5D=70263725",
    maat120x200: "&custom%5B8146292%5D=70263726",
    maat140x200: "&custom%5B8146292%5D=70263727",
    maat160x200: "&custom%5B8146292%5D=70263728",
    maat180x200: "&custom%5B8146292%5D=70263729",
    maat200x200: "&custom%5B8146292%5D=70263730",
    maat80x210: "&custom%5B8146292%5D=70263731",
    maat90x210: "&custom%5B8146292%5D=70263732",
    maat120x210: "&custom%5B8146292%5D=70263733",
    maat140x210: "&custom%5B8146292%5D=70263734",
    maat160x210: "&custom%5B8146292%5D=70263735",
    maat180x210: "&custom%5B8146292%5D=70263736",
    maat200x210: "&custom%5B8146292%5D=70263737",
    maat80x220: "&custom%5B8146292%5D=70263738",
    maat90x220: "&custom%5B8146292%5D=70263739",
    maat120x220: "&custom%5B8146292%5D=70263740",
    maat140x220: "&custom%5B8146292%5D=70263741",
    maat160x220: "&custom%5B8146292%5D=70263742",
    maat180x220: "&custom%5B8146292%5D=70263743",
    maat200x220: "&custom%5B8146292%5D=70263744",
    basel120x200: "&custom%5B8146292%5D=70263745",
    basel140x200: "&custom%5B8146292%5D=70263746",
    basel160x200: "&custom%5B8146292%5D=70263747",
    basel180x200: "&custom%5B8146292%5D=70263748",
};
