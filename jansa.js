/** @format */

function isPhone() {
    var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    var phoneMaxWidth = 767;
    return viewportWidth <= phoneMaxWidth;
}
function formatData(event) {
    var items = {};
    var breedteValue; // Declare breedteValue to use it later for Montage logic

    for (var key in event.data.items) {
        if (event.data.items.hasOwnProperty(key)) {
            var item = event.data.items[key];
            items[event.data.items[key].ID] = item;
        }
    }

    var list = [];
    var topush = "";
    list.push(addItem("195a701d-2803-4e13-a6d0-5b158d93fdf1", "8795246"));

    for (var key in items) {
        if (items.hasOwnProperty(key)) {
            var item = items[key];
            var veld = configurationOptions.find(function (veld) {
                return veld.configurator_ID === item.ID;
            });
            if (!veld) {
                console.error("No matching field found for item ID: " + item.ID);
                continue;
            }

            if (item.ID === "kleur_onder") {
                var ralValueOnder = item.subID.match(/\d+/);
                if (item.subID === "onder_hetzelfde") {
                    var kleurItem = event.data.items.find(function (i) {
                        return i.ID === "kleur";
                    });
                    if (kleurItem) {
                        var ralValueKleur = kleurItem.subID.match(/\d+/);
                        if (ralValueKleur) {
                            list.push(addItem("2c93ac91-762c-44c2-8c6d-052a0dc41f6e", ralValueKleur[0]));
                        }
                    } else {
                        console.error("No matching RAL color found for 'kleur'");
                    }
                } else if (ralValueOnder) {
                    list.push(addItem("2c93ac91-762c-44c2-8c6d-052a0dc41f6e", ralValueOnder[0]));
                } else {
                    console.error("No valid RAL color found for subID: " + item.subID);
                }
            } else if (item.ID === "kleur") {
                var ralValue = item.subID.match(/\d+/);
                if (ralValue) {
                    var veld = configurationOptions.find(function (veld) {
                        return veld.configurator_ID === "kleur";
                    });
                    if (veld) {
                        list.push(addItem(veld.uuid, ralValue[0]));
                    } else {
                        console.error("No matching field found for item ID: kleur");
                    }
                } else {
                    console.error("No numeric RAL value found for subID: " + item.subID);
                }
            } else if (item.ID === "armen_feat") {
                if (item.subID === "sier_arm") {
                    list.push(addItem("d70d4f5b-f3f9-4d74-bf0c-382feaee29d2", "8795201"));
                    list.push(addItem("b65920d6-474a-444d-bdef-f64ab7256880", "8795216"));
                } else if (item.subID === "trek_arm") {
                    list.push(addItem("b65920d6-474a-444d-bdef-f64ab7256880", "8795213"));
                    list.push(addItem("d70d4f5b-f3f9-4d74-bf0c-382feaee29d2", "8795204"));
                }
            } else if (item.ID === "width") {
                // Handle Breedte selection
                breedteValue = item.value; // Store breedte value for later use in Montage logic

                list.push(addItem("0c6962a9-1701-4990-8cee-20d900d61a85", breedteValue));
                var breedteSelection;

                if (breedteValue >= 100 && breedteValue <= 120) {
                    breedteSelection = "8796005";
                } else if (breedteValue >= 121 && breedteValue <= 150) {
                    breedteSelection = "8796008";
                } else if (breedteValue >= 151 && breedteValue <= 180) {
                    breedteSelection = "8796011";
                } else if (breedteValue >= 181 && breedteValue <= 210) {
                    breedteSelection = "9356354";
                } else if (breedteValue >= 211 && breedteValue <= 240) {
                    breedteSelection = "9356357";
                } else if (breedteValue >= 241 && breedteValue <= 270) {
                    breedteSelection = "9356360";
                } else if (breedteValue >= 271 && breedteValue <= 308) {
                    breedteSelection = "9356363";
                }
                list.push(addItem("f9bb4750-9312-45c2-ab50-30189986729f", breedteSelection));
            } else if (item.ID === "depth") {
                // Handle Diepte selection
                var diepteValue = item.value;
                list.push(addItem("8985ac72-2d19-4256-9aa6-626379fbd269", diepteValue));
                var diepteSelection;

                if (diepteValue >= 40 && diepteValue <= 60) {
                    diepteSelection = "8795999";
                } else if (diepteValue >= 61 && diepteValue <= 120) {
                    diepteSelection = "8796002";
                } else if (diepteValue >= 81 && diepteValue <= 110) {
                    diepteSelection = "9356366";
                }
                list.push(addItem("ed82b38d-d3ab-42eb-aedd-debb3d3890d4", diepteSelection));
            } else if (item.type === "single_selection") {
                // Handle single selection
                topush = veld.subfeatures.find(function (sf) {
                    return sf.ID === item.subID;
                });

                if (topush) {
                    topush = topush.value;
                }
                list.push(addItem(veld.uuid, topush));
            } else if (item.type === "multiple_selection") {
                topush = item.subID.join("_");
                topush = veld.subfeatures.find(function (sf) {
                    return sf.ID === topush;
                });
                if (topush) {
                    topush = topush.value;
                }
                list.push(addItem(veld.uuid, topush));
            } else if (item.type === "number_input") {
                topush = item.value;
                list.push(addItem(veld.uuid, topush));
            }
        }
    }

    // Handle Montage based on Breedte
    if (breedteValue > 180||diepteValue>80) {
        // Find the correct value for Montage breder dan 180 based on the subID
        var montageBreder = configurationOptions.find(function (option) {
            return option.configurator_ID === "montage" && option.uuid === "42440a54-cee9-4f65-9451-613bd9983d27";
        });
    
        if (montageBreder && item.subID) {
            var montageBrederValue = montageBreder.subfeatures.find(function (sub) {
                return sub.ID === item.subID;
            });
            if (montageBrederValue) {
                list.push(addItem("42440a54-cee9-4f65-9451-613bd9983d27", montageBrederValue.value));
            }
        }
    
        // Set Montage tot 179cm breed to "Geen"
        list.push(addItem("50b49028-82cb-4237-8612-2f14e3c469a3", "9356462"));
    } else {
        // Find the correct value for Montage tot 179cm breed based on the subID
        var montageTot179 = configurationOptions.find(function (option) {
            return option.configurator_ID === "montage" && option.uuid === "50b49028-82cb-4237-8612-2f14e3c469a3";
        });
    
        if (montageTot179 && item.subID) {
            var montageTot179Value = montageTot179.subfeatures.find(function (sub) {
                return sub.ID === item.subID;
            });
            if (montageTot179Value) {
                list.push(addItem("50b49028-82cb-4237-8612-2f14e3c469a3", montageTot179Value.value));
            }
        }
    
        // Set Montage breder dan 180 to "Geen"
        list.push(addItem("42440a54-cee9-4f65-9451-613bd9983d27", "8796086"));
    }
    list.push(addToken()); // Adding token for cart
    console.log(list);

    var body = list.join("&").replace(/\[/g, "%5B").replace(/\]/g, "%5D");

    addToShoppingCart(body); // Sending the request
}

