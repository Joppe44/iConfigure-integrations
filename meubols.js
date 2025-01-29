/** @format */
if (window.location.pathname === "/configurator.html") {
    iConfigure();
} else {
    buttonCheck();
}

function buttonCheck() {
    setTimeout(() => {
        const ahref = document.querySelector('[title="iconfigure"]');
        if (ahref) {
            ahref.innerHTML = ahref.innerHTML + `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box" viewBox="0 0 16 16">
            <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z"/>
          </svg>`
            ahref.href = ahref.href.replace('https://web.iconfigure.nl/','https://meubols.nl/configurator.html') + "#iConfigure";
            ahref.style.backgroundColor = "#000000";
            ahref.style.width = "40%";
            ahref.classList.add("btn");
            const parent = document.querySelector("#product_configure_form > div.cart");
            parent.prepend(ahref);

        } 
    }, 1000);
}
 
function iConfigure() {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.media = "all";
    link.href = "https://web.iconfigure.nl/inject/style.css";
    document.head.appendChild(link);
    window.parent.addEventListener("message", (event) => {
        sendDataToShop(event);
    });

    function removeElements() {
        // List of elements to remove
        const removeList = ["#productpage", "#footer", "#wappy-toggle-badge", "#CookiebotWidget", "._t53mel"];
        let counter = 0; // Track the number of loops
        const maxLoops = 10; // Maximum number of iterations
        const interval = setInterval(() => {
            let allRemoved = true; // Flag to track if all elements are removed
            for (const selector of removeList) {
                const items = document.querySelectorAll(selector);
                if (items.length > 0) {
                    allRemoved = false; // If any element is still present, set flag to false
                    items.forEach((item) => item.remove());
                }
            }
            counter++; // Increment the counter
            if (allRemoved || counter >= maxLoops) {
                clearInterval(interval); // Stop the interval if all elements are removed or max loops reached
                console.log(allRemoved ? "All elements removed!" : "Max loops reached, stopping.");
            }
        }, 200); // Check every 100 milliseconds
    }

    const interval = setInterval(() => {
        const targetElement = document.querySelector("div.main-content");
        if (targetElement) {
            clearInterval(interval); // Stop the interval once the div is appended
            removeElements();
            // Create the div with id 'iConfigure' and apply styles
            var holder = document.createElement("div");
            holder.style.paddingLeft = "10vw";
            holder.style.paddingRight = "10vw";
            holder.style.paddingTop = "10vw";
            holder.style.paddingBottom = "4vw";
            var h = document.createElement("h1");
            h.innerHTML = `Welkom bij onze configurator`;
            var p = document.createElement("p");
            p.innerHTML = `Bij Meubols ontwerpen we eettafels die niet alleen functioneel zijn, maar ook een echte aanwinst voor je interieur. Of je nu op zoek bent naar een tafel die perfect past bij je woonkamer of je zakelijke ruimte, wij maken jouw ideeën werkelijkheid. Onze tafels worden volledig op maat gemaakt, met oog voor luxe, comfort en kwaliteit.`;

            var div = document.createElement("div");
            div.id = "iConfigure";
            div.style.position = "sticky";
            div.style.height = "calc(100dvh)";
            div.style.width = "100vw";
            div.style.zIndex = "1023";
            div.style.pointerEvents = "auto";
            holder.appendChild(h);
            holder.appendChild(p);

            targetElement.appendChild(holder);
            targetElement.appendChild(div);
            console.log("Div appended successfully!");

            var script = document.createElement("script");
            script.src = "https://web.iconfigure.nl/inject/inject.iife.js";
            script.crossOrigin = "anonymous";
            script.onload = function () {
                // Your configuration object

                let preConfig = {
                    product: "9419b772-2606-4378-8f8f-4bd1c65cef5c",
                    vorm: "rond_ovaal",
                    lengte: "160",
                    breedte: "100",
                    frame: "bananzonder",
                    houtsoort: "eikenhout",
                    kleur_hout: "blacksmokelight",
                    rand: "rarecht",
                    bladafwerking: "glad",
                    texturen: "verfijnd",
                    dikte: "30",
                    active_step: "2",
                };

                injectApp(preConfig);
            };
            document.head.appendChild(script);
        }
    }, 100); // Check every 100 milliseconds
    // Load the JS file and execute the code after it's loaded
}
async function sendDataToShop(event) {
    // Gather items from the incoming message
    var items = [];
    for (let key of Object.keys(event.data.items)) {
        items.push(event.data.items[key]);
    }

    // Base cart URL (adapt to your own store/product)
    let baseURL = "https://www.meubols.nl/cart/add/309748268/";
    // The quantity you’d like to add
    let quantity = 1;

    // Start building URL parameters
    // bundle_id might be blank if you’re not using bundles
    let queryParams = [];
    queryParams.push("bundle_id=");

    // Loop over each item from the configurator
    items.forEach((item) => {
        // Find the matching entry in our `values` array by ID
        let found = values.find((val) => val.id === item.ID);
        if (!found) {
            // If no match in values array, you can decide to skip or handle differently
            return;
        }

        // Key in the final URL: custom[{found.value}]
        let paramKey = `custom[${found.value}]`;

        // Decide what the param value is.
        // For single_selection, we likely use item.subID => found.values[subID].
        // For number_input, we use item.value => found.values[item.value], etc.
        let paramVal = "";
        if (item.type === "single_selection" && found.values) {
            // Look up the code by subID (like "rond_ovaal" => "75127821")
            paramVal = found.values[item.subID] || "s";
        } else if (item.type === "number_input" && found.values) {
            // Convert the number to the matching code if it exists
            paramVal = found.values[item.value] || item.value;
        } else if (item.type === "text_input") {
            // If it’s text-based, store the user-entered value
            paramVal = encodeURIComponent(item.value || "");
        } else {
            // Fallback
            paramVal = "s";
        }

        // Push the custom param into array
        queryParams.push(`${paramKey}=${paramVal}`);
    });

    // Finally push quantity param
    queryParams.push(`quantity=${quantity}`);

    // Construct final URL
    let url = baseURL + "?" + queryParams.join("&");

    // Optionally, POST to that URL (some shops just need a GET; depends on your platform)
    await fetch(url, { method: "POST" });

    // Prevent default message handling if needed
    event.preventDefault();

    // Redirect user to the cart URL
    window.location.href = "https://www.meubols.nl/cart/";
}

