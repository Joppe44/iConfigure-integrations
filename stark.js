function executeAfterOneSecond(url) {
    setTimeout(function () {
        let parent = document.querySelector("body");
        let appendBefore = document.querySelector("body > footer");
        var iframe = document.createElement("iframe");
        document.body.insertBefore(iframe, appendBefore);

        iframe.src =
            "https://web.iconfigure.nl/" + url + "&product=3D6F1E27-07C5-4619-8D88-4BCC66E89958";
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (!isMobile) {
            document.querySelector("body > main").remove();
            document.querySelector("body > footer").remove();
            document.querySelector("body > div.cs-bottom").remove();
            // document.querySelector("#rb-header").remove();

            iframe.style.width = "100%";
            iframe.style.height = "calc(100vh - 237px)";
            iframe.style.border = "0px";
        } else {
            document.querySelector("body > main").remove();
            document.querySelector("body > footer").remove();
            document.querySelector("body > div.cs-bottom").remove();
            iframe.style.width = "100%";
            iframe.style.height = "calc(100vh - 107px)";
            iframe.style.border = "0px";
            iframe.style.position = "absolute";
            iframe.style.top = "107px";
        }

    }, 400);
}

executeAfterOneSecond(url);
