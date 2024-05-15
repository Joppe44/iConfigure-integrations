// HOUT EN STAAL
// HOUT EN STAAL
// HOUT EN STAAL
// HOUT EN STAAL

var configVisible = false;
setTimeout(() => {
    var iframe = document.getElementById("iconfigure");
    console.log(iframe);
    if (iframe) {
        exec(iframe);
    }
}, 200);

function exec(iframe) {
    // Create spinner element

    var bodyEl = document.querySelector(".body-content");
    // check if mobile
    var topBarHeight = 0;
    var btm = "0"
    if (window.innerWidth > 767) {
        topBarHeight = "130";
        
    } else {
        topBarHeight = "80";
        btm = "0"
    }
    iframe.style.display = "block";
    iframe.style.border = "none";
    iframe.style.position = "fixed";
    iframe.style.top = `${topBarHeight}px`;
    iframe.style.bottom = `${btm}px`;
    
    iframe.style.left = "0";
    iframe.style.width = "100vw";
    iframe.style.height = `calc(100vh - ${topBarHeight}px - ${btm}px)`;
    //  iframe.style.height = `100vh`;

    bodyEl.insertBefore(iframe, bodyEl.firstChild);
    iframe.classList.add("body-content");
    var removeList = [
        "body > div.body-content > div.container.productpage > div.content-box > div:nth-child(1)",
        "body > div.body-content > div.newsletter.gray-bg",
        "body > div.body-content > div.addtocart-sticky.visible",

        "body > div.body-content > header > div.subheader-holder",
        "body > div.body-content > footer",
        "body > div.body-content > div.container.productpage > div.content-box",
        "body > div.body-content > div.container.productpage > div.row > div > div > div.row",
    ];

    removeList.forEach((selector) => {
        let el = document.querySelector(selector);
        if (el) {
            el.style.display = "none";
        }
    });
    document.querySelector("body > div.body-content > div.breadcrumbs").style =
        "width: 400px !important;";
    const addtocart = setInterval(() => {
        const elementToRemove = document.querySelector(
            "body > div.body-content > div.addtocart-sticky.mobile-visible"
        );

        if (elementToRemove) {
            elementToRemove.remove();
            clearInterval(addtocart);
        }
    }, 100);
    const tawk = setInterval(() => {
        const elementToRemove = document.querySelector(".widget-visible");

        if (elementToRemove) {
            elementToRemove.remove();
            clearInterval(tawk);
        }
    }, 100);

    window.addEventListener("message", (event) => {
        if (event.data.name === "quotation") {
            console.log(event.data);
            var redirect = ''
            if (event.data.productId === "D3849C93-3CCB-4438-BA7F-753F2F73A359") {
               //  redirect = "https://www.firmahoutenstaal.nl/service/bedankt-voor-uw-offerte-aanvraag-deuren"
               const url = new URL(window.location.href);
url.searchParams.set('aangevraagde-offerte', 'deur');
window.history.pushState({}, '', url);
            } else if (event.data.productId === "ADFF030A-42C7-44E0-958B-E0616B20A396") {
               //  redirect = "https://www.firmahoutenstaal.nl/service/bedankt-voor-uw-offerte-aanvraag-tafels"
                const url = new URL(window.location.href);
url.searchParams.set('aangevraagde-offerte', 'tafel');
window.history.pushState({}, '', url);
            }
            // const link = document.createElement("a")
            // link.href = redirect
            // document.body.appendChild(link)
            // link.click()
        }
        // check if event has property called URLparameters
        if (!event.data.hasOwnProperty("URLparameters")) {
            return;
        }
        sendDataToShop(event);
    });
}