var values = [
    {
        id: "vorm",
        value: "8684737",
        values: {
            leaf: "75127817",
            deens: "75127818",
            ovaal: "75127819",
            diana: "75127820",
            rond_ovaal: "75127821",
            rond: "75127822",
            anders: "75127823",
        },
    },
    {
        id: "anderevorm",
        value: "8684745",
    },
    {
        id: "houtsoort",
        value: "8684777",
        values: {
            eikenhout: "75128011",
            notenhout: "75128010",
        },
    },
    {
        id: "radius",
        value: "8684762",
        values: {
            100: "75127883",
            110: "75127884",
            120: "75127885",
            130: "75127886",
            140: "75127887",
            150: "75127888",
            160: "75127889",
        },
    },
    {
        id: "lengte",
        value: "8684765",
        values: {
            160: "75127926",
            170: "75127927",
            180: "75127928",
            190: "75127929",
            200: "75127930",
            210: "75127931",
            220: "75127932",
            230: "75127933",
            240: "75127934",
            250: "75127935",
            260: "75127936",
            270: "75127937",
            280: "75127938",
            290: "75127939",
            300: "75127940",
            310: "75127941",
            320: "75127942",
            330: "75127943",
            340: "75127944",
            350: "75127945",
            360: "75127946",
        },
    },
    {
        id: "breedte",
        value: "8684766",
        values: {
            100: "75127947",
            110: "75127948",
            120: "75127949",
            130: "75127950",
            140: "75127951",
            150: "75127952",
        },
    },
    {
        id: "frame",
        value: "8684776",
        values: {
            rechtepoot: "75127994",
            kolomronddouble: "75127995",
            mippszonder: "75127996",
            kolompotendouble: "75127997",
            kolompoten: "75127998",
            dio: "75127999",
            bananen: "75128000",
            bananzonder: "75128001",
            "4rondepoten": "75128002",
            kolom_ovaal: "75128003",
            kolom_rond: "75128004",
            "3rondepoten": "75128005",
            halfrondepoot: "75128006",
            mippsribble: "75128007",
            "4rondepotenrond2": "75128008",
            anderepoot: "75128009",
        },
    },
    {
        id: "kleur_hout",
        value: "8684780",
        values: {
            hazelnut: "75128026",
            walnut: "75128027",
            deepblack: "75128028",
            blacksmoke: "75128029",
            blacksmokelight: "75128030",
            pebblestone: "75128031",
            Winter: "75128032",
            Terracotta: "75128033",
            silkwhite: "75128034",
            ultramattelak: "75128035",
        },
    },
    {
        id: "bladafwerking",
        value: "8684788",
        values: {
            geborsteld: "75128047",
            glad: "75128048",
        },
    },
    {
        id: "texturen",
        value: "8684794",
        values: {
            rustiek: "75128054",
            verfijnd: "75128055",
        },
    },
    {
        id: "dikte",
        value: "8684797",
        values: {
            40: "75128070",
            30: "75128071",
        },
    },
    {
        id: "anderframe",
        value: "8684798",
    },
    {
        id: "anders",
        value: "8684798",
    },
    {
        id: "rand",

        value: "8684786",
        values: {
            rarecht: "75128042",
            rarecht45: "75128043",
            rarond45: "75128044",
            rarond: "75128045",
        },
    },
    {
        id: "anderemaat",
        value: "8685769",
    },
];
