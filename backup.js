let button = document.getElementById("backup");

button.addEventListener("click", () => {

    button.disabled = true;
    button.innerHTML = "Please wait...";

    chrome.cookies.getAll({}, (ret) => {
        downloadTextAsFile(`cookies-${getDateAsString()}.kukiz`, JSON.stringify({cookies: ret}));

        button.disabled = false;
        button.innerHTML = "Done! Store it in a safe place";
    });
});
