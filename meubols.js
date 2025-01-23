/** @format */
if (window.location.pathname === "/configurator.html") {
    // iConfigure();
}

function iConfigure() {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.media = "all";
    link.href = "https://web.iconfigure.nl/inject/style.css";
    document.head.appendChild(link);
    window.parent.addEventListener("message", (event) => {
  
        // sendDataToShop(event);
    });

    function removeElements() {
        // List of elements to remove
        const removeList = [
            "#productpage",
            "#footer",

        ];

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
        }, 100); // Check every 100 milliseconds
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
            p.innerHTML = ``;

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
            urls.push(`https://www.firmahoutenstaal.nl/cart/add/${values[topush]}/?bundle_id=&quantity=1`);
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
            `https://www.firmahoutenstaal.nl/cart/add/${values["rond" + items.radius.value]}/?bundle_id=&quantity=1`
        );
    } else {
        let val = values2["tafelblad" + items.lengte.value + "x" + items.breedte.value];
        urls.push(
            `https://www.firmahoutenstaal.nl/cart/add/${val.ID}/?bundle_id=&custom%5B${val.fieldID}%5D=${
                val.vorm[items.vorm.subID]
            }&quantity=1`
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