function sendDataToShop(event) {
    var items = {};
    for (let key of Object.keys(event.data.items)) {
        let item = event.data.items[key];
        items[event.data.items[key].ID] = item;
    }
    console.log(items);

    var urls = [];
    var topush = "";
    for (let key of Object.keys(items)) {
        let item = items[key];
        if (item.type === "single_selection") {
            topush = item.subID;
        } else if (item.type === "multiple_selection") {
            topush = item.subID[0];
        } else {
            continue;
        }
        if (values[topush]) {
            urls.push(
                `https://www.firmahoutenstaal.nl/cart/add/${values[topush]}/?bundle_id=&quantity=1`
            );
        }
    }
    // MATEN
    if (items.vorm.subID === "blob") {
        urls.push(
            `https://www.firmahoutenstaal.nl/cart/add/${
                values["pebble" + items.afmeting_pebble.value]
            }/?bundle_id=&quantity=1`
        );
    } else if (items.vorm.subID === "rond") {
        urls.push(
            `https://www.firmahoutenstaal.nl/cart/add/${
                values["rond" + items.radius.value]
            }/?bundle_id=&quantity=1`
        );
    } else {
        let val = values2["tafelblad" + items.lengte.value + "x" + items.breedte.value];
        urls.push(
            `https://www.firmahoutenstaal.nl/cart/add/${val.ID}/?bundle_id=&custom%5B${
                val.fieldID
            }%5D=${val.vorm[items.vorm.subID]}&quantity=1`
        );
    }
    event.preventDefault();
    console.log(urls);
    triggerPostRequests(urls);
}
async function triggerPostRequests(urls) {
    for (let url of urls) {
        await postData(url).then((data) => {
            if (url === urls[urls.length - 1]) {
                window.location.href = "https://www.firmahoutenstaal.nl/cart";
            }
        });
    }
}
async function postData(url) {
    try {
        const response = await fetch(url, { method: "POST" });
    } catch (error) {
        console.log(error);
    }
}

const values = {
    mika: 292257148,
    awm: 292257149,
    awz: 292257150,
    xys: 292257151,
    huis: 292257152,
    yhout: 292257153,
    hout: 292257154,
    m105re: 292257155,
    m1010re: 292257156,
    u82: 292257157,
    u105: 292257158,
    w: 292257159,
    a1010: 292257160,
    a105: 292257161,
    awmev: 292257162,
    xyr: 292257163,
    hair3: 292257164,
    hairre: 292257165,
    bonsai: 292257166,
    eigen_ralkleur: 292996549,
    goud_metallic: 292257167,
    brons_metallic: 292257168,
    creme_wit: 292257169,
    zwart_fijn: 292257170,
    zwart: 292257171,
    antraciet: 292257172,
    brons_anodic: 292257173,
    bruin_metallic: 292257174,
    wit: 292257175,
    black: 292257176,
    cinemon: 292257177,
    vardo: 292257178,
    tinello: 292257179,
    mice_grey: 292257180,
    toscane: 292257181,
    september: 292257182,
    deer_brown: 292257183,
    matte_lak: 292257184,
    bergen: 292257185,
    rarecht: 292257186,
    rarecht45: 292257187,
    rarond45: 292257188,
    rarond: 292257189,
    geborsteld: 292257190,
    glad: 292257191,
    noesten_vullen: 292257192,
    black_edge_ja: 292257193,
    rond100: 292255684,
    rond110: 292255747,
    rond120: 292255792,
    rond130: 292255815,
    rond140: 292255818,
    rond150: 292255822,
    pebble100: 292255911,
    pebble110: 292255921,
    pebble120: 292255932,
    pebble130: 292255936,
    pebble140: 292255944,
    pebble150: 292255950,
    pebble160: 292255959,
    pebble170: 292255965,
    m103ev: 292834192,
    gratis_afleveren: 292977946,
    geleverd_en_gemonteerd: 292977956,
};

