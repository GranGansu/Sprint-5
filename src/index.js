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
    getTiempoHoy(8);
};
function getBroma() {
    var tipoBroma = ['https://v2.jokeapi.dev/joke/Any?lang=es&type=single', 'https://icanhazdadjoke.com/'];
    console.log(alternar);
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
    reportAcudits.push({ joke: bromaActual, score: number, date: date });
    getBroma();
    console.table(reportAcudits);
}
function getTiempoHoy(provincia) {
    fetch('https://www.el-tiempo.net/api/json/v2/provincias/' + 0 + provincia)
        .then(function (response) { return response.json(); })
        .then(function (json) {
        tiempo.innerHTML = json.today.p;
    });
}
