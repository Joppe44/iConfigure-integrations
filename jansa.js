
function isPhone() {
    // Check the width of the viewport
    var viewportWidth = window.innerWidth || document.documentElement.clientWidth;

    // Define a threshold for phone screens, typically up to 767px
    var phoneMaxWidth = 767;

    // Return true if the viewport width is less than or equal to the phoneMaxWidth
    return viewportWidth <= phoneMaxWidth;
}

function formatData(event) {
    var items = {};
    console.log(event)
    for (var key in event.data.items) {
        if (event.data.items.hasOwnProperty(key)) {
            var item = event.data.items[key];
            items[event.data.items[key].ID] = item;
        }
    }
    var list = [];
    var topush = "";
    // console.log(items);
    for (var key in items) {
        if (items.hasOwnProperty(key)) {
            var item = items[key];
            var veld = velden.find(function (veld) {
                return veld.id === item.ID;
            });
            if (item.ID === "spots") {
                var ar = [];
                if (item.subID.indexOf("spots_ja") !== -1) {
                    ar.push("spots_ja");
                    if (item.subID.indexOf("schemer_schakelaar") !== -1) {
                        ar.push("schemer_schakelaar");
                    }
                    if (item.subID.indexOf("bewegingsmelder") !== -1) {
                        ar.push("bewegingsmelder");
                    }
                }
                var iKey = ar.join("_");
                console.log(iKey);
                topush = veld.sub[iKey];
                console.log(topush);
                // spots_ja_schemer_schakelaar_bewegingsmelder
            } else if (item.type === "single_selection") {
                topush = item.subID;
                topush = veld.sub[topush];
            } else if (item.type === "multiple_selection") {
                topush = item.subID.join("_");
                topush = veld.sub[topush];
            } else {
                topush = item.value;

                if (item.ID === "width") {
                    var value = breedteVeld.sub.find(function (sv) {
                        return topush >= sv.range[0] && topush <= sv.range[1];
                    });
                    console.log(value);
                    list.push(addItem(breedteVeld.uuid, value.value));
                }
                if (item.ID === "depth") {
                    var value = diepteVeld.sub.find(function (sv) {
                        return topush >= sv.range[0] && topush <= sv.range[1];
                    });
                    console.log(value);
                    list.push(addItem(diepteVeld.uuid, value.value));
                }
            }
            list.push(addItem(veld.uuid, topush));
        }
    }
    list.push(addToken());
    console.log(list);

    var body = list.join("&").replace(/\[/g, "%5B").replace(/\]/g, "%5D");
    console.log(body);
    addToShoppingCart(body);
}

function addItem(uuid, value) {
    return "add_to_cart[configuration][options][" + uuid + "][value]=" + value;
}

function addToken() {
    return "add_to_cart[_token]=" + token + "&amount=1&add=";
}

function addToShoppingCart(body) {
    fetch(
        "https://www.jansa.nl/a-92393783-9348182,9348200,9348107,9348236,9348266,9348272,9348281,9348422,9348398/configurator/luifel-configuratie/",
        {
            headers: {
                accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "accept-language": "nl-NL,nl;q=0.9,en-NL;q=0.8,en;q=0.7,en-US;q=0.6",
                "cache-control": "no-cache",
                "content-type": "application/x-www-form-urlencoded",
                pragma: "no-cache",
                priority: "u=0, i",
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "same-origin",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1",
            },
            referrer:
                "https://www.jansa.nl/a-82110275-8796005,8795999,6809565,8795213,8795201,8795192,7498860,8795246,8796086/voordeurluifel/klassieke-houten-deurluifel-tot-180cm-breed/",
            referrerPolicy: "no-referrer-when-downgrade",
            body: body,
            method: "POST",
            mode: "cors",
            credentials: "include",
        }
    )
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.text();
        })
        .then(function (data) {
            console.log("Success:", data);

            // Create an anchor element
            var anchor = document.createElement("a");

            // Set the href attribute to the desired URL
            anchor.href = "https://www.jansa.nl/cart/";

            // Append the anchor to the document body (optional, but sometimes necessary in some browsers)
            document.body.appendChild(anchor);

            // Set a timeout of 500ms and then simulate a click on the anchor
            setTimeout(function () {
                anchor.click();
            }, 500); // 500 milliseconds
        })
        .catch(function (error) {
            console.error("Error:", error);
        });
}

if (window.location.href === "https://www.jansa.nl/a-92393783/configurator/luifel-configuratie/#description") {
    var token = document.getElementById("add_to_cart__token").value;

    // Remove the footer element if it exists
    var footer = document.querySelector("#footer");
    if (footer) {
        footer.parentNode.removeChild(footer);
    }

    // Create an iframe and set its attributes
    var iframe = document.createElement("iframe");
    iframe.src =
        "https://web.iconfigure.nl/?product=118987e2-f58a-4b7d-8a5b-8349f3a7cdf1&=lijst_2&lijst_onder=uitgefreesde_onderkant&width=171&depth=62&afvoer_select=afvoer_rechts&armen_feat=trek_arm&kleur=9001&kleur_onder=onder_zwart&spots=spots_ja&active_step=0"; // Replace with your iframe URL
    iframe.style.width = "100vw"; // Full viewport width

    iframe.style.height = isPhone() ? "calc(100vh - 100px)" : "calc(100vh - 350px)"; // Height of the viewport minus 350px
    iframe.style.border = "none"; // Optional: Remove the border from the iframe

    // Set the iframe as the innerHTML of the content element
    var content = document.querySelector("#content");
    if (content) {
        content.innerHTML = "";
        content.appendChild(iframe);
    }

    window.addEventListener("message", function(event) {
        if (event.data && event.data.items && event.data.URLparameters) {
            formatData(event);
        }
    });    // URLparameters
} else if (window.location.href === "https://www.jansa.nl/c-7327352/configurator/") {
    var anchor = document.createElement("a");
    anchor.href = "https://www.jansa.nl/a-92393783/configurator/luifel-configuratie/#description";
    document.body.appendChild(anchor);
    anchor.click();
}

