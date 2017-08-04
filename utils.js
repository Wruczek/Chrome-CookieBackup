function downloadTextAsFile(filename, text) {
    let pom = document.createElement("a");
    pom.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
    pom.setAttribute("download", filename);
    pom.click();
}

// http://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
function getDateAsString() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();

    if (dd < 10)
        dd = "0" + dd;

    if (mm < 10)
        mm = "0" + mm;

    return `${dd}_${mm}_${yyyy}`;
}
