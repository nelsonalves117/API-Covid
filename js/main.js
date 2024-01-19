const COUNTRY = 'Brazil';
const BASE_URL = "https://api.api-ninjas.com/v1/covid19?country=";
const API_KEY = ""

window.onload = function () {
    this.getCasesCovid();
}

function getCasesCovid() {
    var url = BASE_URL + COUNTRY;
    callAPI(url, function (status, data) {
        var cases = Object.entries(data);

        cases.forEach(element => {
            if (element[1].new !== 0 && element[1].total !== 0) {
                console.log(element[0])
                console.log(element[1])
                showCasesCovid(element);
            }
        });
    });
}

function showCasesCovid(element) {

    document.getElementById("content").innerHTML += "<article>" +
        "<h>Data: " + element[0] + "</h1>" +
        "<p>Novos Casos: " + element[1].new + "</p>  " +
        "<p>Total de Casos: " + element[1].total + "</p>  " +
        "</article>";

}

function callAPI(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader("X-Api-Key", API_KEY);
    xhr.responseType = 'json';
    xhr.onload = () => {
        var status = xhr.status;
        if (status === 200) {
            console.log(xhr.response);
            if (xhr.response.size != 0) {
                callback(status, xhr.response[0].cases);
            } else {
                alert("Não foi possível recuperar dados do servidor a respeito dos casos de COVID!");
            }
        } else {
            alert("Falha ao se conectar ao servidor! " + xhr.status);
        }
    }
    xhr.send();
}