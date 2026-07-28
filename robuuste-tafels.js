/** @format */

function iConfigure(preConfig) {
    var iframe = document.createElement("iframe");
    iframe.id = "iConfigure";
    iframe.style.position = "sticky";
    iframe.style.height = "calc(100dvh)";
    iframe.style.width = "100vw";
    iframe.style.zIndex = "1000";
    iframe.style.pointerEvents = "auto";
    iframe.style.backgroundColor = "#ffffff";
    iframe.src = "https://configurator.iconfigure.io/?product=9c870513-f27b-4ed3-a577-fc005d912739";
    document.body.appendChild(iframe);

    const removeList = [
        "#builderwidget-4\\#20",
        "#builderwidget-4\\#19",
        "body > div.tm-page > div:nth-child(5)",
        "body > div.tm-page > div.uk-section-default.uk-section",
        "body > div.custom_chat_button.purechat-button-expand"
    ];

    setTimeout(function () {
        for (const selector of removeList) {
            let items = document.querySelectorAll(selector);
            items.forEach((item) => item.remove());
        }
    }, 50);
}
iConfigure();
document.addEventListener("DOMContentLoaded", (event) => {});
