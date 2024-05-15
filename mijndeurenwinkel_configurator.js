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
      console.log("configurator found")
    var bodyEl = document.querySelector(".content");
    // check if mobile
    var topBarHeight = 0;
    var btm = "0";
    if (window.innerWidth > 767) {
        topBarHeight = "130";
    } else {
        topBarHeight = "115";
        btm = "0";
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
        '#footer',
        '#mobileNav',
         '#main > div'

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
}

//     /* <iframe
//     id="iconfigure"
//     title="iConfigure"
//     src="https://iconfigure.web.app/?dealer=3059A06F-CF62-4D40-B51D-5BA370A99285&type=type_taats&aantal_deuren=2_deuren&plaatsing_panelen=paneel_beide&verdeling_panelen=eigen_maat&breedte_2d=160&hoogte_sparing=201&breedte_sparing=320&vlakverdeling=6vlaks&deur_profiel=40mm&handgreep=sleeve_m&kleur_glas=glas_helder&kleur_staal=staal_bronze&verzending=afleveren_nl&overig=Taatsbeslag2&active_step=3"
//     width="300"
//     height="200"
// ></iframe>; */}
// https://iconfigure.web.app/?product=248DF3FE-12A2-4F50-BB8C-4AE85D54DF58&type=type_paneel&losse_panelen_plaats=afscheiding&aantal_panelen=2&hoogte_sparing=201&breedte_sparing=210&vlakverdeling=3vlaks&deur_profiel=30mm&kleur_glas=glas_helder&kleur_staal=staal_brown&active_step=0
// https://iconfigure.web.app/?dealer=3059A06F-CF62-4D40-B51D-5BA370A99285&type=type_schuif&aantal_deuren=1_deur&plaatsing_panelen=paneel_beide&verdeling_panelen=eigen_maat&breedte_1d=80&hoogte_sparing=201&breedte_sparing=240&vlakverdeling=6vlaks_ongelijk&deur_profiel=30mm&handgreep=koker_s&kleur_glas=glas_brons&kleur_staal=staal_9005&active_step=0
