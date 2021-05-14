const socket = io.connect('/');

var dataContainer = document.getElementById("sensor_data") //Lager en variabel for å kunne vise frem verdier fra sensor.
var avg_dataContainer = document.getElementById("sensor_data_avg") //Lager en variabel for å kunne vise frem avg-verdier fra sensor.

//Temp-value:
socket.on("temp-sensor", data => {
  console.log("Temperatur: " + data)
  var temp_data = data;
  dataContainer.innerText = "Received data:"+ temp_data;
  dataArr1.push(data); //This pushes data to the array that stores all the chart data
  if(dataArr1.length >= 11) {
    dataArr1.shift();
  }
  myLineChart.update(); //This updates the chart
})

//Average temp-value:
socket.on("temp-sensor-avg", data => {
  console.log("Average Temp: " + data)
  var temp_data = data;
  avg_dataContainer.innerText = "Gjennomsnitt:"+ temp_data;

})

//styring av zumobien:
const xhttp = new XMLHttpRequest();
var keyleft = document.getElementById("left"); 
var keyup = document.getElementById("up");
var keyright = document.getElementById("right");
var keydown = document.getElementById("down");

