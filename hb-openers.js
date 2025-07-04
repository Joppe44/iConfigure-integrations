console.log("ic loaded");

function isPhone() {
    var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    return viewportWidth <= 767;
}

if (window.location.href.includes("/garagedeur-configurator/")) {
    let iframeInserted = false;

    const cleanInterval = setInterval(() => {
        // Try to remove each element if it exists
        document.querySelector("#footer")?.remove();
        document.querySelector("#mwwFooter")?.remove();
        document.querySelector("#launcher")?.remove();
        document.querySelector("#react_element__consent_button")?.remove();

        const content = document.querySelector("#content");

        if (content && !iframeInserted) {
            // Clear previous content
            content.innerHTML = "";

            // Create and configure the iframe
            const iframe = document.createElement("iframe");
            iframe.src =
                "https://web.iconfigure.nl/?product=c1f0da3f-e31f-4d22-a84d-e53463e385a4&breedte=3268&hoogte=2979&vrijboven=13&panelen=5&afwerking=houtnerf5&kleur=nerf5_9010&loopdeur=geen&motoren=ketting&extra_opties=inbouwrails130&active_step=0";
            iframe.style.width = "100vw";
            iframe.style.height = isPhone() ? "calc(100vh - 100px)" : "calc(100vh - 210px)";
            iframe.style.border = "none";

            content.appendChild(iframe);
            iframeInserted = true;

            // Optional: stop the interval once iframe is inserted
            clearInterval(cleanInterval);
        }
    }, 500); // Retry every 500ms
}
