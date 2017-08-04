let fileInput = document.getElementById("fileinput");
let restoreButton = document.getElementById("restore");

restoreButton.addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", (e) => {
    let file = e.target.files[0];
    fileInput.value = "";

    if (!file) {
        alert("Failed to load file");
        return;
    }

    if (!file.name.endsWith(".kukiz")) {
        alert("Not a .kukiz file");
        return;
    }

    restoreButton.innerHTML = "Reading file...";

    let reader = new FileReader();

    reader.onload = (e) => {
        let contents = e.target.result;
        restoreButton.innerHTML = "Restoring cookies...";

        let contentsJSON;

        try {
            contentsJSON = JSON.parse(contents);
        } catch (exception) {
            alert("Cannot parse file!");
            restoreButton.innerHTML = "Cannot parse file!";
            return;
        }

        let result = restoreCookies(contentsJSON);

        if(result)
            restoreButton.innerHTML = "Cookies restored!";
        else
            restoreButton.innerHTML = "Failed restoring cookies";
    };

    reader.readAsText(file);
}, false);

function restoreCookies(cookieJSON) {

    if (!cookieJSON.cookies) {
        alert("Invalid data! Cannot find cookies in specified JSON! :(");
        return false;
    }

    restoreButton.innerHTML = "Setting cookies...";

    cookieJSON.cookies.forEach((cookie) => {
        let url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain + cookie.path;

        chrome.cookies.set({
            url: url,
            name: cookie.name,
            value: cookie.value,
            path: cookie.path,
            secure: cookie.secure,
            httpOnly: cookie.httpOnly,
            expirationDate: cookie.expirationDate,
            storeId: cookie.storeId
        });
    });

    return true;
}