var skuop = 0;
function addItem(uuid, value) {
    skuop++;

    return "add_to_cart[configuration][options][" + uuid + "][value]=" + value;
}

function addToken() {
    return "add_to_cart[_token]=" + token + "&amount=1&add=";
}
function addToShoppingCart(body) {
    fetch("https://www.jansa.nl/a-82110275-8796011/voordeurluifel/klassieke-houten-deurluifel-tot-308cm-breed/", {
        headers: {
            accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
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
        referrer: "https://www.jansa.nl/a-82110275-8796005/voordeurluifel/klassieke-houten-deurluifel-tot-308cm-breed/",
        referrerPolicy: "no-referrer-when-downgrade",
        body: body,
        method: "POST",
        mode: "cors",
        credentials: "include",
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.text();
        })
        .then(function (data) {
            var anchor = document.createElement("a");
            anchor.href = "https://www.jansa.nl/cart/";
            document.body.appendChild(anchor);

            setTimeout(function () {
                anchor.click();
            }, 500);
        })
        .catch(function (error) {
            console.error("Error:", error);
        });
}

if (window.location.href === "https://www.jansa.nl/a-82110275/voordeurluifel/klassieke-houten-deurluifel-tot-308cm-breed/#description") {
    var token = document.getElementById("add_to_cart__token").value;

    // Remove the footer element if it exists
    var footer = document.querySelector("#footer");
    if (footer) {
        footer.parentNode.removeChild(footer);
    }

    // Create an iframe and set its attributes
    var iframe = document.createElement("iframe");
    iframe.src =
        "https://web.iconfigure.nl/?product=118987e2-f58a-4b7d-8a5b-8349f3a7cdf1&width=170&depth=70&sierlijsten=lijst_6&daktrim=daktrim_rond&afvoer_select=afvoer_rechts&armen_feat=trek_arm&kleur=9010&kleur_onder=onder_hetzelfde&spots=0_spotjes&melders=geen_schakelaar&montage=afhalen&active_step=0"; // Replace with your iframe URL
    iframe.style.width = "100vw"; // Full viewport width

    iframe.style.height = isPhone() ? "calc(100vh - 100px)" : "calc(100vh - 350px)"; // Height of the viewport minus 350px
    iframe.style.border = "none"; // Optional: Remove the border from the iframe

    // Set the iframe as the innerHTML of the content element
    var content = document.querySelector("#content");
    if (content) {
        content.innerHTML = "";
        content.appendChild(iframe);
    }

    window.addEventListener("message", function (event) {
        if (event.data && event.data.items && event.data.URLparameters) {
            formatData(event);
        }
    }); // URLparameters
} else if (window.location.href === "https://www.jansa.nl/c-7327352/configurator/") {
    var anchor = document.createElement("a");
    anchor.href = "https://www.jansa.nl/a-82110275/voordeurluifel/klassieke-houten-deurluifel-tot-308cm-breed/#description";
    // document.body.appendChild(anchor);
    anchor.click();
}

var configurationOptions = [
    {
        label: "Breedte",
        type: "number_input",
        uuid: "0c6962a9-1701-4990-8cee-20d900d61a85",
        configurator_ID: "width",
        configurator_name: "Breedte",
        min: 90,
        max: 308,
        step_value: 1,
        default_value: 90,
    },
    {
        label: "Diepte",
        type: "number_input",
        uuid: "8985ac72-2d19-4256-9aa6-626379fbd269",
        configurator_ID: "depth",
        configurator_name: "Diepte",
        min: 30,
        max: 110,
        step_value: 1,
        calculation: [
            {
                condition: "depth > 60",
                price_increase: 150,
            },
        ],
    },
    {
        label: "Sierlijst (afwerking boeideel)",
        type: "single_selection",
        uuid: "5e68af47-7726-4676-a14d-288184d4161e",
        configurator_ID: "sierlijsten",
        configurator_name: "Sierlijst",
        subfeatures: [
            { ID: "lijst_5", name: "Geen", value: "8796032" },
            { ID: "lijst_6", name: "Dubbel boeideel", value: "9356606" },
            { ID: "lijst_1", name: "G-061", value: "9356609" },
            { ID: "lijst_2", name: "G-05", value: "9356612" },
            { ID: "lijst_3", name: "G-09", value: "9356615" },
            { ID: "lijst_4", name: "G-099", value: "9356618" },
        ],
    },
    {
        label: "Daktrim",
        type: "single_selection",
        uuid: "0f114a9c-fd54-4694-8f6e-dcbd35faa022",
        configurator_ID: "daktrim",
        configurator_name: "Daktrim",
        subfeatures: [
            { ID: "daktrim_rond", name: "Rond", value: "9368317" },
            { ID: "daktrim_recht_alu", name: "Recht alu", value: "9368311" },
            { ID: "daktrim_recht_zwart", name: "Recht zwart", value: "9368314" },
        ],
    },
    {
        label: "Freesrand onderkant boeideel",
        type: "single_selection",
        uuid: "949100f8-cccb-4dff-a668-819e48c0f26c",
        configurator_ID: "lijst_onder",
        configurator_name: "Onderkant",
        subfeatures: [{ ID: "uitgefreesde_onderkant", name: "Freesrand onderkant boeideel", value: "9356819" }],
    },
    {
        label: "Waterafvoer",
        type: "single_selection",
        uuid: "7e4ed4f6-1f5f-466d-a08f-23b5c24bc9fd",
        configurator_ID: "afvoer_select",
        configurator_name: "Afvoer",
        subfeatures: [
            { ID: "afvoer_links", name: "Vooraanzicht links", value: "6809565" },
            { ID: "afvoer_rechts", name: "Vooraanzicht rechts", value: "6809566" },
        ],
    },
    {
        label: "Verlichting",
        type: "single_selection",
        uuid: "5e86db64-a002-46ff-abc2-c3ff9a83cab5",
        configurator_ID: "spots",
        configurator_name: "Verlichting",
        subfeatures: [
            { ID: "0_spotjes", name: "Geen", value: "8795195" },
            { ID: "2_spotjes", name: "2 LED spots", value: "8795192" },
            { ID: "3_spotjes", name: "3 LED spots", value: "9356414" },
        ],
    },
    {
        label: "Sensor",
        type: "single_selection",
        uuid: "76e2951d-ca10-4f10-9399-cec7d5f61145",
        configurator_ID: "melders",
        configurator_name: "Melders",
        subfeatures: [
            { ID: "geen_schakelaar", name: "Geen sensor (standaard)", value: "7498860" },
            { ID: "bewegingsmelder", name: "Bewegingssensor", value: "7498859" },
            { ID: "schemer_schakelaar", name: "Schemerschakelaar", value: "7498861" },
        ],
    },
    {
        label: "Montage tot 179cm breed",
        type: "single_selection",
        uuid: "50b49028-82cb-4237-8612-2f14e3c469a3",
        configurator_ID: "montage",
        configurator_name: "Montage",
        subfeatures: [
            { ID: "afhalen", name: "Afhalen in Heteren", value: "9356462" },
            { ID: "montage_0_75", name: "Tot 75km vanaf Heteren", value: "9356465" },
            { ID: "montage_75_125", name: "75km tot 125km vanaf Heteren", value: "9356468" },
            { ID: "montage_125_200", name: "125km tot 200km vanaf Heteren", value: "9356471" },
        ],
    },
    {
        label: "Montage breder dan 180cm",
        type: "single_selection",
        uuid: "42440a54-cee9-4f65-9451-613bd9983d27",
        configurator_ID: "montage",
        configurator_name: "Montage",
        subfeatures: [
            { ID: "afhalen", name: "Afhalen in Heteren", value: "8796086" },
            { ID: "montage_0_75", name: "Tot 75km vanaf Heteren", value: "8796077" },
            { ID: "montage_75_125", name: "75km tot 125km vanaf Heteren", value: "8796083" },
            { ID: "montage_125_200", name: "125km tot 200km vanaf Heteren", value: "8796080" },
        ],
    },
    {
        configurator_ID: "armen_feat",
        uuid: "",
        configurator_name: "Armen configurator",
        type: "single_selection",
        subfeatures: [
            {
                ID: "geen_arm",
                value: "",
                name: "",
            },
            { ID: "sier_arm", value: "", name: "" },
            { ID: "trek_arm", value: "", name: "" },
        ],
    },
    {
        configurator_ID: "kleur",

        uuid: "82c61d10-5a35-4036-aae4-90dd0a32d23b",
    },
    {
        configurator_ID: "kleur_onder",
        uuid: "2c93ac91-762c-44c2-8c6d-052a0dc41f6e",
    },
    {
        configurator_ID: "armen_feat",
        uuid: "",
        configurator_name: "Armen configurator",
        type: "single_selection",
        subfeatures: [
            {
                ID: "geen_arm",
                value: "",
            },
            { ID: "sier_arm", value: "", name: "" },
            { ID: "trek_arm", value: "", name: "" },
        ],
    },
];
