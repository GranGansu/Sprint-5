const reportAcudits = []
var bromaActual: string;
var broma: any;
var tiempo: any;
var alternar: number = 0;
window.onload = () => {
  broma = document.getElementById('broma');
  const botonBroma = document.getElementById('siguienteBroma')
  const toggle = document.getElementById('toggle')
  tiempo = document.getElementById('tiempo')
  botonBroma.addEventListener('click', () => {
    toggle.style.display = 'block';
    botonBroma.style.display = 'none';
    getBroma()
  })
  getTiempoHoy(8)
}
function getBroma(): void {
  var tipoBroma = ['https://v2.jokeapi.dev/joke/Any?lang=es&type=single', 'https://icanhazdadjoke.com/']
  console.log(alternar);
  fetch(tipoBroma[alternar], { headers: { accept: 'application/json' } })
    .then(response => response.json())
    .then(json => {
      bromaActual = json.joke;
      broma.innerHTML = json.joke;
    });
  alternar = ((alternar == 0) ? 1 : 0);
}
function rating(number: number): void {
  var date = new Date().toISOString();
  reportAcudits.push({ joke: bromaActual, score: number, date: date })
  getBroma();
  console.table(reportAcudits);
}
function getTiempoHoy(provincia: number) {
  fetch('https://www.el-tiempo.net/api/json/v2/provincias/' + 0 + provincia)
    .then(response => response.json())
    .then(json => {
      tiempo.innerHTML = json.today.p;
    })
}