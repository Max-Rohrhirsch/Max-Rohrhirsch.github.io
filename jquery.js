document.addEventListener("DOMContentLoaded", function() {
    includeHTML("/header.html", "includeHeader");
    includeHTML("/footer.html", "includeFooter");
});

function includeHTML(url, elementId) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById(elementId).innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}