function playAudio(url) {
    new Audio(url).play(); 
  }
  
function Sendinfo(){
    var Fornavn = document.getElementById("fname"),
     Fornavnet = Fornavn.value;
    var Etternavn = document.getElementById("lname"),
     Etternavnet = Etternavn.value;
    document.getElementById('Svaret').innerHTML = Fornavnet +" "+ Etternavnet; 
}