var velden = [
    {
        id: "sierlijsten",
        uuid: "a2fd779a-a76a-4fea-ab71-01d6000ce615",
        name: "Bovenlijst configurator",
        type: "select",
        sub: {
            lijst_1: 9348185,
            lijst_2: 9348182,
            lijst_3: 9348188,
            lijst_4: 9348191,
            lijst_5: 9348194,
        },
    },
    {
        id: "lijst_onder",
        uuid: "03bcb93e-97f9-4f9c-82cf-de4f7048cf67",
        name: "Onderlijst configurator",
        type: "select",
        sub: {
            else: 9348200,
            uitgefreesde_onderkant: 9348203,
        },
    },

    {
        id: "afvoer_select",
        uuid: "9d3c3b52-c1b9-4e01-b1a8-6a4a426bc064",
        name: "Afvoer configurator",
        type: "select",
        sub: {
            afvoer_links: 9348263,
            afvoer_rechts: 9348266,
        },
    },
    {
        id: "armen_feat",
        uuid: "0bd3e111-5f4a-459e-8d43-37724ef59e7f",
        name: "Armen configurator",
        type: "select",
        sub: {
            geen_arm: 9348269,
            sier_arm: 9348272,
            trek_arm: 9348275,
        },
    },
    {
        id: "kleur",
        uuid: "35746abd-3d25-40b9-abe3-fb17d829079d",
        name: "Kleur configurator",
        type: "select",
        sub: {
            ral_anders: 9348278,
            1015: 9348281,
            7015: 9348284,
            9001: 9348287,
            9005: 9348290,
            9016: 9348293,
        },
    },
    {
        id: "kleur_onder",
        uuid: "9f738bf8-f115-41d1-9f6e-c6017a04a846",
        name: "Kleur onder configurator",
        sub: {
            onder_wit: 9348398,
            onder_zwart: 9348401,
            onder_hetzelfde: 9348404,
        },
    },
    {
        id: "spots",
        uuid: "9991bc98-b06a-41fa-8e1a-65dffdd03519",
        name: "Spotjes configurator",
        type: "select",
        sub: {
            spots_ja: 9348416,
            "": 9348422,
            spots_ja_schemer_schakelaar: 9349112,
            spots_ja_bewegingsmelder: 9348419,
            spots_ja_schemer_schakelaar_bewegingsmelder: 9349115,
        },
    },
    {
        id: "width",
        uuid: "d6dc78fd-f46c-4cc7-8397-a3b85ff5be36",
        name: "Breedte",
        type: "number",
        sub: {},
    },
    {
        id: "depth",
        uuid: "e6385f7d-445d-49af-98e2-e3e1b6ba9239",
        name: "Diepte",
        type: "number",
        sub: {},
    },
    {
        id: "colorpick",
        uuid: "6d771d4c-9bfa-454f-9cc5-80404f93edcf",
        name: "Andere RAL",
        type: "number",
        sub: {},
    },
];
var breedteVeld = {
    id: "",
    uuid: "8874b633-bd14-4bb9-8d8b-05286ea09680",
    name: "Breedte configurator",
    type: "select",
    sub: [
        { value: 9348104, range: [100, 109] },
        { value: 9348107, range: [110, 119] },
        { value: 9348110, range: [120, 129] },
        { value: 9348113, range: [130, 139] },
        { value: 9348116, range: [140, 149] },
        { value: 9348119, range: [150, 159] },
        { value: 9348122, range: [160, 169] },
        { value: 9348125, range: [170, 179] },
        { value: 9348128, range: [180, 189] },
        { value: 9348131, range: [190, 199] },
        { value: 9348134, range: [200, 209] },
        { value: 9348137, range: [210, 219] },
        { value: 9348140, range: [220, 229] },
        { value: 9348143, range: [230, 239] },
        { value: 9348146, range: [240, 249] },
        { value: 9348149, range: [250, 259] },
        { value: 9348152, range: [260, 269] },
        { value: 9348155, range: [270, 279] },
        { value: 9348158, range: [280, 289] },
        { value: 9348161, range: [290, 299] },
        { value: 9348164, range: [300, 100] },
    ],
};
var diepteVeld = {
    id: "",
    uuid: "f612eadb-0123-4f43-96ec-83a83a053e23",
    name: "diepteVeld",
    type: "select",
    sub: [
        { value: 9348233, range: [30, 39] },
        { value: 9348236, range: [40, 49] },
        { value: 9348239, range: [50, 59] },
        { value: 9348242, range: [60, 69] },
        { value: 9348245, range: [70, 79] },
        { value: 9348248, range: [80, 89] },
        { value: 9348251, range: [90, 99] },
        { value: 9348254, range: [100, 109] },
        { value: 9348257, range: [110, 119] },
        { value: 9348260, range: [120, 129] },
    ],
};