const values2 = {
    tafelblad200x100: {
        ID: 292253583,
        fieldID: 8148852,
        vorm: {
            leaf: 70281498,
            stone: 70281499,
            deens: 70281500,
            deensrecht: 70281501,
            ovaal: 70281502,
            rond_ovaal: 70281503,
            afhoek: 70281504,
            recht: 70281505,
            wave: 70580855,
        },
    },
    tafelblad210x100: {
        ID: 292253601,
        fieldID: 8148856,
        vorm: {
            leaf: 70281506,
            stone: 70281507,
            deens: 70281508,
            deensrecht: 70281509,
            ovaal: 70281510,
            rond_ovaal: 70281511,
            afhoek: 70281512,
            recht: 70281513,
            wave: 70580854,
        },
    },
    tafelblad220x100: {
        ID: 292253637,
        fieldID: 8148861,
        vorm: {
            leaf: 70281532,
            stone: 70281533,
            deens: 70281534,
            deensrecht: 70281535,
            ovaal: 70281536,
            rond_ovaal: 70281537,
            afhoek: 70281538,
            recht: 70281539,
            wave: 70580853,
        },
    },
    tafelblad230x100: {
        ID: 292253724,
        fieldID: 8148862,
        vorm: {
            leaf: 70281540,
            stone: 70281541,
            deens: 70281542,
            deensrecht: 70281543,
            ovaal: 70281544,
            rond_ovaal: 70281545,
            afhoek: 70281546,
            recht: 70281547,
            wave: 70580852,
        },
    },
    tafelblad240x100: {
        ID: 292253749,
        fieldID: 8148863,
        vorm: {
            leaf: 70281548,
            stone: 70281549,
            deens: 70281550,
            deensrecht: 70281551,
            ovaal: 70281552,
            rond_ovaal: 70281553,
            afhoek: 70281554,
            recht: 70281555,
            wave: 70580851,
        },
    },
    tafelblad250x100: {
        ID: 292253758,
        fieldID: 8148864,
        vorm: {
            leaf: 70281556,
            stone: 70281557,
            deens: 70281558,
            deensrecht: 70281559,
            ovaal: 70281560,
            rond_ovaal: 70281561,
            afhoek: 70281562,
            recht: 70281563,
            wave: 70580850,
        },
    },
    tafelblad260x100: {
        ID: 292253556,
        fieldID: 8148851,
        vorm: {
            leaf: 70281490,
            stone: 70281491,
            deens: 70281492,
            deensrecht: 70281493,
            ovaal: 70281494,
            rond_ovaal: 70281495,
            afhoek: 70281496,
            recht: 70281497,
            wave: 70580856,
        },
    },
    tafelblad270x100: {
        ID: 292253771,
        fieldID: 8148865,
        vorm: {
            leaf: 70281564,
            stone: 70281565,
            deens: 70281566,
            deensrecht: 70281567,
            ovaal: 70281568,
            rond_ovaal: 70281569,
            afhoek: 70281570,
            recht: 70281571,
            wave: 70580849,
        },
    },
    tafelblad280x100: {
        ID: 292253805,
        fieldID: 8148866,
        vorm: {
            leaf: 70281572,
            stone: 70281573,
            deens: 70281574,
            deensrecht: 70281575,
            ovaal: 70281576,
            rond_ovaal: 70281577,
            afhoek: 70281578,
            recht: 70281579,
            wave: 70580848,
        },
    },
    tafelblad290x100: {
        ID: 292253811,
        fieldID: 8148867,
        vorm: {
            leaf: 70281580,
            stone: 70281581,
            deens: 70281582,
            deensrecht: 70281583,
            ovaal: 70281584,
            rond_ovaal: 70281585,
            afhoek: 70281586,
            recht: 70281587,
            wave: 70580847,
        },
    },
    tafelblad300x100: {
        ID: 292253822,
        fieldID: 8148868,
        vorm: {
            leaf: 70281588,
            stone: 70281589,
            deens: 70281590,
            deensrecht: 70281591,
            ovaal: 70281592,
            rond_ovaal: 70281593,
            afhoek: 70281594,
            recht: 70281595,
            wave: 70580846,
        },
    },
    tafelblad200x110: {
        ID: 292253851,
        fieldID: 8148869,
        vorm: {
            leaf: 70281596,
            stone: 70281597,
            deens: 70281598,
            deensrecht: 70281599,
            ovaal: 70281600,
            rond_ovaal: 70281601,
            afhoek: 70281602,
            recht: 70281603,
            wave: 70580845,
        },
    },
    tafelblad210x110: {
        ID: 292253877,
        fieldID: 8148870,
        vorm: {
            leaf: 70281604,
            stone: 70281605,
            deens: 70281606,
            deensrecht: 70281607,
            ovaal: 70281608,
            rond_ovaal: 70281609,
            afhoek: 70281610,
            recht: 70281611,
            wave: 70580844,
        },
    },
    tafelblad220x110: {
        ID: 292253910,
        fieldID: 8148875,
        vorm: {
            leaf: 70281616,
            stone: 70281617,
            deens: 70281618,
            deensrecht: 70281619,
            ovaal: 70281620,
            rond_ovaal: 70281621,
            afhoek: 70281622,
            recht: 70281623,
            wave: 70580843,
        },
    },
    tafelblad230x110: {
        ID: 292253974,
        fieldID: 8148876,
        vorm: {
            leaf: 70281624,
            stone: 70281625,
            deens: 70281626,
            deensrecht: 70281627,
            ovaal: 70281628,
            rond_ovaal: 70281629,
            afhoek: 70281630,
            recht: 70281631,
            wave: 70580842,
        },
    },
    tafelblad240x110: {
        ID: 292253986,
        fieldID: 8148877,
        vorm: {
            leaf: 70281632,
            stone: 70281633,
            deens: 70281634,
            deensrecht: 70281635,
            ovaal: 70281636,
            rond_ovaal: 70281637,
            afhoek: 70281638,
            recht: 70281639,
            wave: 70580841,
        },
    },
    tafelblad250x110: {
        ID: 292254062,
        fieldID: 8148878,
        vorm: {
            leaf: 70281640,
            stone: 70281641,
            deens: 70281642,
            deensrecht: 70281643,
            ovaal: 70281644,
            rond_ovaal: 70281645,
            afhoek: 70281646,
            recht: 70281647,
            wave: 70580840,
        },
    },
    tafelblad260x110: {
        ID: 292254130,
        fieldID: 8148882,
        vorm: {
            leaf: 70281659,
            stone: 70281660,
            deens: 70281661,
            deensrecht: 70281662,
            ovaal: 70281663,
            rond_ovaal: 70281664,
            afhoek: 70281665,
            recht: 70281666,
            wave: 70580839,
        },
    },
    tafelblad270x110: {
        ID: 292254134,
        fieldID: 8148883,
        vorm: {
            leaf: 70281667,
            stone: 70281668,
            deens: 70281669,
            deensrecht: 70281670,
            ovaal: 70281671,
            rond_ovaal: 70281672,
            afhoek: 70281673,
            recht: 70281674,
            wave: 70580838,
        },
    },
    tafelblad280x110: {
        ID: 292254240,
        fieldID: 8148884,
        vorm: {
            leaf: 70281675,
            stone: 70281676,
            deens: 70281677,
            deensrecht: 70281678,
            ovaal: 70281679,
            rond_ovaal: 70281680,
            afhoek: 70281681,
            recht: 70281682,
            wave: 70580837,
        },
    },
    tafelblad290x110: {
        ID: 292254322,
        fieldID: 8148885,
        vorm: {
            leaf: 70281683,
            stone: 70281684,
            deens: 70281685,
            deensrecht: 70281686,
            ovaal: 70281687,
            rond_ovaal: 70281688,
            afhoek: 70281689,
            recht: 70281690,
            wave: 70580836,
        },
    },
    tafelblad300x110: {
        ID: 292254546,
        fieldID: 8148886,
        vorm: {
            leaf: 70281691,
            stone: 70281692,
            deens: 70281693,
            deensrecht: 70281694,
            ovaal: 70281695,
            rond_ovaal: 70281696,
            afhoek: 70281697,
            recht: 70281698,
            wave: 70580835,
        },
    },
    tafelblad200x120: {
        ID: 292254563,
        fieldID: 8148890,
        vorm: {
            leaf: 70281710,
            stone: 70281711,
            deens: 70281712,
            deensrecht: 70281713,
            ovaal: 70281714,
            rond_ovaal: 70281715,
            afhoek: 70281716,
            recht: 70281717,
            wave: 70580834,
        },
    },
    tafelblad210x120: {
        ID: 292254579,
        fieldID: 8148891,
        vorm: {
            leaf: 70281718,
            stone: 70281719,
            deens: 70281720,
            deensrecht: 70281721,
            ovaal: 70281722,
            rond_ovaal: 70281723,
            afhoek: 70281724,
            recht: 70281725,
            wave: 70580833,
        },
    },
    tafelblad220x120: {
        ID: 292254587,
        fieldID: 8148895,
        vorm: {
            leaf: 70281734,
            stone: 70281735,
            deens: 70281736,
            deensrecht: 70281737,
            ovaal: 70281738,
            rond_ovaal: 70281739,
            afhoek: 70281740,
            recht: 70281741,
            wave: 70580832,
        },
    },
    tafelblad230x120: {
        ID: 292254590,
        fieldID: 8148896,
        vorm: {
            leaf: 70281742,
            stone: 70281743,
            deens: 70281744,
            deensrecht: 70281745,
            ovaal: 70281746,
            rond_ovaal: 70281747,
            afhoek: 70281748,
            recht: 70281749,
            wave: 70580831,
        },
    },
    tafelblad240x120: {
        ID: 292254612,
        fieldID: 8148897,
        vorm: {
            leaf: 70281750,
            stone: 70281751,
            deens: 70281752,
            deensrecht: 70281753,
            ovaal: 70281754,
            rond_ovaal: 70281755,
            afhoek: 70281756,
            recht: 70281757,
            wave: 70580830,
        },
    },
    tafelblad250x120: {
        ID: 292254621,
        fieldID: 8148898,
        vorm: {
            leaf: 70281758,
            stone: 70281759,
            deens: 70281760,
            deensrecht: 70281761,
            ovaal: 70281762,
            rond_ovaal: 70281763,
            afhoek: 70281764,
            recht: 70281765,
            wave: 70580829,
        },
    },
    tafelblad260x120: {
        ID: 292254626,
        fieldID: 8148899,
        vorm: {
            leaf: 70281766,
            stone: 70281767,
            deens: 70281768,
            deensrecht: 70281769,
            ovaal: 70281770,
            rond_ovaal: 70281771,
            afhoek: 70281772,
            recht: 70281773,
            wave: 70580828,
        },
    },
    tafelblad270x120: {
        ID: 292254634,
        fieldID: 8148900,
        vorm: {
            leaf: 70281774,
            stone: 70281775,
            deens: 70281776,
            deensrecht: 70281777,
            ovaal: 70281778,
            rond_ovaal: 70281779,
            afhoek: 70281780,
            recht: 70281781,
            wave: 70580827,
        },
    },
    tafelblad280x120: {
        ID: 292254642,
        fieldID: 8148901,
        vorm: {
            leaf: 70281782,
            stone: 70281783,
            deens: 70281784,
            deensrecht: 70281785,
            ovaal: 70281786,
            rond_ovaal: 70281787,
            afhoek: 70281788,
            recht: 70281789,
            wave: 70580817,
        },
    },
    tafelblad290x120: {
        ID: 292254648,
        fieldID: 8148902,
        vorm: {
            leaf: 70281790,
            stone: 70281791,
            deens: 70281792,
            deensrecht: 70281793,
            ovaal: 70281794,
            rond_ovaal: 70281795,
            afhoek: 70281796,
            recht: 70281797,
            wave: 70580816,
        },
    },
    tafelblad300x120: {
        ID: 292254655,
        fieldID: 8148903,
        vorm: {
            leaf: 70281798,
            stone: 70281799,
            deens: 70281800,
            deensrecht: 70281801,
            ovaal: 70281802,
            rond_ovaal: 70281803,
            afhoek: 70281804,
            recht: 70281805,
            wave: 70580510,
        },
    },
};
