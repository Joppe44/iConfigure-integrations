
console.log("ic loaded")
function isPhone() {
    var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    var phoneMaxWidth = 767;
    return viewportWidth <= phoneMaxWidth;
}
document.addEventListener("DOMContentLoaded", function () {
    if (window.location.href.includes("/configurator")) {
        // Remove the footer element if it exists
        document.querySelector("#footer").remove();
        document.querySelector("#mwwFooter").remove();
        document.querySelector("#launcher").remove();
        document.querySelector("#react_element__consent_button").remove();
        // Create an iframe and set its attributes
        var iframe = document.createElement("iframe");
        iframe.src =
            "https://web.iconfigure.nl/?product=c1f0da3f-e31f-4d22-a84d-e53463e385a4&breedte=3268&hoogte=2979&vrijboven=13&panelen=5&afwerking=houtnerf5&kleur=nerf5_9010&loopdeur=geen&motoren=ketting&extra_opties=inbouwrails130&active_step=0"; // Replace with your iframe URL
        iframe.style.width = "100vw"; // Full viewport width

        iframe.style.height = isPhone() ? "calc(100vh - 100px)" : "calc(100vh - 210px)"; // Height of the viewport minus 350px
        iframe.style.border = "none"; // Optional: Remove the border from the iframe

        // Set the iframe as the innerHTML of the content element
        var content = document.querySelector("#content");
        if (content) {
            content.innerHTML = "";
            content.appendChild(iframe);
        }
    }
});
