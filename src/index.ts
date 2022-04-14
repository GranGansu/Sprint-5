interface RatingBroma {
  joke: string;
  score: number;
  date: string;
}
const reportAcudits: RatingBroma[] = []
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
  getTiempoHoy(8, 8019)
}
function getBroma(): void {
  var tipoBroma = ['https://v2.jokeapi.dev/joke/Any?lang=es&type=single', 'https://icanhazdadjoke.com/']
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
  var ratingBroma: RatingBroma = { joke: bromaActual, score: number, date: date }
  reportAcudits.push(ratingBroma);
  getBroma();
  console.table(reportAcudits);
}
function getTiempoHoy(provincia: number, ciudad: number) {
  fetch('https://www.el-tiempo.net/api/json/v2/provincias/' + 0 + provincia + '/municipios/0' + ciudad)
    .then(response => response.json())
    .then(json => {
      const temperatura: string = json.temperatura_actual
      var estado: string = `<img src="img/${json.stateSky.description.toLowerCase()}.png">`
      tiempo.innerHTML = estado + ' ' + '| ' + temperatura + 'º';
    })
}