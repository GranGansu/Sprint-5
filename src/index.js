var reportAcudits = [];
var bromaActual;
var broma;
var tiempo;
var alternar = 0;
window.onload = function () {
    broma = document.getElementById('broma');
    var botonBroma = document.getElementById('siguienteBroma');
    var toggle = document.getElementById('toggle');
    tiempo = document.getElementById('tiempo');
    botonBroma.addEventListener('click', function () {
        toggle.style.display = 'block';
        botonBroma.style.display = 'none';
        getBroma();
    });
    getTiempoHoy(8, 8019);
};
function getBroma() {
    var tipoBroma = ['https://v2.jokeapi.dev/joke/Any?lang=es&type=single', 'https://icanhazdadjoke.com/'];
    fetch(tipoBroma[alternar], { headers: { accept: 'application/json' } })
        .then(function (response) { return response.json(); })
        .then(function (json) {
        bromaActual = json.joke;
        broma.innerHTML = json.joke;
    });
    alternar = ((alternar == 0) ? 1 : 0);
}
function rating(number) {
    var date = new Date().toISOString();
    var ratingBroma = { joke: bromaActual, score: number, date: date };
    reportAcudits.push(ratingBroma);
    getBroma();
    console.table(reportAcudits);
}
function getTiempoHoy(provincia, ciudad) {
    fetch('https://www.el-tiempo.net/api/json/v2/provincias/' + 0 + provincia + '/municipios/0' + ciudad)
        .then(function (response) { return response.json(); })
        .then(function (json) {
        var temperatura = json.temperatura_actual;
        var estado = "<img src=\"img/".concat(json.stateSky.description.toLowerCase(), ".png\">");
        tiempo.innerHTML = estado + ' ' + '| ' + temperatura + 'º';
    });
}
