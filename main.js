var airports = [];
$(document).ready(function() {
    intializaFirebase();
    preencheDropdown();
});

function intializaFirebase(){
  var config = {
    apiKey: "AIzaSyDmYwaI56khakraaOwiPm-pnZNcP04KSrc",
    authDomain: "interviagens-a9d93.firebaseapp.com",
    databaseURL: "https://interviagens-a9d93.firebaseio.com",
    projectId: "interviagens-a9d93",
    storageBucket: "interviagens-a9d93.appspot.com",
    messagingSenderId: "193711264766"
  };
  firebase.initializeApp(config);
}

function getAirports(){

    firebase.database().ref('/airports').once('value', function(data){
        airports.push(data.val());
    })

}

function preencheDropdown() {

    getAirports();
    console.log(airports);
    // var html = '';

    // for(var key in airports) {
    //     console.log(key)
    //     html += "<option value=" + key  + ">" + obj[key] + "</option>"
    // }
    // console.log(html);
    
    // document.getElementById("input-origem").innerHTML = html;
    // $('select').formSelect();

}